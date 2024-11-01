import { SharedJsonViewer } from "@/components/shared-json-viewer";

interface SharedJsonPageProps {
  params: {
    id: string;
  };
}

export default function SharedJsonPage({ params }: SharedJsonPageProps) {
  return (
    <div className="container mx-auto py-8">
      <SharedJsonViewer id={params.id} />
    </div>
  );
}
