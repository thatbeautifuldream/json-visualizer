import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { FileJson, Loader2 } from "lucide-react";

interface LoadJsonModalProps {
  onJsonLoaded: (json: string) => void;
}

export function LoadJsonModal({ onJsonLoaded }: LoadJsonModalProps) {
  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadJson = async () => {
    if (!url) return;

    setIsLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch JSON");
      }
      const json = await response.json();
      onJsonLoaded(JSON.stringify(json, null, 2));
      setIsOpen(false);
      toast.success("JSON loaded successfully");
    } catch {
      toast.error("Failed to load JSON from URL");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLoadJson();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="xs" variant="outline">
          <FileJson className="w-4 h-4 mr-2" />
          Load JSON
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Load JSON from URL</DialogTitle>
          <DialogDescription>
            Enter a URL that returns JSON data.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input
            id="json-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="https://api.example.com/data.json"
            disabled={isLoading}
          />
        </div>
        <DialogFooter>
          <Button
            onClick={handleLoadJson}
            variant="outline"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading
              </>
            ) : (
              "Load"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
