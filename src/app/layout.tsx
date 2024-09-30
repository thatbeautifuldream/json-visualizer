import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JSON Visualizer",
  description: "A tool to visualize and format JSON data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Toaster richColors position="bottom-right" />
        {children}
      </body>
    </html>
  );
}
