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

interface JsonExplanationProps {
  jsonData: any;
}

export function JsonExplanation({ jsonData }: JsonExplanationProps) {
  const { theme } = useTheme();

  const explainJsonMutation = useMutation({
    mutationKey: ["explainJson"],
    mutationFn: explainJson,
  });

  useEffect(() => {
    explainJsonMutation.mutate({
      apiKey: "",
      jsonData: jsonData,
    });
  }, []);

  if (explainJsonMutation.isPending) {
    return <div>Loading explanation...</div>;
  }

  if (explainJsonMutation.isError) {
    return <div>Error: {explainJsonMutation.error.message}</div>;
  }

  if (explainJsonMutation.isSuccess) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>{explainJsonMutation?.data?.data?.summary}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Detailed Explanation</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-320px)]">
              {explainJsonMutation?.data?.data?.steps.map((step, index) => (
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

// Helper function to format JSON
function formatJSON(jsonString: string): string {
  try {
    // Attempt to parse and re-stringify to format
    return JSON.stringify(JSON.parse(jsonString), null, 2);
  } catch (error) {
    // If parsing fails, return the original string
    console.warn("Failed to parse JSON:", error);
    return jsonString;
  }
}
