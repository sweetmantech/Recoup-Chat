import { uploadToIpfs } from "@/lib/ipfs";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;
  const cid = await uploadToIpfs(file);
  return Response.json({ cid }, { status: 200 });
}
