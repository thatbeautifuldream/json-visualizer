type FetchDocumentsResponse = {
  documents: {
    id: string;
    title: string;
    size: number;
    viewCount: number;
    createdAt: string;
    expiresAt: string;
    isValid: boolean;
  }[];
  pagination: {
    total: number;
    pageSize: number;
    currentPage: number;
    totalPages: number;
  };
};

export async function fetchDocuments(
  page: number
): Promise<FetchDocumentsResponse> {
  const res = await fetch(`/api/share?all=true&page=${page}`);
  if (!res.ok) throw new Error("Failed to fetch documents");
  return res.json();
}

type DeleteDocumentResponse = {
  message: string;
  id: string;
};

export async function deleteDocument(
  id: string,
  adminKey: string
): Promise<DeleteDocumentResponse> {
  const res = await fetch(`/api/share?id=${id}&adminKey=${adminKey}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete document");
  return res.json();
}
