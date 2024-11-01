"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { FileJson, Eye } from "lucide-react";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

export function ExploreGrid() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useQuery({
    queryKey: ["explore", currentPage],
    queryFn: () => fetchDocuments(currentPage),
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <Card key={doc.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileJson className="h-5 w-5" />
                <span className="truncate">{doc.title || "Untitled"}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Eye className="h-4 w-4" />
                <span>{doc.viewCount} views</span>
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                Shared {formatDistanceToNow(new Date(doc.createdAt))} ago
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/s/${doc.id}`} className="w-full">
                <Button variant="secondary" className="w-full">
                  View JSON
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {pagination && (
        <Pagination>
          <PaginationContent>
            <PaginationPrevious
              onClick={() => handlePageChange(currentPage - 1)}
              isActive={currentPage > 1}
            />
            <div className="text-sm">
              Page {currentPage} of {pagination.totalPages}
            </div>
            <PaginationNext
              onClick={() => handlePageChange(currentPage + 1)}
              isActive={currentPage < pagination.totalPages}
            />
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
