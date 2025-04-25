import type { NextRequest } from "next/server";
import {
  getRoomArtistId,
  ensureRoomAccess,
  ensureArtistAccess,
} from "@/lib/roomSharing";

/**
 * GET endpoint to get the artist ID associated with a room and ensure the user has access
 * Query parameters:
 * - roomId: The ID of the room to get the artist for
 * - accountId: The ID of the user to grant access to (optional)
 */
export async function GET(req: NextRequest) {
  // Extract query parameters
  const searchParams = req.nextUrl.searchParams;
  const roomId = searchParams.get("roomId");
  const accountId = searchParams.get("accountId");

  console.log(`API called with roomId: ${roomId}, accountId: ${accountId}`);

  // Validate required parameters
  if (!roomId) {
    console.log("Missing roomId parameter");
    return Response.json({ error: "Missing roomId parameter" }, { status: 400 });
  }

  try {
    // Get the artist ID for the room
    const artistId = await getRoomArtistId(roomId);
    
    // If no artist ID was found, we can't select an artist
    if (!artistId) {
      console.log(`No artist ID found for room: ${roomId}`);
      return Response.json({
        artist_id: null,
        artist_exists: false,
        room_id: roomId
      });
    }
    
    // If no account ID was provided, just return the artist ID
    if (!accountId) {
      console.log(`Artist ID found (${artistId}), but no accountId provided`);
      return Response.json({
        artist_id: artistId,
        artist_exists: true,
        room_id: roomId
      });
    }

    console.log(`Processing access for accountId: ${accountId}, artistId: ${artistId}`);

    // Process artist access and room access in parallel
    const [newRoomId, artistAccessGranted] = await Promise.all([
      ensureRoomAccess(roomId, accountId),
      ensureArtistAccess(artistId, accountId)
    ]);

    console.log(`Access processing results: newRoomId=${newRoomId}, artistAccess=${artistAccessGranted}`);

    // Return the results
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

// Ensure this API route is never cached and always runs dynamically
export const dynamic = "force-dynamic";
export const revalidate = 0; 