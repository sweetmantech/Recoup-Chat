import supabase from "./serverClient";

/**
 * Ensures the user has access to an artist
 * @param artistId The ID of the artist to ensure access to
 * @param accountId The ID of the user to grant access to
 * @returns True if access was newly granted, false if the user already had access
 */
export async function ensureArtistAccess(
  artistId: string, 
  accountId: string
): Promise<boolean> {
  try {
    // Verify the artist exists in the database
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
      .eq("account_id", accountId)
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
      account_id: accountId,
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