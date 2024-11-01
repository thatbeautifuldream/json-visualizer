import { Header } from "@/components/layout/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header className="px-4 py-3" />
      {children}
    </>
  );
}
