import { ExploreGrid } from "@/components/explore-grid";

export const dynamic = "force-dynamic";

export default function ExplorePage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Explore</h1>
        <p className="text-muted-foreground">
          Browse recently shared JSON documents
        </p>
      </div>
      <ExploreGrid />
    </div>
  );
}
