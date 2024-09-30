import React from "react";
import JSONGrid from "@redheadphone/react-json-grid";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";

interface JsonGridProps {
  data: any;
  error: string | null;
}

export function JsonGrid({ data, error }: JsonGridProps) {
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }
  return (
    <div className="h-full overflow-auto">
      <JSONGrid data={data} theme="defaultLight" />
    </div>
  );
}
