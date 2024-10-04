import React from "react";
import JSONGrid from "@redheadphone/react-json-grid";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";
import { useTheme } from "next-themes";

interface JsonGridProps {
  data: any;
  error: string | null;
}

export function JsonGrid({ data, error }: JsonGridProps) {
  const { theme } = useTheme();
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
    <div className="h-full  overflow-auto">
      <JSONGrid
        className="font-mono"
        data={data}
        theme={theme === "dark" ? "moonLight" : "defaultLight"}
      />
    </div>
  );
}
