import supabase from "./serverClient";
import generateUUID from "../generateUUID";

/**
 * Ensures the user has access to a room in their recent chats by creating a new copy
 * when a room is shared with them. This prevents conflicts with existing rooms.
 * @param sourceRoomId The ID of the original room being shared
 * @param accountId The ID of the user to grant access to
 * @returns The ID of the newly created room, or null if creation failed
 */
export async function ensureRoomAccess(
  sourceRoomId: string, 
  accountId: string
): Promise<string | null> {
  try {
    // Check if the user already has a room created from this source room
    // We'll first check if there's an existing room with this ID and user
    const { data: existingRoom, error: existingRoomError } = await supabase
      .from("rooms")
      .select("id")
      .eq("id", sourceRoomId)
      .eq("account_id", accountId)
      .maybeSingle();
    
    if (existingRoomError) {
      console.error("Error checking existing room:", existingRoomError.message);
      return null;
    }
    
    // If the user already has this exact room, just return its ID
    if (existingRoom) {
      console.log(`User already has access to room: ${sourceRoomId}`);
      
      // Check if the room has any messages
      const { data: roomMessages, error: roomMessagesError } = await supabase
        .from("memories")
        .select("id")
        .eq("room_id", sourceRoomId)
        .limit(1);
      
      if (!roomMessagesError && roomMessages && roomMessages.length > 0) {
        console.log(`Room ${sourceRoomId} already has messages, returning existing room`);
        return sourceRoomId;
      }
      
      console.log(`Room ${sourceRoomId} has no messages, will copy from source`);
      // If room exists but has no messages, continue with the copy process
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
    
    // Use existing room ID if available, otherwise generate a new one
    const roomId = existingRoom ? existingRoom.id : generateUUID();
    console.log(`${existingRoom ? 'Using existing' : 'Creating new'} room ${roomId} for user ${accountId} based on source room ${sourceRoomId}`);
    
    // Only insert a new room if one doesn't already exist
    if (!existingRoom) {
      // Create a new room with the data from the source room
      const { error: insertError } = await supabase.from("rooms").insert({
        id: roomId,
        account_id: accountId,
        artist_id: roomData.artist_id,
        topic: roomData.topic
      });
      
      if (insertError) {
        console.error("Error creating new room:", insertError.message);
        return null;
      }
    }
    
    // Copy messages from the source room to the new room
    try {
      console.log("Fetching messages from source room", sourceRoomId, "using updated_at for sorting");
      const { data: messages, error: messagesError } = await supabase
        .from("memories")
        .select("id, room_id, content, updated_at")
        .eq("room_id", sourceRoomId)
        .order("updated_at", { ascending: true });
      
      if (messagesError) {
        console.error("Error getting messages from source room:", messagesError.message);
        // Even if we can't copy messages, return the room ID since the room was created
        return roomId;
      }
      
      console.log("Source room has", messages?.length || 0, "messages to copy");
      
      if (messages && messages.length > 0) {
        // Log a sample message to debug
        console.log("Sample memory structure:", Object.keys(messages[0]));
        
        // If the target room already has memories, delete them first
        if (existingRoom) {
          const { error: deleteError } = await supabase
            .from("memories")
            .delete()
            .eq("room_id", roomId);
            
          if (deleteError) {
            console.error("Error clearing existing messages:", deleteError.message);
          } else {
            console.log("Cleared existing messages from room", roomId);
          }
        }
        
        // Prepare messages for the room - explicitly include only the fields we need
        const newMessages = messages.map(msg => {
          return {
            id: generateUUID(), // Generate new IDs for each message
            room_id: roomId, // Set to the target room ID
            content: msg.content,
            updated_at: msg.updated_at
          };
        });
        
        console.log("Prepared", newMessages.length, "new messages for insertion with correct schema");
        
        // Insert the messages into the room
        const { error: insertMessagesError } = await supabase
          .from("memories")
          .insert(newMessages);
        
        if (insertMessagesError) {
          console.error("Error copying messages to room:", insertMessagesError.message);
          // Even if message copying fails, return the room ID since the room was created
        } else {
          console.log("Successfully copied", messages.length, "messages to room", roomId);
        }
      } else {
        console.log("No messages to copy from source room", sourceRoomId);
      }
    } catch (error) {
      console.error("Error in message copying process:", error);
    }
    
    console.log(`Successfully set up room ${roomId} for user ${accountId}`);
    return roomId;
  } catch (error) {
    console.error("Unexpected error ensuring room access:", error);
    return null;
  }
} 