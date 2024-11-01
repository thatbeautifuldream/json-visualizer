import { ExploreGrid } from "@/components/explore-grid";

export default async function ExplorePage({
  params,
}: {
  params: Promise<{
    page: number;
  }>;
}) {
  const page = (await params).page ?? 1;
  return (
    <div className="container mx-auto py-8">
      <ExploreGrid page={page} />
    </div>
  );
}
