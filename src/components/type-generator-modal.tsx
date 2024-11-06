import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, Code2, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import JsonToTS from "json-to-ts";

interface TypeGeneratorModalProps {
  jsonInput: string;
}

export function TypeGeneratorModal({ jsonInput }: TypeGeneratorModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [generatedInterfaces, setGeneratedInterfaces] = useState<string>("");

  useEffect(() => {
    try {
      const parsedJson = JSON.parse(jsonInput);
      const interfaces = JsonToTS(parsedJson).join("\n\n");
      setGeneratedInterfaces(interfaces);
    } catch {
      //   toast.error("Invalid JSON: Unable to generate type");
    }
  }, [jsonInput]);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(generatedInterfaces)
      .then(() => {
        setIsCopied(true);
        toast.success("Type definition copied to clipboard");
        setTimeout(() => setIsCopied(false), 1500);
      })
      .catch(() => toast.error("Failed to copy to clipboard"));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="xs" variant="outline">
          <Code2 className="w-4 h-4 md:mr-2" />
          <span className="hidden md:inline">Generate Type</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Generated TypeScript Type</DialogTitle>
        </DialogHeader>
        <div className="relative mt-4">
          <pre className="bg-black p-4 rounded-md overflow-auto max-h-[60vh]">
            <code className="text-white">{generatedInterfaces}</code>
          </pre>
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={handleCopy}
          >
            {isCopied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
