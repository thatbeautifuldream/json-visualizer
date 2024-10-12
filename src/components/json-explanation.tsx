"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { explainJson } from "@/lib/services/openai";
import { useMutation } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  a11yDark,
  // @ts-expect-error : types are not correct
  a11yLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useKeyStore } from "@/lib/stores/key-store";
import { ApiKeyDialog } from "./api-key-dialog";
import Loader from "./loader";
import { useJsonVisualizerStore } from "@/lib/stores/json-visualizer-store";

interface JsonExplanationProps {
  jsonData: any;
}

export function JsonExplanation({ jsonData }: JsonExplanationProps) {
  const { theme } = useTheme();
  const { openAIKey } = useKeyStore();
  const aiExplanation = useJsonVisualizerStore.use.aiExplanation();
  const setAIExplanation = useJsonVisualizerStore.use.setAIExplanation();

  const explainJsonMutation = useMutation({
    mutationKey: ["explainJson"],
    mutationFn: explainJson,
  });

  useEffect(() => {
    if (openAIKey && !aiExplanation) {
      explainJsonMutation.mutate({
        apiKey: openAIKey,
        jsonData: jsonData,
      });
    }
  }, [openAIKey, jsonData, aiExplanation]);

  useEffect(() => {
    if (explainJsonMutation.isSuccess) {
      setAIExplanation(explainJsonMutation?.data?.data);
    }
  }, [explainJsonMutation.isSuccess, setAIExplanation]);

  if (!openAIKey) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <p>Please set your OpenAI API key to get JSON explanations.</p>
        <ApiKeyDialog />
      </div>
    );
  }

  if (explainJsonMutation.isPending && !aiExplanation) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    );
  }

  if (explainJsonMutation.isError && !aiExplanation) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <p>Error: {explainJsonMutation.error.message}</p>
        <ApiKeyDialog />
      </div>
    );
  }

  if (aiExplanation) {
    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <ApiKeyDialog />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>{aiExplanation.summary}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Detailed Explanation</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-320px)]">
              {aiExplanation.steps.map((step, index) => (
                <div key={index} className="mb-6">
                  <p className="font-semibold mb-2">{step.explanation}</p>
                  <SyntaxHighlighter
                    language="json"
                    style={theme === "dark" ? a11yDark : a11yLight}
                    customStyle={{
                      margin: 0,
                      borderRadius: "0.375rem",
                    }}
                    wrapLines={true}
                    showLineNumbers={true}
                  >
                    {formatJSON(step.output)}
                  </SyntaxHighlighter>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    );
  }
}

// Helper function to format JSON (unchanged)
function formatJSON(jsonString: string): string {
  try {
    return JSON.stringify(JSON.parse(jsonString), null, 2);
  } catch (error) {
    console.warn("Failed to parse JSON:", error);
    return jsonString;
  }
}
