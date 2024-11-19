import json
import string
import requests
from get_context import get_context
from mock_data import mock_data
from get_instruction import get_instruction

def create_general_campaign_registry_data(ideal_key_or_value, question):
    registry_data = ""

    for artist_id, email in mock_data:
        url = f"https://recoup-chat-git-tech322-responseslack-recoupable-ad724970.vercel.app/api/get_campaign_general_info?email={email}&artistId={artist_id}"
        response = requests.get(url)
        data = response.json()
        instruction = get_instruction()

        if data['data']:
            context_str = json.dumps(data['data'])
        else:
            context_str = "No context available."

        ideal_value = data['data'].get(ideal_key_or_value, ideal_key_or_value)
        ideal_value_str = json.dumps(ideal_value) if isinstance(ideal_value, (dict, list)) else ideal_value

        content = {
            "input": (
                f"\n"
                f"Context: {context_str}\n\n"
                f"Question: ${question}\n\n"
                f"{instruction['get_general_campaign']}"
            ),
            "ideal": ideal_value_str
        }

        registry_data += json.dumps(content) + "\n"
        
    return registry_data