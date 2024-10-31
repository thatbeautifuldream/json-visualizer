"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

interface ShareDialogProps {
  jsonInput: string;
}

export function ShareDialog({ jsonInput }: ShareDialogProps) {
  const [title, setTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const validateJson = (jsonString: string) => {
    try {
      JSON.parse(jsonString);
      return true;
    } catch {
      return false;
    }
  };

  const handleShare = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title for your JSON");
      return;
    }

    if (!validateJson(jsonInput)) {
      toast.error("Invalid JSON format");
      return;
    }

    setIsSharing(true);
    try {
      const response = await fetch("/api/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          json: jsonInput,
          title: title.trim(),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to share JSON");
      }

      const data = await response.json();
      if (data.id) {
        const shareUrl = `${window.location.origin}/s/${data.id}`;
        await navigator.clipboard.writeText(shareUrl);
        toast.success("JSON shared successfully!", {
          description: "Share URL copied to clipboard",
        });
        setIsOpen(false);
        setTitle("");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to share JSON"
      );
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="xs"
          className="text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share JSON</DialogTitle>
          <DialogDescription>
            Give your JSON a title before sharing it.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 py-4">
          <Input
            placeholder="Enter a title for your JSON"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleShare();
              }
            }}
          />
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={handleShare}
            disabled={isSharing || !title.trim()}
          >
            {isSharing ? "Sharing..." : "Share"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
