import { useEffect, useRef } from "react";

const DEFAULT_EVENTS = ["mousedown", "touchstart"];

export function useClickOutside(handler, events, nodes) {
  const ref = useRef();

  useEffect(() => {
    const listener = (event) => {
      if (Array.isArray(nodes)) {
        const shouldIgnore = event?.target?.hasAttribute(
          "data-ignore-outside-clicks"
        );
        const shouldTrigger = nodes.every(
          (node) => !!node && !node.contains(event.target)
        );
        shouldTrigger && !shouldIgnore && handler();
      } else if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    (events || DEFAULT_EVENTS).forEach((fn) =>
      document.addEventListener(fn, listener)
    );

    return () => {
      (events || DEFAULT_EVENTS).forEach((fn) =>
        document.removeEventListener(fn, listener)
      );
    };
  }, [ref, handler, nodes]);

  return ref;
}
