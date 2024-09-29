import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Clipboard, Copy, FileJson, Trash, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { LoadJsonModal } from "./load-json-modal";

interface JsonInputProps {
  jsonInput: string;
  setJsonInput: (value: string) => void;
}

export function JsonInput({ jsonInput, setJsonInput }: JsonInputProps) {
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setJsonInput(text);
      toast.success("JSON pasted successfully");
    } catch {
      toast.error("Failed to paste from clipboard");
    }
  };

  const handleCopy = () => {
    try {
      navigator.clipboard.writeText(jsonInput);
      toast.success("JSON copied to clipboard");
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleFormat = () => {
    try {
      const formatted = JSON.stringify(JSON.parse(jsonInput), null, 2);
      setJsonInput(formatted);
      toast.success("JSON formatted successfully");
    } catch {
      toast.error("Invalid JSON: Unable to format");
    }
  };

  const handleRemoveWhitespace = () => {
    try {
      const compact = JSON.stringify(JSON.parse(jsonInput));
      setJsonInput(compact);
      toast.success("Whitespace removed successfully");
    } catch {
      toast.error("Invalid JSON: Unable to remove whitespace");
    }
  };

  const handleClear = () => {
    setJsonInput("");
    toast.info("Input cleared");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex space-x-2 mb-2">
        <Button onClick={handlePaste} size="sm">
          <Clipboard className="w-4 h-4 mr-2" />
          Paste
        </Button>
        <Button onClick={handleCopy} size="sm">
          <Copy className="w-4 h-4 mr-2" />
          Copy
        </Button>
        <Button onClick={handleFormat} size="sm">
          <FileJson className="w-4 h-4 mr-2" />
          Format
        </Button>
        <Button onClick={handleRemoveWhitespace} size="sm">
          <X className="w-4 h-4 mr-2" />
          Remove whitespace
        </Button>
        <Button onClick={handleClear} size="sm">
          <Trash className="w-4 h-4 mr-2" />
          Clear
        </Button>
        <LoadJsonModal onJsonLoaded={setJsonInput} />
      </div>
      <Textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Paste your JSON here"
        className="flex-grow resize-none font-mono"
      />
    </div>
  );
}
