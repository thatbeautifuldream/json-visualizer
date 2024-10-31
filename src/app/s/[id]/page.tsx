import { JsonVisualizer } from "@/components/json-visualizer";

interface SharedPageProps {
  params: {
    id: string;
  };
}

export default function SharedJsonPage({ params }: SharedPageProps) {
  return <JsonVisualizer initialShareId={params.id} />;
}
