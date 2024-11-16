import os
from supabase import create_client

supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")
supabase = create_client(supabase_url, supabase_key)

def get_streams_count(email: str, artist_id: str) -> int:
    client_ids = []

    if artist_id:
        campaigns_data = supabase.table("campaigns").select("*").eq("artistId", artist_id).execute()
        if campaigns_data.data:
            client_ids.append(campaigns_data.data[0]['clientId'])
    else:
        accounts_data = supabase.table("accounts").select("*").eq("email", email).execute()
        if accounts_data.data:
            artist_ids = accounts_data.data[0]['artistIds']
            campaigns_data = supabase.table("campaigns").select("*").in_("artistId", artist_ids).execute()
            client_ids = [campaign['clientId'] for campaign in campaigns_data.data] if campaigns_data.data else []

    spotify_count_data = supabase.table("spotify_play_button_clicked").select("*", count="exact").in_("clientId", client_ids).execute()
    apple_count_data = supabase.table("apple_play_button_clicked").select("*", count="exact").in_("clientId", client_ids).execute()

    spotify_count = spotify_count_data.count
    apple_count = apple_count_data.count

    return (spotify_count or 0) + (apple_count or 0)