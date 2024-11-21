import json
import string
import requests
import time
from consts import api_endpoint
from get_instruction import get_instruction

def fetch_comments(datasetId):
    response = requests.get(f"{api_endpoint}/api/get_tiktok_video_comments/get_dataset_items?datasetId={datasetId}")
    data = response.json()
    if len(data['data']['videos']) > 0:
        return data['data']
    else:
        return None

def create_tiktok_vi_comments_registry_data(ideal_key_or_value, question):
    registry_data = ""
    defaultDatasetId = "qYiAiOkrIyVqa97mZ"
    instruction = get_instruction()

    data = fetch_comments(defaultDatasetId)
    print(data)
    if data != None:
        context_str = json.dumps(data)
    else:
        context_str = "No context available."

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