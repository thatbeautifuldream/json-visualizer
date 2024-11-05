import { ExploreGrid } from "@/components/explore-grid";
import { env } from "@/env";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ExplorePage({
  params,
}: {
  params: Promise<{
    page: number;
  }>;
}) {
  const cookieStore = await cookies();
  const adminKey = cookieStore.get("ADMIN_KEY")?.value;

  if (!adminKey || adminKey !== env.ADMIN_KEY) {
    redirect("/");
  }

  const page = (await params).page ?? 1;
  return (
    <div className="container mx-auto py-8">
      <ExploreGrid page={page} />
    </div>
  );
}
