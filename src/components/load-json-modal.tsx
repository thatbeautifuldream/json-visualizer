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

interface LoadJsonModalProps {
  onJsonLoaded: (json: string) => void;
}

export function LoadJsonModal({ onJsonLoaded }: LoadJsonModalProps) {
  const [url, setUrl] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleLoadJson = async () => {
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
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Load JSON</Button>
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
            placeholder="https://api.example.com/data.json"
          />
        </div>
        <DialogFooter>
          <Button onClick={handleLoadJson}>Load</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
