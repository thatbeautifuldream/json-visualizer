import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface JsonFormattedProps {
  formattedJson: string;
}

export function JsonFormatted({ formattedJson }: JsonFormattedProps) {
  return (
    <div className="h-full flex flex-col">
      <Textarea
        value={formattedJson}
        placeholder="Formatted JSON will appear here"
        className="flex-grow resize-none font-mono"
        readOnly
      />
    </div>
  );
}
