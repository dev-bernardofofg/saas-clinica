"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ReactNode } from "react";

import { ReactQueryProvider } from "./react-query";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ReactQueryProvider>
      <NuqsAdapter>{children}</NuqsAdapter>
    </ReactQueryProvider>
  );
};
