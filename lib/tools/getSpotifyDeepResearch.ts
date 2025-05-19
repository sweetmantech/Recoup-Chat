import { z } from "zod";
import { tool } from "ai";
import { getArtistSocials } from "../api/artist/getArtistSocials";

const TOOL_CHAIN_STEPS = [
  "get_artist_socials - get spotify account",
  "get_spotify_artist_top_tracks - top tracks for artist",
  "get_spotify_artist_albums - albums for artist",
  "get_spotify_album - album from get_spotify_artist_albums. repeat this tool for each album.",
  "<other tools to get engagement info or other missing required items>",
  "generate_txt_file - generate a txt file with the research generated.",
];

const getSpotifyDeepResearch = tool({
  description: `
  Performs deep research on an artist using a Spotify ID.
  Follows this tool loop:
  <tool_loop>
  ${TOOL_CHAIN_STEPS.join("\n")}
  </tool_loop>

  required items in deep research document:
  - popularity info
  - engagement info
  - tracklist
  - collaborators
  - album art
  - album name

  Keep going until the job is completely solved before ending your turn.
  If you're unsure, use your tools, don't guess.
  Plan thoroughly before every tool call and reflect on the outcome after each tool call.
  `,
  parameters: z.object({
    artist_account_id: z.string().describe("Artist account ID to research"),
  }),
  execute: async ({ artist_account_id }) => {
    const data = await getArtistSocials(artist_account_id);
    return {
      artistSocials: data,
      artist_account_id,
      success: true,
      nextSteps: TOOL_CHAIN_STEPS,
    };
  },
});

export default getSpotifyDeepResearch;
