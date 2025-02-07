import { NextRequest, NextResponse } from "next/server";
import { getArtistSegments } from "@/lib/supabase/getArtistSegments";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const artistIds = searchParams.getAll("artistId");

  if (!artistIds.length) {
    return NextResponse.json(
      { error: "At least one Artist ID is required" },
      { status: 400 },
    );
  }

  try {
    const segments = await getArtistSegments(artistIds);
    return NextResponse.json(segments);
  } catch (error) {
    console.error("Error fetching segments:", error);
    return NextResponse.json(
      { error: "Failed to fetch segments" },
      { status: 500 },
    );
  }
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
