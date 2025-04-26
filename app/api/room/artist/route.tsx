import type { NextRequest } from "next/server";
import { getRoomArtistId } from "@/lib/supabase/getRoomArtistId";
import { ensureRoomAccess } from "@/lib/supabase/ensureRoomAccess";
import { ensureArtistAccess } from "@/lib/supabase/ensureArtistAccess";

/**
 * GET endpoint to get the artist ID for a room and handle sharing
 */
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const roomId = searchParams.get("roomId");
  const accountId = searchParams.get("accountId");

  if (!roomId) {
    return Response.json({ error: "Missing roomId parameter" }, { status: 400 });
  }

  try {
    // Get the artist ID for the room
    const artistId = await getRoomArtistId(roomId);
    
    if (!artistId) {
      return Response.json({
        artist_id: null,
        artist_exists: false,
        room_id: roomId
      });
    }
    
    // If no account ID provided, just return the artist ID
    if (!accountId) {
      return Response.json({
        artist_id: artistId,
        artist_exists: true,
        room_id: roomId
      });
    }

    // Process artist access and room access in parallel
    const [newRoomId, artistAccessGranted] = await Promise.all([
      ensureRoomAccess(roomId, accountId),
      ensureArtistAccess(artistId, accountId)
    ]);

    return Response.json({
      artist_id: artistId,
      room_access_granted: !!newRoomId,
      artist_added: artistAccessGranted,
      new_room_id: newRoomId,
      original_room_id: roomId
    });
  } catch (error) {
    console.error("Error processing room artist request:", error);
    return Response.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

// Ensure this API route is never cached
export const dynamic = "force-dynamic";
export const revalidate = 0; 