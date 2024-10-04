import { Suspense } from "react";
import { JsonVisualizer } from "@/components/json-visualizer";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <JsonVisualizer />
      </Suspense>
    </main>
  );
}
