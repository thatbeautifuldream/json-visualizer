import { Suspense } from "react";
import { JsonVisualizer } from "@/components/json-visualizer";
import Loader from "@/components/loader";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<Loader />}>
        <JsonVisualizer />
      </Suspense>
    </main>
  );
}
