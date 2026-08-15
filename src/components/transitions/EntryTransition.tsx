import { useEffect } from "react";

import { useEchoStore } from "../../store/echo.store";

export default function EntryTransition() {
  const view = useEchoStore((state) => state.view);

  const completeEntry = useEchoStore(
    (state) => state.completeEntry,
  );

  useEffect(() => {
    if (view !== "entering") {
      return;
    }

    const timer = window.setTimeout(() => {
      completeEntry();
    }, 1800);

    return () => {
      window.clearTimeout(timer);
    };
  }, [view, completeEntry]);

  return null;
}