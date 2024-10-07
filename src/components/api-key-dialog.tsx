"use client";

import { useState } from "react";
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

  const handleSave = () => {
    setOpenAIKey(inputKey);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {openAIKey ? "Update API Key" : "Set API Key"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set OpenAI API Key</DialogTitle>
          <DialogDescription>
            Enter your OpenAI API key to enable JSON explanations. We do not
            store your key; it&apos;s only used to generate responses to help
            you understand your JSONs better.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="api-key" className="text-right">
              API Key
            </Label>
            <Input
              id="api-key"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="col-span-3"
              type="password"
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
