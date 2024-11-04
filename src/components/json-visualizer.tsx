"use client";

import { JsonExplanation } from "@/components/json-explanation";
import { JsonGrid } from "@/components/json-grid";
import { JsonInput } from "@/components/json-input";
import { JsonView } from "@/components/json-view";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TabValue,
  useJsonVisualizerStore,
} from "@/lib/stores/json-visualizer-store";
import { Braces, Github } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { ShareDialog } from "@/components/share-dialog";
import { fetchSharedJson } from "@/lib/services/share";
import { useQuery } from "@tanstack/react-query";

interface JsonVisualizerProps {
  initialShareId?: string;
}

export function JsonVisualizer({ initialShareId }: JsonVisualizerProps) {
  const {
    activeTab,
    jsonInput,
    parsedJson,
    error,
    setActiveTab,
    setJsonInput,
    setParsedJson,
    setError,
  } = useJsonVisualizerStore();

  useEffect(() => {
    try {
      const parsed = JSON.parse(jsonInput || "");
      setParsedJson(parsed);
      setError(null);
    } catch (err) {
      setError("Invalid JSON: " + (err as Error).message);
      setParsedJson(null);
    }
  }, [jsonInput, setParsedJson, setError]);

  const { data, isLoading } = useQuery({
    enabled: !!initialShareId,
    queryKey: ["sharedJson", initialShareId],
    queryFn: () => fetchSharedJson(initialShareId || ""),
  });

  const handleJsonInputChange = (value: string) => {
    setJsonInput(value);
  };

  return (
    <div className="h-screen flex flex-col font-inter">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabValue)}
        className="flex-grow flex flex-col"
      >
        <div className="bg-gray-100 dark:bg-black px-4 py-2 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-md font-bold text-gray-800 dark:text-white"
            >
              <div className="block sm:hidden">
                <Braces className="w-4 h-4" />
              </div>
              <span className="hidden sm:block">JSON Visualizer</span>
            </Link>
            <TabsList className="bg-gray-200 dark:bg-gray-900">
              <TabsTrigger
                value="input"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 dark:text-gray-300"
              >
                Input
              </TabsTrigger>
              <TabsTrigger
                value="tree"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 dark:text-gray-300"
              >
                Tree
              </TabsTrigger>
              <TabsTrigger
                value="grid"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 dark:text-gray-300"
              >
                Grid
              </TabsTrigger>
              <TabsTrigger
                value="ai"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 dark:text-gray-300"
              >
                AI
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="flex items-center space-x-4">
            {!initialShareId && <ShareDialog jsonInput={jsonInput} />}
            <Button
              variant="ghost"
              size="xs"
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
              onClick={() =>
                window.open(
                  "https://github.com/thatbeautifuldream/json-visualizer",
                  "_blank"
                )
              }
            >
              <Github className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">
                thatbeautifuldream/json-visualizer
              </span>
            </Button>
            <ModeToggle />
          </div>
        </div>
        <div className="flex-grow flex flex-col">
          <TabsContent value="input" className="flex-grow p-4">
            {data ? (
              <JsonInput
                jsonInput={jsonInput}
                setJsonInput={handleJsonInputChange}
                isSharedJson={!!initialShareId}
                sharedJsonMetadata={data.metadata}
                isSharedJsonLoading={isLoading}
              />
            ) : (
              <JsonInput
                jsonInput={jsonInput}
                setJsonInput={handleJsonInputChange}
                isSharedJson={false}
              />
            )}
          </TabsContent>
          <TabsContent value="tree" className="flex-grow p-4">
            {parsedJson && <JsonView parsedJson={parsedJson} error={error} />}
          </TabsContent>
          <TabsContent value="grid" className="flex-grow p-4">
            {parsedJson && <JsonGrid data={parsedJson} error={error} />}
          </TabsContent>
          <TabsContent value="ai" className="flex-grow p-4">
            {parsedJson && <JsonExplanation jsonData={parsedJson} />}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
