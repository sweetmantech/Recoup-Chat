import { experimental_generateImage as generateImage } from "ai";
import { openai } from "@ai-sdk/openai";
import { uploadBase64ToArweave } from "@/lib/arweave/uploadBase64ToArweave";
import { uploadMetadataJson } from "@/lib/arweave/uploadMetadataJson";
import createCollection from "@/app/api/in_process/createCollection";

export interface GeneratedImageResponse {
  image: {
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

export async function generateAndProcessImage(
  prompt: string,
): Promise<GeneratedImageResponse> {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error(
      "OpenAI API key is missing. Please add it to your environment variables.",
    );
  }

  if (!prompt) {
    throw new Error("Prompt is required");
  }

  // Generate the image using OpenAI
  const response = await generateImage({
    model: openai.image("gpt-image-1"),
    prompt,
    providerOptions: {
      openai: { quality: "high" },
    },
  });

  // The base64Data isn't properly typed in the ai SDK, so we need to cast the response
  // @ts-expect-error The 'image' object from generateImage includes base64Data but it's not in the type
  const base64Data: string = response.image.base64Data;

  const imageData = {
    base64Data,
    mimeType: response.image.mimeType,
  };

  // Upload the generated image to Arweave
  let arweaveData = null;
  try {
    const arweaveResult = await uploadBase64ToArweave(
      imageData.base64Data,
      imageData.mimeType,
      `generated-image-${Date.now()}.png`,
    );
    arweaveData = {
      id: arweaveResult.id,
      url: arweaveResult.url,
    };
  } catch (arweaveError) {
    console.error("Error uploading to Arweave:", arweaveError);
    // We'll continue and return the image even if Arweave upload fails
  }

  // Upload metadata JSON to Arweave
  let metadataArweave = null;
  try {
    metadataArweave = await uploadMetadataJson({
      name: prompt,
      imageId: arweaveData?.id,
    });
  } catch (metadataError) {
    console.error("Error uploading metadata to Arweave:", metadataError);
  }

  // Create a collection on the blockchain using the metadata id
  const result = await createCollection({
    collectionName: prompt,
    uri: metadataArweave ? `ar://${metadataArweave.id}` : "",
  });
  const transactionHash = result.transactionHash || null;

  // Return complete response
  const arweave =
    arweaveData || metadataArweave
      ? { ...(arweaveData ?? {}), metadata: metadataArweave }
      : null;

  return {
    image: imageData,
    arweave,
    smartAccount: result.smartAccount,
    transactionHash,
  };
}
