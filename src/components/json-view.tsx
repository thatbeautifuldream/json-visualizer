import React from "react";
import dynamic from "next/dynamic";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const ReactJson = dynamic(() => import("react-json-view"), { ssr: false });

interface JsonViewProps {
  parsedJson: any;
  error: string | null;
}

export function JsonView({ parsedJson, error }: JsonViewProps) {
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
          theme="rjv-default"
          displayDataTypes={false}
          enableClipboard={false}
          collapsed={1}
          style={{ padding: "1rem" }}
        />
      )}
    </div>
  );
}
