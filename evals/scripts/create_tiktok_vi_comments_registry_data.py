import json
import string
import requests
import urllib.parse
import time
from consts import api_endpoint
from get_instruction import get_instruction

def fetch_default_dataset():
    encoded_postURLs = urllib.parse.quote("[\"https://www.tiktok.com/@bellapoarch/video/6862153058223197445\"]")
    url = f"{api_endpoint}/api/get_tiktok_video_comments?postURLs={encoded_postURLs}"
    response = requests.get(url)
    data = response.json()
    defaultDatasetId = data['data']

    return defaultDatasetId

def fetch_comments(defaultDatasetId):
    response = requests.get(f"{api_endpoint}/api/get_tiktok_video_comments/get_dataset_items?defaultDatasetId={defaultDatasetId}")
    data = response.json()
    if len(data['data']['comments_video_info']) > 0:
        return data['data']
    else:
        return None

def create_tiktok_vi_comments_registry_data(ideal_key_or_value, question):
    registry_data = ""
    defaultDatasetId = fetch_default_dataset()
    instruction = get_instruction()

    while True:
        time.sleep(2)
        data = fetch_comments(defaultDatasetId)
        if data != None:
            context_str = json.dumps(data)
        else:
            context_str = "No context available."
        if data is not None:
            
            break

    print(data)
    ideal_value = data.get(ideal_key_or_value, ideal_key_or_value)
    ideal_value_str = json.dumps(ideal_value) if isinstance(ideal_value, (dict, list)) else ideal_value

    content = {
        "input": (
            f"\n"
            f"Context: {context_str}\n\n"
            f"Question: ${question}\n\n"
            f"{instruction['get_tiktok_video_comments']}"
        ),
        "ideal": ideal_value_str
    }

    registry_data += json.dumps(content) + "\n"
        
    return registry_data