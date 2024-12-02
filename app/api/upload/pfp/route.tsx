import uploadPfpToIpfs from "@/lib/uploadPfpToIpfs";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const url = body.image;
  try {
    const pfp = await uploadPfpToIpfs(url);
    return Response.json({ success: true, image: pfp }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ image: null, success: false }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
