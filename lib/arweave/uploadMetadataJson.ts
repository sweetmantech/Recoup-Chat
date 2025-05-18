import { uploadBase64ToArweave } from "./uploadBase64ToArweave";

export interface MetadataUploadResult {
  id: string;
  url: string;
}

interface UploadMetadataParams {
  name: string;
  imageId?: string;
}

/**
 * Upload collection metadata JSON to Arweave. The metadata includes the
 * collection name and optional image reference using the `ar://` protocol.
 */
export async function uploadMetadataJson({
  name,
  imageId,
}: UploadMetadataParams): Promise<MetadataUploadResult> {
  const metadata = {
    image: imageId ? `ar://${imageId}` : "",
    name,
  };

  const metadataBase64 = Buffer.from(JSON.stringify(metadata)).toString(
    "base64",
  );

  const result = await uploadBase64ToArweave(
    metadataBase64,
    "application/json",
    `metadata-${Date.now()}.json`,
  );

  return {
    id: result.id,
    url: result.url,
  };
}
