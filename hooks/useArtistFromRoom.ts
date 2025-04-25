import { useEffect, useRef, useState } from "react";
import { useArtistProvider } from "@/providers/ArtistProvider";
import { useUserProvider } from "@/providers/UserProvder";
import type { ArtistRecord } from "@/types/Artist";

/**
 * A hook that automatically selects the artist associated with a room.
 * This will only run once per component mount to avoid repeated API calls.
 * 
 * @param roomId The ID of the room to get the artist for
 */
export function useArtistFromRoom(roomId: string) {
  const { userData } = useUserProvider();
  const { 
    selectedArtist, 
    artists, 
    setSelectedArtist, 
    getArtists 
  } = useArtistProvider();
  
  // Use a ref to track if the hook has already run
  const hasRun = useRef(false);
  const [artistIdFromRoom, setArtistIdFromRoom] = useState<string | null>(null);
  
  // First effect: Fetch the artist ID from the room
  useEffect(() => {
    // Skip if already run or missing required data
    if (
      hasRun.current || 
      !roomId || 
      !userData?.id
    ) {
      return;
    }
    
    // Mark the hook as run to prevent additional executions
    hasRun.current = true;
    
    const fetchArtistFromRoom = async () => {
      try {
        console.log("useArtistFromRoom: Fetching artist for room", roomId);
        // Call our API endpoint to get the artist for the room
        const response = await fetch(
          `/api/room/artist?roomId=${encodeURIComponent(roomId)}&userId=${encodeURIComponent(userData.id)}`
        );
        
        // Handle failed requests
        if (!response.ok) {
          console.error("Error fetching artist from room:", await response.text());
          return;
        }
        
        // Parse the response
        const data = await response.json();
        console.log("useArtistFromRoom: API response:", data);
        
        // If no artist ID was found, we can't select an artist
        if (!data.artist_id) {
          console.log("useArtistFromRoom: No artist ID found for room:", roomId);
          return;
        }
        
        // If we got a new room ID, update the URL
        if (data.new_room_id && data.new_room_id !== roomId) {
          console.log(`useArtistFromRoom: Redirecting to new room: ${data.new_room_id}`);
          // Update the URL without a full page reload
          window.history.replaceState(
            {}, 
            '', 
            `/chat/${data.new_room_id}`
          );
        }
        
        setArtistIdFromRoom(data.artist_id);
      } catch (error) {
        console.error("Error fetching artist from room:", error);
      }
    };
    
    fetchArtistFromRoom();
  }, [roomId, userData]);
  
  // Second effect: Select the artist once we have the ID and artist list
  useEffect(() => {
    if (!artistIdFromRoom) return;
    
    console.log("useArtistFromRoom: Selecting artist:", artistIdFromRoom);
    console.log("useArtistFromRoom: Current artist:", selectedArtist?.account_id);
    console.log("useArtistFromRoom: Available artists:", artists.length);
    
    // If the artist is already selected, we're done
    if (selectedArtist?.account_id === artistIdFromRoom) {
      console.log("useArtistFromRoom: Artist already selected");
      return;
    }
    
    // Try to find the artist in the existing list
    const artistsArray = artists as ArtistRecord[];
    const matchingArtist = artistsArray.find(
      artist => artist.account_id === artistIdFromRoom
    );
    
    if (matchingArtist) {
      // If we found the artist, select it
      console.log("useArtistFromRoom: Found matching artist, selecting:", matchingArtist.name);
      setSelectedArtist(matchingArtist);
    } else {
      // If the artist was not found, refresh the artists list
      console.log("useArtistFromRoom: Artist not found, refreshing list");
      const refreshAndSelect = async () => {
        await getArtists();
        
        // After refreshing, try to find and select the artist again
        const updatedArtistsArray = artists as ArtistRecord[];
        const updatedMatchingArtist = updatedArtistsArray.find(
          artist => artist.account_id === artistIdFromRoom
        );
        
        if (updatedMatchingArtist) {
          console.log("useArtistFromRoom: Found artist after refresh, selecting:", updatedMatchingArtist.name);
          setSelectedArtist(updatedMatchingArtist);
        } else {
          console.log("useArtistFromRoom: Couldn't find artist after refresh");
        }
      };
      
      refreshAndSelect();
    }
  }, [artistIdFromRoom, artists, selectedArtist, setSelectedArtist, getArtists]);
} 