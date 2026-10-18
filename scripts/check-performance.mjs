import assert from 'node:assert/strict';
import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';
import { resolve, extname, sep, join } from 'node:path';
import { tmpdir } from 'node:os';
import { gzipSync } from 'node:zlib';
import { chromium } from 'playwright-core';

const root = resolve('dist');
assert(existsSync(join(root, 'index.html')), 'Run npm run build first.');
const contentTypes = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.glb': 'model/gltf-binary' };
const server = createServer((req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!file.startsWith(root + sep) || !existsSync(file)) {
    res.writeHead(404); res.end(); return;
  }
  res.setHeader('Content-Type', contentTypes[extname(file)] || 'application/octet-stream');
  let body = readFileSync(file);
  if (/\.(html|js|css|svg)$/.test(file)) {
    body = gzipSync(body);
    res.setHeader('Content-Encoding', 'gzip');
  }
  res.end(body);
});
await new Promise(done => server.listen(0, '127.0.0.1', done));
const executablePath = process.env.PERFORMANCE_BROWSER || [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/usr/bin/chromium', '/usr/bin/google-chrome',
].find(existsSync);
const targetUrl = process.env.PERFORMANCE_URL || `http://127.0.0.1:${server.address().port}/`;
const artifacts = join(tmpdir(), process.env.PERFORMANCE_URL ? 'portfolio-performance-production' : 'portfolio-performance-check');
mkdirSync(artifacts, { recursive: true });
let browser;

function instrument() {
  const counts = window.__perf = { contexts: 0, glDraws: 0, particleFrames: 0 };
  const seen = new WeakSet();
  const originalGet = HTMLCanvasElement.prototype.getContext;
  HTMLCanvasElement.prototype.getContext = function (type, ...args) {
    const ctx = originalGet.call(this, type, ...args);
    if (ctx && /webgl/.test(type) && !seen.has(ctx)) {
      seen.add(ctx); counts.contexts++;
      for (const method of ['drawArrays', 'drawElements']) {
        const original = ctx[method];
        ctx[method] = function (...values) { counts.glDraws++; return original.apply(this, values); };
      }
    }
    return ctx;
  };
  const clear = CanvasRenderingContext2D.prototype.clearRect;
  CanvasRenderingContext2D.prototype.clearRect = function (...args) {
    if (this.canvas.isConnected) counts.particleFrames++;
    return clear.apply(this, args);
  };
}

async function counters(page) { return page.evaluate(() => ({ ...window.__perf })); }
async function move(page, id) {
  await page.evaluate(id => {
    const element = document.getElementById(id);
    window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 80, behavior: 'instant' });
  }, id);
  await page.waitForTimeout(700);
}

