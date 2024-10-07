"use client";

import { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import { useKeyStore } from "@/lib/stores/key-store";

export function ApiKeyDialog() {
  const [open, setOpen] = useState(false);
  const [inputKey, setInputKey] = useState("");
  const { setOpenAIKey, openAIKey } = useKeyStore();

  useEffect(() => {
    if (open && openAIKey) {
      setInputKey("•".repeat(openAIKey.length));
    } else {
      setInputKey("");
    }
  }, [open, openAIKey]);

  const handleSave = () => {
    if (inputKey !== "•".repeat(openAIKey?.length)) {
      setOpenAIKey(inputKey);
    }
    setOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value !== "•".repeat(value.length)) {
      setInputKey(value);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {openAIKey ? "Update OpenAI API Key" : "Set OpenAI API Key"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>OpenAI API Key Configuration</DialogTitle>
          <DialogDescription>
            Enhance your JSON understanding with AI-powered explanations. Your
            API key enables secure, on-demand insights without being stored on
            our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="api-key">OpenAI API Key</Label>
            <Input
              id="api-key"
              value={inputKey}
              onChange={handleInputChange}
              type="password"
              placeholder={openAIKey ? "" : "Enter your OpenAI API key"}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Your API key is used solely for generating explanations and is never
            stored or logged. Ensure you keep your key confidential and do not
            share it with others.
          </p>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save API Key</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
