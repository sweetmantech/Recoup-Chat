import os
from supabase import create_client

supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")
supabase = create_client(supabase_url, supabase_key)

def get_fans_listening_top_songs(artist_id, email):
    response = supabase.rpc('get_fans_listening_top_songs', {'artistid': artist_id, 'email': email}).execute()
    data = response.data
   
    if data['fans'] == None:
        count = 0
    else:
        count = len(data.get("fans", []))
        
    return {
        "top_song_listening_fans_count": count,
    }