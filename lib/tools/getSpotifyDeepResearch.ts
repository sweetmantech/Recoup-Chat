import { z } from "zod";
import { tool } from "ai";
import { getArtistSocials } from "../api/artist/getArtistSocials";

const TOOL_CHAIN_STEPS = [
  "get_artist_socials - get spotify account",
  "get_spotify_artist_top_tracks - top tracks for artist",
  "get_spotify_artist_albums - albums for artist",
  "get_spotify_album - album from get_spotify_artist_albums. repeat this tool for each album.",
  "generate_txt_file - generate a txt file with the research generated",
];

const getSpotifyDeepResearch = tool({
  description: `
  Performs deep research on an artist using a Spotify ID.
  Follows this tool loop:
  <tool_loop>
  ${TOOL_CHAIN_STEPS.join("\n")}
  </tool_loop>
  `,
  parameters: z.object({
    spotifyArtistId: z.string().describe("Spotify artist ID to research"),
  }),
  execute: async ({ spotifyArtistId }) => {
    const data = await getArtistSocials(spotifyArtistId);
    return {
      artistSocials: data,
      spotifyArtistId,
      success: true,
      nextSteps: TOOL_CHAIN_STEPS,
    };
  },
});

export default getSpotifyDeepResearch;
