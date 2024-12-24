import requests
from consts import api_endpoint

def get_demo_comments():
    response = requests.get(f"{api_endpoint}/api/get_tiktok_video_comments/get_dataset_items?datasetId=WCWTBz2uksM9KZOFv")
    data = response.json()
    if len(data['data']['videos']) > 0:
        return data['data']
    else:
        return None

def get_demo_profile():
    response = requests.get(f"{api_endpoint}/api/get_tiktok_account_trends/get_dataset_items?datasetId=shycj3xWEZq0D9PS1")
    data = response.json()
    if data['data']:
        return data['data']
    else:
        return None