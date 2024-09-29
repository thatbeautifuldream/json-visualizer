"use client";

import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JsonInput } from "@/components/json-input";
import { JsonFormatted } from "@/components/json-formatted";
import { JsonView } from "@/components/json-view";

export function JsonVisualizer() {
  const [jsonInput, setJsonInput] = useState("");
  const [parsedJson, setParsedJson] = useState<any>(null);
  const [formattedJson, setFormattedJson] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("input");

  useEffect(() => {
    try {
      const parsed = JSON.parse(jsonInput);
      setParsedJson(parsed);
      setFormattedJson(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err) {
      setError("Invalid JSON: " + (err as Error).message);
      setParsedJson(null);
      setFormattedJson("");
    }
  }, [jsonInput]);

  return (
    <div className="h-screen flex flex-col font-inter">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-grow flex flex-col"
      >
        <TabsList className="justify-start">
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="formatted">Formatted</TabsTrigger>
          <TabsTrigger value="view">View</TabsTrigger>
        </TabsList>
        <div className="flex-grow">
          <TabsContent value="input" className="h-full">
            <JsonInput jsonInput={jsonInput} setJsonInput={setJsonInput} />
          </TabsContent>
          <TabsContent value="formatted" className="h-full">
            <JsonFormatted formattedJson={formattedJson} />
          </TabsContent>
          <TabsContent value="view" className="h-full">
            <JsonView parsedJson={parsedJson} error={error} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
