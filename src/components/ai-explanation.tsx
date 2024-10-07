"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import a11yDark from "react-syntax-highlighter/dist/esm/styles/prism";
import a11yLight from "react-syntax-highlighter/dist/esm/styles/prism";
import { json_explanation } from "@/lib/data";
import { useTheme } from "next-themes";

interface ExplanationStep {
  explanation: string;
  output: string;
}

interface AIExplanationProps {
  jsonData: any;
}

export function AIExplanation({ jsonData }: AIExplanationProps) {
  const { theme } = useTheme();
  const [explanation, setExplanation] = useState<{
    steps: ExplanationStep[];
    summary: string;
  } | null>(null);

  useEffect(() => {
    setExplanation(json_explanation.data);
  }, [jsonData]);

  if (!explanation) {
    return <div>Loading explanation...</div>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Summary</CardTitle>
        </CardHeader>
        <CardContent>{explanation.summary}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Detailed Explanation</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-320px)]">
            {explanation.steps.map((step, index) => (
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