const results = [];
try {
  browser = await chromium.launch({ executablePath, headless: true });
  for (const mobile of [false, true]) {
    const name = mobile ? 'mobile' : 'desktop';
    console.log(`${name}: checking startup`);
    const context = await browser.newContext({
      viewport: mobile ? { width: 390, height: 844 } : { width: 1365, height: 900 },
      deviceScaleFactor: mobile ? 3 : 1, isMobile: mobile, hasTouch: mobile,
    });
    await context.addInitScript(instrument);
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => {
      if (/Too many active WebGL|WebGL.*(ERROR|Error)|Error creating WebGL/.test(message.text())) errors.push(message.text());
    });
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.lightfall-container canvas');
    await page.waitForTimeout(5000);
    const initial = await page.evaluate(() => {
      window.__background = document.querySelector('.lightfall-container canvas');
      return {
        counts: { ...window.__perf },
        resources: performance.getEntriesByType('resource').map(r => ({ name: r.name, bytes: r.encodedBodySize })),
        canvasWidth: window.__background.width,
        cssWidth: window.__background.getBoundingClientRect().width,
      };
    });
    assert.equal(initial.counts.contexts, 1, `${name}: only the background context at startup`);
    assert(!initial.resources.some(r => /ModelViewer|three.*\.js|model\.glb/.test(r.name)), `${name}: 3D must remain deferred`);
    assert(!initial.resources.some(r => /(?:cap1|dashboard|cover).*\.(?:png|jpg)/.test(r.name)), `${name}: full project covers must remain deferred`);
    assert(initial.canvasWidth / initial.cssWidth <= (mobile ? 1.01 : 1.51), `${name}: background resolution is capped`);
    await page.screenshot({ path: join(artifacts, `${name}-hero.png`) });
    console.log(`${name}: startup passed; checking scrolling and 3D`);

    for (let i = 1; i <= 36; i++) {
      await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), i * 40);
      await page.waitForTimeout(45);
    }
    assert(await page.evaluate(() => document.querySelector('.lightfall-container canvas') === window.__background), `${name}: background survives scrolling`);
    await move(page, 'about');
    await page.locator('#about canvas').waitFor({ state: 'visible', timeout: 30000 });
    await page.waitForFunction(() => performance.getEntriesByType('resource').some(r => r.name.endsWith('/model.glb')));
    await page.waitForTimeout(2000);
    assert.equal((await counters(page)).contexts, 2, `${name}: one persistent context per 3D effect`);
    await page.screenshot({ path: join(artifacts, `${name}-about.png`) });
    console.log(`${name}: 3D passed; checking pause and resume`);

    await move(page, 'contact');
    const offscreenBefore = await counters(page);
    await page.waitForTimeout(1300);
    const offscreenAfter = await counters(page);
    assert.equal(offscreenAfter.glDraws, offscreenBefore.glDraws, `${name}: WebGL stops outside the viewport`);
    assert.equal(offscreenAfter.particleFrames, offscreenBefore.particleFrames, `${name}: particles stop outside the viewport`);

    await move(page, 'hero');
    const resumedBefore = await counters(page);
    await page.waitForTimeout(800);
    const resumed = await counters(page);
    assert(resumed.glDraws > resumedBefore.glDraws, `${name}: background resumes`);
    assert(resumed.particleFrames > resumedBefore.particleFrames, `${name}: particles resume`);
    await page.locator('button[aria-label="Toggle theme"]:visible').first().click();
    await page.waitForTimeout(700);
    assert.equal((await counters(page)).contexts, 2, `${name}: theme updates preserve the WebGL contexts`);
    await page.screenshot({ path: join(artifacts, `${name}-dark.png`) });
    console.log(`${name}: animation lifecycle passed; checking navigation and images`);

    if (!mobile) {
      await page.mouse.move(420, 300);
      await page.waitForTimeout(600);
      assert(await page.locator('#cursor-follower').evaluate(el => Number(getComputedStyle(el).opacity) === 1), 'cursor follows the mouse');
    } else {
      assert.equal(await page.locator('#cursor-follower').count(), 0, 'no custom cursor on touch devices');
      await page.getByRole('button', { name: 'Toggle menu' }).click();
      await page.locator('nav').getByRole('button', { name: 'Projets', exact: true }).last().click();
      await page.waitForTimeout(1500);
      assert(await page.locator('#projects').evaluate(el => Math.abs(el.getBoundingClientRect().top) < 200), 'mobile menu navigates to projects');
    }
    await move(page, 'projects');
    for (const image of await page.locator('#projects img').all()) {
      await image.scrollIntoViewIfNeeded();
    }
    await page.waitForFunction(() => [...document.querySelectorAll('#projects img')].every(i => i.complete && i.naturalWidth > 0));
    const thumbnails = await page.locator('#projects img').evaluateAll(images => images.map(i => i.currentSrc));
    assert(thumbnails.every(src => src.endsWith('.webp') || src.startsWith('data:image/webp;')), `${name}: project cards use optimized images`);
    await move(page, 'projects');
    await page.screenshot({ path: join(artifacts, `${name}-projects.png`) });
    await page.locator('#projects h3').first().click();
    await page.getByRole('button', { name: 'Fermer la modal' }).waitFor();
    assert(await page.locator('img').evaluateAll(images => images.some(i => i.alt.includes('Capture 1') && /\.png$/.test(i.src))), 'project details retain the original image');
    await page.getByRole('button', { name: 'Fermer la modal' }).click();

    await move(page, 'hero');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(1200);
    const reducedBefore = await counters(page);
    await page.waitForTimeout(1000);
    assert.deepEqual(await counters(page), reducedBefore, `${name}: reduced motion keeps a static background and title`);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.waitForTimeout(300);
    assert((await counters(page)).glDraws > reducedBefore.glDraws, `${name}: animations resume after preference changes`);
    assert.deepEqual(errors, [], `${name}: no runtime or WebGL saturation errors`);
    const result = { device: name, initialBytes: initial.resources.reduce((n, r) => n + r.bytes, 0), initialContexts: initial.counts.contexts, contextsAfterNavigation: resumed.contexts, offscreenWebGLDraws: offscreenAfter.glDraws - offscreenBefore.glDraws, offscreenParticleFrames: offscreenAfter.particleFrames - offscreenBefore.particleFrames, errors };
    results.push(result);
    console.log(JSON.stringify(result));
    await context.close();
  }
  writeFileSync(join(artifacts, 'results.json'), JSON.stringify(results, null, 2));
  console.log(`Checks passed. Screenshots and results: ${artifacts}`);
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  if (browser) await browser.close();
  server.close();
}
