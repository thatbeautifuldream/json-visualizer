import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Check,
  Clipboard,
  Copy,
  Cross,
  Eye,
  FileJson,
  FileText,
  HardDrive,
  Trash,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";

interface SharedJsonMetadata {
  title: string;
  viewCount: number;
  size: number;
  isValid: boolean;
}

interface JsonInputProps {
  jsonInput: string;
  setJsonInput: (value: string) => void;
  isSharedJson: boolean;
  sharedJsonMetadata?: SharedJsonMetadata;
  isSharedJsonLoading?: boolean;
}

export function JsonInput({
  jsonInput,
  setJsonInput,
  isSharedJson,
  sharedJsonMetadata,
  isSharedJsonLoading,
}: JsonInputProps) {
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

  function formatFileSize(bytes: number): string {
    const kb = bytes / 1024;
    if (kb < 1) {
      return `${bytes} bytes`;
    }
    return `${kb.toFixed(1)} KB`;
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 mb-2 overflow-x-auto whitespace-nowrap">
          {isSharedJson ? (
            <>
              <Button onClick={handleCopy} size="xs" variant="outline">
                <Copy className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Copy</span>
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handlePaste} size="xs" variant="outline">
                <Clipboard className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Paste</span>
              </Button>
              <Button onClick={handleCopy} size="xs" variant="outline">
                <Copy className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Copy</span>
              </Button>
              <Button onClick={handleFormat} size="xs" variant="outline">
                <FileJson className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Format</span>
              </Button>
              <Button
                onClick={handleRemoveWhitespace}
                size="xs"
                variant="outline"
              >
                <X className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Remove whitespace</span>
              </Button>
              <Button onClick={handleClear} size="xs" variant="outline">
                <Trash className="w-4 h-4 md:mr-2" />
                <span className="hidden md:inline">Clear</span>
              </Button>
            </>
          )}
        </div>
        <div className="flex space-x-4">
          {isSharedJsonLoading ? (
            <div className="flex space-x-4">
              <Skeleton className="flex items-center space-x-1">
                <div className="w-4 h-4" />
                <div className="w-24 h-4" />
              </Skeleton>
              <Skeleton className="flex items-center space-x-1">
                <div className="w-4 h-4" />
                <div className="w-20 h-4" />
              </Skeleton>
              <Skeleton className="flex items-center space-x-1">
                <div className="w-4 h-4" />
                <div className="w-16 h-4" />
              </Skeleton>
              <Skeleton className="flex items-center space-x-1">
                <div className="w-4 h-4" />
                <div className="w-12 h-4" />
              </Skeleton>
            </div>
          ) : (
            isSharedJson && (
              <>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <FileText className="w-4 h-4" />
                  <span>{sharedJsonMetadata?.title}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Eye className="w-4 h-4" />
                  <span>{sharedJsonMetadata?.viewCount} views</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <HardDrive className="w-4 h-4" />
                  <span>{formatFileSize(sharedJsonMetadata?.size ?? 0)}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  {sharedJsonMetadata?.isValid ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Cross className="w-4 h-4" />
                  )}
                  <span>{sharedJsonMetadata?.isValid ? "OK" : "Error"}</span>
                </div>
              </>
            )
          )}
        </div>
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
