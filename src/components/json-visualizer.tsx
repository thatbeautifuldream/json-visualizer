"use client";

import { JsonInput } from "@/components/json-input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Braces, Github } from "lucide-react";
import { useQueryState } from "nuqs";
import { useEffect } from "react";
import { JsonGrid } from "./json-grid";
import { JsonView } from "./json-view";
import Loader from "./loader";
import { ModeToggle } from "./mode-toggle";
import { JsonExplanation } from "@/components/json-explanation";
import { useTabStore, TabValue } from "@/lib/stores/tab-store";

export function JsonVisualizer() {
  const activeTab = useTabStore.use.activeTab();
  const jsonInput = useTabStore.use.jsonInput();
  const parsedJson = useTabStore.use.parsedJson();
  const error = useTabStore.use.error();
  const isLoading = useTabStore.use.isLoading();
  const setActiveTab = useTabStore.use.setActiveTab();
  const setJsonInput = useTabStore.use.setJsonInput();
  const setParsedJson = useTabStore.use.setParsedJson();
  const setError = useTabStore.use.setError();
  const setIsLoading = useTabStore.use.setIsLoading();

  const [url] = useQueryState("url");

  useEffect(() => {
    if (url) {
      setIsLoading(true);
      fetch(url)
        .then((response) => response.text())
        .then((data) => {
          setJsonInput(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch JSON: " + err.message);
          setIsLoading(false);
        });
    }
  }, [url, setJsonInput, setError, setIsLoading]);

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
            <h1 className="text-md font-bold text-gray-800 dark:text-white">
              <div className="block sm:hidden">
                <Braces className="w-4 h-4" />
              </div>
              <span className="hidden sm:block">JSON Visualizer</span>
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
              <TabsTrigger
                value="ai"
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 dark:text-gray-300"
              >
                AI
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
            </Button>
            <ModeToggle />
          </div>
        </div>
        <div className="flex-grow flex flex-col">
          <TabsContent value="input" className="flex-grow p-4">
            <JsonInput
              jsonInput={jsonInput}
              setJsonInput={handleJsonInputChange}
            />
          </TabsContent>
          <TabsContent value="tree" className="flex-grow p-4">
            {isLoading ? (
              <Loader />
            ) : (
              parsedJson && <JsonView parsedJson={parsedJson} error={error} />
            )}
          </TabsContent>
          <TabsContent value="grid" className="flex-grow p-4">
            {isLoading ? (
              <Loader />
            ) : (
              parsedJson && <JsonGrid data={parsedJson} error={error} />
            )}
          </TabsContent>
          <TabsContent value="ai" className="flex-grow p-4">
            {isLoading ? (
              <Loader />
            ) : (
              parsedJson && <JsonExplanation jsonData={parsedJson} />
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
