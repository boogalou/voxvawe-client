import { RefObject, useEffect } from "react";
import { InMessage } from "@/src/shared";

export function useInfiniteScrollMessageHistory(callback: IntersectionObserverCallback, options: { [key: string]: unknown }, deps: InMessage[], messageListRef: RefObject<HTMLDivElement>) {
  useEffect(() => {
    console.log(deps.length);
    const infiniteObserver = new IntersectionObserver(callback, options);

    if (messageListRef.current && messageListRef.current?.firstChild) {
      infiniteObserver.observe(messageListRef.current.firstChild as Element);
    }
  }, [deps]);
}