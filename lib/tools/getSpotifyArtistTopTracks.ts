import { z } from "zod";
import { tool } from "ai";

/**
 * Response type for Spotify Get Artist Top Tracks
 */
export interface GetSpotifyArtistTopTracksResponse {
  tracks: Array<{
    album: Record<string, any>;
    artists: Array<Record<string, any>>;
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: Record<string, any>;
    external_urls: Record<string, any>;
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: Record<string, any>;
    restrictions: Record<string, any>;
    name: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: string;
    uri: string;
    is_local: boolean;
  }>;
}

const schema = z.object({
  id: z.string().min(1, "Artist ID is required"),
  market: z.string().length(2).optional(),
});

const getSpotifyArtistTopTracks = tool({
  description:
    "Retrieve an artist's top tracks by country using the Spotify API. You should call get_artist_socials or get_spotify_search first in order to get an artist ID to use in the tool call.",
  parameters: schema,
  execute: async ({ id, market }): Promise<GetSpotifyArtistTopTracksResponse> => {
    try {
      const url = new URL("https://api.recoupable.com/api/spotify/artist/topTracks");
      url.searchParams.append("id", id);
      if (market) url.searchParams.append("market", market);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = (await response.json()) as GetSpotifyArtistTopTracksResponse;
      return data;
    } catch (error) {
      console.error("Error fetching artist top tracks:", error);
      throw error instanceof Error
        ? error
        : new Error("Failed to fetch artist top tracks");
    }
  },
});

export default getSpotifyArtistTopTracks;
