"use client";

import { useEffect, useState } from "react";

export type WidgetContext = {
  user_name: string;
  user_email: string;
  app_id: string;
  app_unique_key: string;
};

export function useWidgetBridge() {
  const [context, setContext] = useState<WidgetContext | null>(null);

  useEffect(() => {
    console.log("🟢 Widget mounted, sending READY");

    window.parent.postMessage({ type: "WIDGET_READY" }, "*");

    const handler = (event: MessageEvent) => {
      console.log("📩 Widget got:", event.data);

      if (event.data?.type === "INIT_WIDGET") {
        setContext(event.data.payload);
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  return { context, setContext };
}
