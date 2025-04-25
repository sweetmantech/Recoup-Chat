import supabase from "./supabase/serverClient";
import generateUUID from "./generateUUID";

/**
 * Gets the artist ID associated with a room
 * @param roomId The ID of the room to get the artist ID for
 * @returns The artist ID associated with the room, or null if not found
 */
export async function getRoomArtistId(roomId: string): Promise<string | null> {
  try {
    console.log(`Fetching artist ID for room: ${roomId}`);
    
    // Get the first room with matching ID to find the artist_id
    const { data, error } = await supabase
      .from("rooms")
      .select("artist_id")
      .eq("id", roomId)
      .maybeSingle();
    
    if (error) {
      console.error("Error getting room artist ID:", error.message);
      return null;
    }
    
    if (!data?.artist_id) {
      console.log(`No artist_id found for room: ${roomId}`);
      return null;
    }
    
    console.log(`Found artist_id: ${data.artist_id} for room: ${roomId}`);
    
    // Verify artist exists in the database
    const { data: artistExists, error: artistError } = await supabase
      .from("accounts")
      .select("id")
      .eq("id", data.artist_id)
      .single();
      
    if (artistError) {
      console.error("Artist not found:", artistError.message);
      return null;
    }
    
    if (!artistExists) {
      console.log(`Artist ${data.artist_id} does not exist in accounts table`);
      return null;
    }
    
    console.log(`Verified artist ${data.artist_id} exists`);
    return data.artist_id;
  } catch (error) {
    console.error("Unexpected error getting room artist ID:", error);
    return null;
  }
}

/**
 * Ensures the user has access to a room in their recent chats by creating a new copy
 * when a room is shared with them. This prevents conflicts with existing rooms.
 * @param sourceRoomId The ID of the original room being shared
 * @param userId The ID of the user to grant access to
 * @returns The ID of the newly created room, or null if creation failed
 */
export async function ensureRoomAccess(
  sourceRoomId: string, 
  userId: string
): Promise<string | null> {
  try {
    // Check if the user already has a room created from this source room
    // We'll first check if there's an existing room with this ID and user
    const { data: existingRoom, error: existingRoomError } = await supabase
      .from("rooms")
      .select("id")
      .eq("id", sourceRoomId)
      .eq("account_id", userId)
      .maybeSingle();
    
    if (existingRoomError) {
      console.error("Error checking existing room:", existingRoomError.message);
      return null;
    }
    
    // If the user already has this exact room, just return its ID
    if (existingRoom) {
      console.log(`User already has access to room: ${sourceRoomId}`);
      return sourceRoomId;
    }
    
    // Get the source room data (topic and artist_id)
    const { data: roomData, error: roomDataError } = await supabase
      .from("rooms")
      .select("topic, artist_id")
      .eq("id", sourceRoomId)
      .single();
      
    if (roomDataError || !roomData?.topic) {
      console.error("Error getting room data:", roomDataError?.message);
      return null;
    }
    
    // Generate a new UUID for the room copy
    const newRoomId = generateUUID();
    console.log(`Creating new room ${newRoomId} for user ${userId} based on source room ${sourceRoomId}`);
    
    // Create a new room with the data from the source room
    const { error: insertError } = await supabase.from("rooms").insert({
      id: newRoomId,
      account_id: userId,
      artist_id: roomData.artist_id,
      topic: roomData.topic
    });
    
    if (insertError) {
      console.error("Error creating new room:", insertError.message);
      return null;
    }
    
    // Copy messages from the source room to the new room
    // First, get messages from the source room
    const { data: messages, error: messagesError } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("room_id", sourceRoomId)
      .order("created_at", { ascending: true });
    
    if (messagesError) {
      console.error("Error getting messages from source room:", messagesError.message);
      // Even if we can't copy messages, return the new room ID since the room was created
      return newRoomId;
    }
    
    if (messages && messages.length > 0) {
      // Prepare messages for the new room
      const newMessages = messages.map(msg => ({
        ...msg,
        id: generateUUID(), // Generate new IDs for each message
        room_id: newRoomId // Set to the new room ID
      }));
      
      // Insert the messages into the new room
      const { error: insertMessagesError } = await supabase
        .from("chat_messages")
        .insert(newMessages);
      
      if (insertMessagesError) {
        console.error("Error copying messages to new room:", insertMessagesError.message);
        // Even if message copying fails, return the new room ID since the room was created
      } else {
        console.log(`Successfully copied ${messages.length} messages to new room ${newRoomId}`);
      }
    }
    
    console.log(`Successfully created new room ${newRoomId} for user ${userId}`);
    return newRoomId;
  } catch (error) {
    console.error("Unexpected error ensuring room access:", error);
    return null;
  }
}

/**
 * Ensures the user has access to an artist
 * @param artistId The ID of the artist to ensure access to
 * @param userId The ID of the user to grant access to
 * @returns True if access was newly granted, false if the user already had access
 */
export async function ensureArtistAccess(
  artistId: string, 
  userId: string
): Promise<boolean> {
  try {
    // Verify the artist exists in the accounts table
    const { data: artistExists, error: artistError } = await supabase
      .from("accounts")
      .select("id")
      .eq("id", artistId)
      .single();
      
    if (artistError) {
      console.error("Artist not found:", artistError.message);
      return false;
    }
    
    if (!artistExists) {
      console.log(`Artist ${artistId} does not exist in accounts table`);
      return false;
    }
    
    // Check if user already has access to this artist
    const { data: userArtistAccess, error: accessError } = await supabase
      .from("account_artist_ids")
      .select("artist_id")
      .eq("account_id", userId)
      .eq("artist_id", artistId)
      .maybeSingle();
    
    if (accessError) {
      console.error("Error checking artist access:", accessError.message);
      return false;
    }
    
    // User already has access
    if (userArtistAccess) return false;
    
    // Grant access by inserting a new record
    const { error: insertError } = await supabase.from("account_artist_ids").insert({
      account_id: userId,
      artist_id: artistId,
    });
    
    if (insertError) {
      console.error("Error granting artist access:", insertError.message);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Unexpected error ensuring artist access:", error);
    return false;
  }
} 