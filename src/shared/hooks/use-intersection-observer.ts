import React, { useEffect } from "react";


export const useIntersectionObserver = (targetRef: React.RefObject<HTMLElement>, callback: IntersectionObserverCallback, options?: IntersectionObserverInit) => {

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      observer.disconnect();
    }
  }, [targetRef, callback, options ]);
}