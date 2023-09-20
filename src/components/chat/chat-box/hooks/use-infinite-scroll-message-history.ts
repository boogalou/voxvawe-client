import { DependencyList, useCallback, useRef } from 'react';

export function useInfiniteScrollMessageHistory<T extends HTMLElement>(
  callback: () => void,
  deps: DependencyList
) {
  const observer = useRef<IntersectionObserver | null>(null);

  const cbRef = useCallback(
    (node: T) => {
      if (deps.every(Boolean)) {
        observer.current?.disconnect();
        observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting) {
            observer.current?.unobserve(node);
            callback();
          }
        });
        if (node) {
          observer.current?.observe(node);
        }
      }
    },
    [deps, callback]
  );

  return cbRef;
}
