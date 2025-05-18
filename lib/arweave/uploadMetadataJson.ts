import { uploadBase64ToArweave } from "./uploadBase64ToArweave";

interface CreateMetadataArgs {
  arweaveData?: { id: string } | null;
  prompt: string;
}

/**
 * Uploads a metadata JSON object to Arweave as a base64-encoded file.
 * @param args The metadata creation arguments
 * @returns The result from uploadBase64ToArweave
 */
export async function uploadMetadataJson({
  arweaveData,
  prompt,
}: CreateMetadataArgs) {
  const metadata = {
    image: arweaveData ? `ar://${arweaveData.id}` : "",
    name: prompt,
  };
  const metadataBase64 = Buffer.from(JSON.stringify(metadata)).toString(
    "base64"
  );
  const metadataResult = await uploadBase64ToArweave(
    metadataBase64,
    "application/json",
    `metadata-${Date.now()}.json`
  );
  return metadataResult;
}
