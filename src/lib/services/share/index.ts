type SharedJsonResponse = {
  json: string;
  metadata: {
    title: string;
    viewCount: number;
    size: number;
    isValid: boolean;
  };
};

export async function fetchSharedJson(
  shareId: string
): Promise<SharedJsonResponse> {
  const response = await fetch(`/api/share?id=${shareId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch shared JSON");
  }

  return response.json();
}
