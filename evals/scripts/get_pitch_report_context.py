import requests
from consts import api_endpoint

def get_pitch_report_context():
    response = requests.get(f"{api_endpoint}/api/funnel_analysis?chatId=ef4a26fc-e913-4c5a-8227-bf01219b2678")
    data = response.json()
    return data['data']