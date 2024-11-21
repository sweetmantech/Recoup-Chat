import json
import string
import requests
import urllib.parse
import time
from consts import api_endpoint
from get_instruction import get_instruction

def create_tiktok_vi_comments_registry_data(ideal_key_or_value, question):
    registry_data = ""
    instruction = get_instruction()
    
    content = {
        "input": (
            f"\n"
            f"Context: No available data.\n\n"
            f"Question: ${question}\n\n"
            f"{instruction['get_tiktok_video_comments']}"
        ),
        "ideal": "333"
    }

    registry_data += json.dumps(content) + "\n"
        
    return registry_data