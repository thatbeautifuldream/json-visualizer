"use client";

import { JsonInput } from "@/components/json-input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github } from "lucide-react";
import { useEffect, useState } from "react";
import { JsonGrid } from "./json-grid";
import { JsonView } from "./json-view";
import { ModeToggle } from "./mode-toggle";

export function JsonVisualizer() {
  const [jsonInput, setJsonInput] = useState("");
  const [parsedJson, setParsedJson] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("input");

  useEffect(() => {
    try {
      const parsed = JSON.parse(jsonInput);
      setParsedJson(parsed);
      setError(null);
    } catch (err) {
      setError("Invalid JSON: " + (err as Error).message);
      setParsedJson(null);
    }
  }, [jsonInput]);

  return (
    <div className="h-screen flex flex-col font-inter">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-grow flex flex-col"
      >
        <div className="bg-gray-100 dark:bg-black px-4 py-2 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-4">
            <h1 className="text-md font-bold text-gray-800 dark:text-white">
              JSON Visualizer
            </h1>
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
            </TabsList>
          </div>
          <div className="flex items-center space-x-4">
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
              <span className="inline sm:hidden">json-viz</span>
            </Button>
            <ModeToggle />
          </div>
        </div>
        <div className="flex-grow flex flex-col">
          <TabsContent value="input" className="flex-grow p-4">
            <JsonInput jsonInput={jsonInput} setJsonInput={setJsonInput} />
          </TabsContent>
          <TabsContent value="tree" className="flex-grow p-4">
            <JsonView parsedJson={parsedJson} error={error} />
          </TabsContent>
          <TabsContent value="grid" className="flex-grow p-4">
            <JsonGrid data={parsedJson} error={error} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
