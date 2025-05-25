import getArtistsByEmail from "@/lib/supabase/getArtistsByEmail";
import supabase from "@/lib/supabase/serverClient";

export async function GET() {
  // For dogfooding, hardcode your email
  const email = "sidney@recoupable.com";
  try {
    // 1. Fetch the user's account ID
    const { data: accountEmail } = await supabase
      .from("account_emails")
      .select("account_id")
      .eq("email", email)
      .single();
    if (!accountEmail) {
      return Response.json({ error: "No account found for this user." }, { status: 404 });
    }
    const userAccountId = accountEmail.account_id;

    // 2. Fetch all artists for the user
    const artists = await getArtistsByEmail(email);
    if (!artists || artists.length === 0) {
      return Response.json({ error: "No artists found for this user." }, { status: 404 });
    }

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    let topArtist = null;
    let topCount = 0;

    for (const artist of artists) {
      // 3. Get all rooms for this artist and user
      const { data: rooms } = await supabase
        .from("rooms")
        .select("id")
        .eq("artist_id", artist.account_id)
        .eq("account_id", userAccountId);
      if (!rooms || rooms.length === 0) continue;
      const roomIds = rooms.map((r: any) => r.id);

      // 4. Count messages in those rooms updated in the last week
      const { count } = await supabase
        .from("chat_messages")
        .select("*", { count: "exact", head: true })
        .in("room_id", roomIds)
        .gte("updated_at", oneWeekAgo.toISOString());

      if ((count || 0) > topCount) {
        topArtist = artist;
        topCount = count || 0;
      }
    }

    if (!topArtist) {
      return Response.json({ error: "No recent activity found for any artist." }, { status: 404 });
    }

    return Response.json({ artist: topArtist, messageCount: topCount });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
} 