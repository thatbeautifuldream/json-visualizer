"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import Prism from "prismjs";
import { Copy, Check } from "lucide-react";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-json";

interface SharedJson {
  json: any;
  metadata: {
    title: string;
    viewCount: number;
    size: number;
    isValid: boolean;
  };
}

interface SharedJsonViewerProps {
  id: string;
}

function formatJson(json: any): string {
  try {
    const parsed = typeof json === "string" ? JSON.parse(json) : json;
    return JSON.stringify(parsed, null, 2)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  } catch {
    return String(json);
  }
}

export function SharedJsonViewer({ id }: SharedJsonViewerProps) {
  const [data, setData] = useState<SharedJson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasCopied, setHasCopied] = useState(false);
  const [viewerHeight, setViewerHeight] = useState("calc(100vh - 12rem)");

  useEffect(() => {
    async function fetchSharedJson() {
      try {
        const response = await fetch(`/api/share?id=${id}`);

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to fetch JSON");
        }

        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to load shared JSON"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchSharedJson();
  }, [id]);

  useEffect(() => {
    if (data) {
      Prism.highlightAll();
    }
  }, [data]);

  useEffect(() => {
    function updateHeight() {
      const viewer = document.getElementById("json-viewer");
      if (viewer) {
        const viewerTop = viewer.getBoundingClientRect().top;
        const remainingHeight = `calc(100vh - ${viewerTop + 32}px)`;
        setViewerHeight(remainingHeight);
      }
    }

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, [data]);

  const onCopy = async () => {
    await navigator.clipboard.writeText(JSON.stringify(data?.json, null, 2));
    setHasCopied(true);
    toast.success("JSON copied to clipboard");

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  if (isLoading) {
    return <Skeleton className="w-full h-[200px]" />;
  }

  if (!data) {
    return <div>Failed to load shared JSON</div>;
  }

  return (
    <Card className="p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold">{data.metadata.title}</h2>
        <div className="text-sm text-muted-foreground">
          Views: {data.metadata.viewCount} | Size:{" "}
          {(data.metadata.size / 1024).toFixed(2)}KB
        </div>
      </div>
      <div id="json-viewer" className="relative">
        <Button
          variant="ghost"
          size="sm"
          className="absolute right-2 top-2 z-10 h-8 w-8 p-0 hover:bg-transparent"
          onClick={onCopy}
        >
          {hasCopied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="sr-only">Copy JSON</span>
        </Button>
        <ScrollArea
          className="w-full rounded-md border"
          style={{ height: viewerHeight }}
        >
          <pre className="rounded-lg overflow-auto">
            <code className="language-json text-sm font-mono whitespace-pre p-4">
              {formatJson(data.json)}
            </code>
          </pre>
        </ScrollArea>
      </div>
    </Card>
  );
}
