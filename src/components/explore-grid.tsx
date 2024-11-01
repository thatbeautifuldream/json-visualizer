"use client";

import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Eye, FileJson } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

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

export function ExploreGrid({ page }: { page: number }) {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["explore", page],
    queryFn: () => fetchDocuments(page),
  });

  const documents: Document[] = data?.documents ?? [];
  const pagination: PaginationData = data?.pagination;

  function handlePageChange(page: number) {
    router.push(`/explore?page=${page}`);
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {documents.map((doc) => (
          <Link href={`/s/${doc.id}`} key={doc.id}>
            <Card className="hover:bg-accent transition-colors">
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
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
