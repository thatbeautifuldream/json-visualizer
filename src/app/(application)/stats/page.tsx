import { StatsCard } from "@/components/stats-card";
import { env } from "@/env";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function StatsPage() {
  const cookieStore = await cookies();
  const adminKey = cookieStore.get("ADMIN_KEY")?.value;

  if (!adminKey || adminKey !== env.ADMIN_KEY) {
    redirect("/");
  }

  return (
    <div className="container mx-auto py-8">
      <StatsCard />
    </div>
  );
}
