import React from "react";
import dynamic from "next/dynamic";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useTheme } from "next-themes";

const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });

interface JsonViewProps {
  parsedJson: any;
  error: string | null;
}

export function JsonTree({ parsedJson, error }: JsonViewProps) {
  const { theme } = useTheme();

  return (
    <div className="h-full overflow-auto">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {parsedJson && (
        <ReactJson
          src={parsedJson}
          theme={theme === "dark" ? "bright" : "bright:inverted"}
          displayDataTypes={false}
          enableClipboard={false}
          collapsed={1}
          style={{ padding: "1rem" }}
        />
      )}
    </div>
  );
}
