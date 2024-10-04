"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

export default function SonnerProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  return (
    <>
      <Toaster
        richColors
        position="bottom-right"
        theme={theme === "dark" ? "dark" : "light"}
      />
      {children}
    </>
  );
}
