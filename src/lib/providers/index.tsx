import SonnerProvider from "./sonner-provider";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SonnerProvider>{children}</SonnerProvider>
    </ThemeProvider>
  );
}
