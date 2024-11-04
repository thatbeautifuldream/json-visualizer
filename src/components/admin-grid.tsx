"use client";

import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Eye, FileJson, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { toast } from "sonner";

interface Document {
  id: string;
  title: string;
  size: number;
  viewCount: number;
  createdAt: string;
  expiresAt: string;
  isValid: boolean;
}

interface PaginationData {
  total: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}

async function fetchDocuments(page: number) {
  const res = await fetch(`/api/share?all=true&page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch documents");
  return res.json();
}

async function deleteDocument(id: string) {
  const res = await fetch(`/api/share?id=${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete document");
  return res.json();
}

export function AdminGrid({ page }: { page: number }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-explore", page],
    queryFn: () => fetchDocuments(page),
  });

  const documents: Document[] = data?.documents ?? [];
  const pagination: PaginationData = data?.pagination;

  function handlePageChange(page: number) {
    router.push(`/admin?page=${page}`);
  }

  async function handleDelete(e: React.MouseEvent, id: string, title: string) {
    e.preventDefault(); // Prevent navigation
    try {
      await deleteDocument(id);
      await queryClient.invalidateQueries({ queryKey: ["admin-explore"] });
      toast.success(`Deleted "${title || "Untitled"}" successfully`);
    } catch {
      toast.error("Failed to delete document");
    }
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {documents.map((doc) => (
          <Link href={`/s/${doc.id}`} key={doc.id}>
            <Card className="hover:bg-accent transition-colors relative">
              <div className="p-4 space-y-2">
                <div className="absolute -top-2 -right-2 z-10">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="secondary"
                          size="icon"
                          className="h-8 w-8 rounded-full shadow-sm hover:bg-destructive hover:text-destructive-foreground transition-colors"
                          onClick={(e) => handleDelete(e, doc.id, doc.title)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Delete document</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <FileJson className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  <span className="truncate font-medium text-sm">
                    {doc.title || "Untitled"}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Eye className="h-3 w-3" />
                  <span>{doc.viewCount}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(doc.createdAt))} ago
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {pagination && (
        <Pagination>
          <PaginationContent>
            <PaginationPrevious
              onClick={() => handlePageChange(page - 1)}
              isActive={page > 1}
            />
            <div className="text-sm">
              Page {page} of {pagination.totalPages}
            </div>
            <PaginationNext
              onClick={() => handlePageChange(page + 1)}
              isActive={page < pagination.totalPages}
            />
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-8" />
          </div>
          <Skeleton className="h-3 w-1/3" />
        </Card>
      ))}
    </div>
  );
}
