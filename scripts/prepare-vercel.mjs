import assert from 'node:assert/strict';
import { cp, mkdir, readFile, realpath, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join, relative, isAbsolute } from 'node:path';

// Package the successful Vite build using Vercel's static Build Output API.
// This avoids the Windows shell issue in `vercel build`.
const root = await realpath(fileURLToPath(new URL('../', import.meta.url)));
const dist = join(root, 'dist');
const output = join(root, '.vercel', 'output');
const html = await readFile(join(dist, 'index.html'), 'utf8');
assert(html.includes('/assets/'), 'Run the Vite production build first.');

const resolvedOutput = await realpath(output).catch(error => {
  if (error.code !== 'ENOENT') throw error;
  return output;
});
const withinProject = relative(root, resolvedOutput);
assert(!withinProject.startsWith('..') && !isAbsolute(withinProject), 'Output must remain inside this project.');
assert(resolvedOutput === output, 'Refusing to replace a linked output directory.');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(dist, join(output, 'static'), { recursive: true });
await writeFile(join(output, 'config.json'), JSON.stringify({
  version: 3,
  routes: [
    { src: '/assets/(.*)', headers: { 'Cache-Control': 'public, max-age=31536000, immutable' }, continue: true },
    { handle: 'filesystem' },
    { src: '/((?!assets/).*)', dest: '/index.html' },
  ],
}, null, 2) + '\n');
await writeFile(join(output, 'builds.json'), JSON.stringify({
  target: 'production',
  builds: [],
}, null, 2) + '\n');
console.log('Vercel production output prepared from dist.');
