import { LearnMorePopup } from "@/components/learn-more-popup";
import Providers from "@/lib/providers";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JSON Visualiser",
  description: "A tool to visualise and format JSON data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={raleway.className} suppressHydrationWarning>
        <LearnMorePopup />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
