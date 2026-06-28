"use client";

import { PollarProvider } from "@pollar/react";
import "@pollar/react/styles.css";
import { POLLAR_PUBLISHABLE_KEY } from "@/lib/config";
import type { ReactNode } from "react";

// PollarProvider builds its client from a PollarClientConfig ({ apiKey }).
export function Providers({ children }: { children: ReactNode }) {
  return (
    <PollarProvider client={{ apiKey: POLLAR_PUBLISHABLE_KEY }}>
      {children}
    </PollarProvider>
  );
}
