"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { JsonInput } from "@/components/json-input";
import { JsonViewer } from "@/components/json-viewer";
import { Github } from "lucide-react";

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
        <div className="bg-gray-100 px-4 py-2 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-4">
            <h1 className="text-md font-bold text-gray-800">JSON Visualizer</h1>
            <TabsList>
              <TabsTrigger value="input">Input</TabsTrigger>
              <TabsTrigger value="viewer">Viewer</TabsTrigger>
            </TabsList>
          </div>
          <Button
            variant="ghost"
            size="xs"
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
        </div>
        <div className="flex-grow flex flex-col">
          <TabsContent value="input" className="flex-grow p-4">
            <JsonInput jsonInput={jsonInput} setJsonInput={setJsonInput} />
          </TabsContent>
          <TabsContent value="viewer" className="flex-grow p-4">
            <JsonViewer parsedJson={parsedJson} error={error} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
