"use client";

import { JsonExplanation } from "@/components/json-explanation";
import { JsonGrid } from "@/components/json-grid";
import { JsonInput } from "@/components/json-input";
import { ModeToggle } from "@/components/mode-toggle";
import { ShareDialog } from "@/components/share-dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchSharedJson } from "@/lib/services/share";
import {
  TabValue,
  useJsonVisualizerStore,
} from "@/lib/stores/json-visualizer-store";
import { useQuery } from "@tanstack/react-query";
import { Braces, Github } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { JsonTree } from "./json-true";

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

  const { data, isLoading, isSuccess, isError } = useQuery({
    enabled: !!initialShareId,
    queryKey: ["sharedJson", initialShareId],
    queryFn: () => fetchSharedJson(initialShareId || ""),
  });

  useEffect(() => {
    if (isSuccess && data?.json) {
      setJsonInput(data.json);
      try {
        const parsed = JSON.parse(data.json);
        setParsedJson(parsed);
        setError(null);
      } catch {
        setError("Invalid JSON format");
      }
    }
    if (isError) {
      setError("Error fetching shared JSON");
    }
  }, [isSuccess, isError, data, setJsonInput, setParsedJson, setError]);

  const handleJsonInputChange = (value: string) => {
    setJsonInput(value);
    try {
      const parsed = JSON.parse(value);
      setParsedJson(parsed);
      setError(null);
    } catch {
      setError("Invalid JSON format");
    }
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
              <span className="hidden sm:block">JSON Visualiser</span>
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
          <div className="flex items-center space-x-0">
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
              <span className="hidden sm:inline">json-visualizer</span>
            </Button>
            <ModeToggle />
          </div>
        </div>
        <div className="flex-grow flex flex-col">
          <TabsContent value="input" className="flex-grow p-4">
            {isSuccess ? (
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
            {parsedJson && <JsonTree parsedJson={parsedJson} error={error} />}
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
