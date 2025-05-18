import { uploadBase64ToArweave } from "@/lib/arweave/uploadBase64ToArweave";
import { uploadMetadataJson } from "@/lib/arweave/uploadMetadataJson";
import createCollection from "@/app/api/in_process/createCollection";

export interface GeneratedTxtResponse {
  txt: {
    base64Data: string;
    mimeType: string;
  };
  arweave?: {
    id: string;
    url: string;
    metadata?: {
      id: string;
      url: string;
    } | null;
  } | null;
  smartAccount: {
    address: string;
    [key: string]: unknown;
  };
  transactionHash: string | null;
}

export async function generateAndStoreTxtFile(
  contents: string,
): Promise<GeneratedTxtResponse> {
  if (!contents) {
    throw new Error("Contents are required");
  }

  // Encode contents to base64
  const base64Data = Buffer.from(contents, "utf-8").toString("base64");
  const mimeType = "text/plain";
  const filename = `generated-text-${Date.now()}.txt`;

  // Upload the TXT file to Arweave
  let arweaveData = null;
  try {
    const arweaveResult = await uploadBase64ToArweave(
      base64Data,
      mimeType,
      filename,
    );
    arweaveData = {
      id: arweaveResult.id,
      url: arweaveResult.url,
    };
  } catch (arweaveError) {
    console.error("Error uploading TXT to Arweave:", arweaveError);
    // Continue and return the TXT even if Arweave upload fails
  }

  // Upload metadata JSON to Arweave
  let metadataArweave = null;
  try {
    metadataArweave = await uploadMetadataJson({
      name: contents,
      imageId: arweaveData?.id,
    });
  } catch (metadataError) {
    console.error("Error uploading metadata to Arweave:", metadataError);
  }

  // Create a collection on the blockchain using the metadata id
  const result = await createCollection({
    collectionName: contents,
    uri: metadataArweave ? `ar://${metadataArweave.id}` : "",
  });
  const transactionHash = result.transactionHash || null;

  const arweave =
    arweaveData || metadataArweave
      ? { ...(arweaveData ?? {}), metadata: metadataArweave }
      : null;

  return {
    txt: {
      base64Data,
      mimeType,
    },
    arweave,
    smartAccount: result.smartAccount,
    transactionHash,
  };
}
