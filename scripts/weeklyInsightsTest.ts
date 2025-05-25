import getArtistsByEmail from "../lib/supabase/getArtistsByEmail";

const TEST_EMAIL = "sidney@recoupable.com";

// Define the type for the formatted artist
interface FormattedArtist {
  name: string;
  image: string;
  knowledges: unknown[];
  label: string;
  instruction: string;
  account_id: string;
  account_socials: Array<{
    link: string;
    type: string;
    [key: string]: unknown;
  }>;
}

async function main() {
  try {
    console.log(`Fetching artists for user: ${TEST_EMAIL}`);
    const artists = await getArtistsByEmail(TEST_EMAIL);
    if (!artists || artists.length === 0) {
      console.log("No artists found for this user.");
      return;
    }
    console.log(`Found ${artists.length} artist(s):`);
    (artists as FormattedArtist[]).forEach((artist, idx) => {
      console.log(`Artist #${idx + 1}:`, {
        name: artist.name,
        account_id: artist.account_id,
        socials: artist.account_socials,
        image: artist.image,
      });
    });
  } catch (error) {
    console.error("Error fetching user/artists:", error);
  }
}

main(); 