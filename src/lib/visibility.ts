/** Notify only while an element is on screen and its browser tab is visible. */
export function observeVisibility(
  element: Element,
  onChange: (active: boolean) => void,
  rootMargin = '0px',
) {
  let intersects = false;
  let previous: boolean | undefined;
  const notify = () => {
    const active = intersects && !document.hidden;
    if (active !== previous) {
      previous = active;
      onChange(active);
    }
  };
  const observer = new IntersectionObserver(([entry]) => {
    intersects = entry.isIntersecting;
    notify();
  }, { rootMargin });
  observer.observe(element);
  document.addEventListener('visibilitychange', notify);
  notify();
  return () => {
    observer.disconnect();
    document.removeEventListener('visibilitychange', notify);
  };
}
