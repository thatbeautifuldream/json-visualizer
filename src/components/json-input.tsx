import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface JsonInputProps {
  jsonInput: string;
  setJsonInput: (value: string) => void;
}

export function JsonInput({ jsonInput, setJsonInput }: JsonInputProps) {
  return (
    <div className="h-full flex flex-col">
      <Textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Paste your JSON here"
        className="flex-grow resize-none font-mono"
      />
    </div>
  );
}
