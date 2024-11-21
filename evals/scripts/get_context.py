import os
from supabase import create_client
from get_fans_listening_top_songs import get_fans_listening_top_songs
from get_streams_count import get_streams_count

supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")
supabase = create_client(supabase_url, supabase_key)

def limit_collection(collection, limit=20):
    if collection is None:
        return []
    return collection[:limit]

def get_context(artist_id, email):
    response = supabase.rpc('get_campaign', {'artistid': artist_id, 'email': email, 'campaignid': ''}).execute()
    campaign = response.data
    premium_count = len([fan for fan in campaign.get("fans", []) if fan.get("product") == "premium"])
    free_count = len([fan for fan in campaign.get("fans", []) if fan.get("product") == "free"])
    fans_listening_top_songs_info = get_fans_listening_top_songs(artist_id, email)
    
    total_episodes = campaign.get("episodes", []) 
    episodes = [episode['name'] for episode in total_episodes]
    episodes_descriptions = [episode['description'] for episode in total_episodes]
    average_streamed_count = get_streams_count(artist_id, email)

    return {
        "tracks": limit_collection(campaign.get("tracks", [])),
        "artists": limit_collection(campaign.get("artists", [])),
        "playlists": limit_collection(campaign.get("playlist", [])),
        "albums": limit_collection(campaign.get("albums", [])),
        "audioBooks": limit_collection(campaign.get("audio_books", [])),
        "episodes": limit_collection(episodes),
        "episodes_descriptions": limit_collection(episodes_descriptions),
        "shows": limit_collection(campaign.get("shows", [])),
        "genres": limit_collection(episodes_descriptions),
        "premium_spotify_fans_count": premium_count,
        "free_spotify_fans_count": free_count,
        "spotify_fans_count": premium_count + free_count,
        "total_unique_fans_count": len(campaign.get("fans", [])),
        "playlists_count": len(campaign.get('playlist', [])),
        "average_streamed_count": average_streamed_count,
        "top_song_listening_fans_count": fans_listening_top_songs_info.get("top_song_listening_fans_count", 0),
        "fans": limit_collection(campaign.get('fans', []), 100)
    }