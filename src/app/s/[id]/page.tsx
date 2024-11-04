import { JsonVisualizer } from "@/components/json-visualizer";

interface SharedJsonPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SharedJsonPage({ params }: SharedJsonPageProps) {
  const jsonId = (await params).id;
  return <div>{jsonId && <JsonVisualizer initialShareId={jsonId} />}</div>;
}
