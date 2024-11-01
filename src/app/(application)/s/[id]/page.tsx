import { SharedJsonViewer } from "@/components/shared-json-viewer";

interface SharedJsonPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SharedJsonPage({ params }: SharedJsonPageProps) {
  const jsonId = (await params).id;
  return (
    <div className="container mx-auto py-8">
      {jsonId && <SharedJsonViewer id={jsonId} />}
    </div>
  );
}
