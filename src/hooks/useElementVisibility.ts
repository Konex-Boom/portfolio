import { useEffect, useState, type RefObject } from 'react';
import { observeVisibility } from '../lib/visibility';

export function useElementVisibility(ref: RefObject<Element | null>, rootMargin = '0px') {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    return observeVisibility(ref.current, (active) => {
      setIsVisible(active);
      if (active) setHasBeenVisible(true);
    }, rootMargin);
  }, [ref, rootMargin]);
  return { isVisible, hasBeenVisible };
}
