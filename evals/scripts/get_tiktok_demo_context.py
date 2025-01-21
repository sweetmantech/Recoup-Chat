import requests
from consts import agent_endpoint

def get_demo_comments():
    response = requests.get(f"{agent_endpoint}/api/get_dataset_items?datasetId=shycj3xWEZq0D9PS1")
    data = response.json()
    if len(data['data']) > 0:
        return data['data']
    else:
        return None

def get_demo_profile():
    response = requests.get(f"{agent_endpoint}/api/get_dataset_items?datasetId=WCWTBz2uksM9KZOFv")
    data = response.json()
    if data['data']:
        return data['data'][0]
    else:
        return None