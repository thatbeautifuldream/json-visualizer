import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Clipboard, Copy, FileJson, Trash, X } from "lucide-react";
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
      const parsed = JSON.parse(jsonInput);
      const formatted = JSON.stringify(parsed, null, 2);
      setJsonInput(formatted);
      toast.success("JSON formatted successfully");
    } catch (error) {
      toast.error(`Invalid JSON: ${(error as Error).message}`);
    }
  };

  const handleRemoveWhitespace = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const compact = JSON.stringify(parsed);
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

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(event.target.value);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex space-x-2 mb-2 overflow-x-auto whitespace-nowrap">
        <Button onClick={handlePaste} size="xs" variant="outline">
          <Clipboard className="w-4 h-4 mr-2" />
          Paste
        </Button>
        <Button onClick={handleCopy} size="xs" variant="outline">
          <Copy className="w-4 h-4 mr-2" />
          Copy
        </Button>
        <Button onClick={handleFormat} size="xs" variant="outline">
          <FileJson className="w-4 h-4 mr-2" />
          Format
        </Button>
        <Button onClick={handleRemoveWhitespace} size="xs" variant="outline">
          <X className="w-4 h-4 mr-2" />
          Remove whitespace
        </Button>
        <Button onClick={handleClear} size="xs" variant="outline">
          <Trash className="w-4 h-4 mr-2" />
          Clear
        </Button>
        <LoadJsonModal onJsonLoaded={setJsonInput} />
      </div>
      <Textarea
        value={jsonInput}
        onChange={handleInputChange}
        placeholder="Paste your JSON here"
        className="flex-grow resize-none font-mono"
      />
    </div>
  );
}
