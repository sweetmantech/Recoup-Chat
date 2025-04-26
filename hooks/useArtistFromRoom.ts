import { useEffect, useRef } from "react";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useUserProvider } from "@/providers/UserProvder";
import type { ArtistRecord } from "@/types/Artist";

/**
 * A hook that automatically selects the artist associated with a room.
 * @param roomId The ID of the room to get the artist for
 */
export function useArtistFromRoom(roomId: string) {
  const { userData } = useUserProvider();
  const { selectedArtist, artists, setSelectedArtist, getArtists } = useArtistProvider();
  
  // Use a ref to track if the hook has already run
  const hasRun = useRef(false);
  
  useEffect(() => {
    // Skip if already run or missing required data
    if (hasRun.current || !roomId || !userData?.id) {
      return;
    }
    
    // Mark the hook as run to prevent additional executions
    hasRun.current = true;
    
    async function selectArtistForRoom() {
      try {
        // Call API endpoint to get the artist for the room
        const response = await fetch(
          `/api/room/artist?roomId=${encodeURIComponent(roomId)}&accountId=${encodeURIComponent(userData.id)}`
        );
        
        if (!response.ok) return;
        
        const data = await response.json();
        
        // Handle URL update if we got a new room ID
        if (data.new_room_id && data.new_room_id !== roomId) {
          window.history.replaceState({}, '', `/chat/${data.new_room_id}`);
        }
        
        if (!data.artist_id) return;
        
        // If artist is already selected, we're done
        if (selectedArtist?.account_id === data.artist_id) return;
        
        // Try to find the artist in the existing list
        const artistsArray = artists as ArtistRecord[];
        const matchingArtist = artistsArray.find(
          artist => artist.account_id === data.artist_id
        );
        
        if (matchingArtist) {
          setSelectedArtist(matchingArtist);
        } else {
          // Refresh artists list and select artist
          await getArtists();
          
          const updatedArtistsArray = artists as ArtistRecord[];
          const updatedMatchingArtist = updatedArtistsArray.find(
            artist => artist.account_id === data.artist_id
          );
          
          if (updatedMatchingArtist) {
            setSelectedArtist(updatedMatchingArtist);
          }
        }
      } catch (error) {
        console.error("Error selecting artist for room:", error);
      }
    }
    
    selectArtistForRoom();
  }, [roomId, userData, selectedArtist, artists, setSelectedArtist, getArtists]);
} 