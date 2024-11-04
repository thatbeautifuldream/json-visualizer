import { AdminGrid } from "@/components/admin-grid";

export default async function AdminPage({
  params,
}: {
  params: Promise<{
    page: number;
  }>;
}) {
  const page = (await params).page ?? 1;
  return (
    <div className="container mx-auto py-8">
      <AdminGrid page={page} />
    </div>
  );
}
