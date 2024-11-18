import json
import os
import string
import requests
from get_streams_count import get_streams_count

create_yaml("get_streams_count")

mock_data = [
    ('a4c897f5-02cb-43d3-b971-948c85537785', 'sidney@syncstream.ai'),
    ('a4c897f5-02cb-43d3-b971-948c85537785', 'sweetmantech@gmail.com'),
]

registry_data = ""

for artist_id, email in mock_data:
    url = f"https://recoup-chat-git-tech322-campaigngene-c13432-recoupable-ad724970.vercel.app/api/get_campaign_general_info?email={email}&artistId={artist_id}"
    response = requests.get(url)
    context = response.json()
    streams_count = get_streams_count(email, artist_id)
    if context['data']:
        context_str = context['data']
    else:
        context_str = "No context available."
    content = {
        "input": (
            f"\n"
            f"Context: {context_str}\n\n"
            f"Question: What is the number of total streams generated from the campaign?\n\n"
        ),
        "ideal": streams_count
    }

    registry_data += json.dumps(content) + "\n"

create_data('get_streams_count', registry_data)