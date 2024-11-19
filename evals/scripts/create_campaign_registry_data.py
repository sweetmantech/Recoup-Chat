import json
import string
from get_context import get_context
from get_instruction import get_instruction
from mock_data import mock_data

def create_campaign_registry_data(ideal_key_or_value, question):
    registry_data = ""

    for artist_id, email in mock_data:
        context = get_context(artist_id, email)
        instruction = get_instruction()

        if context:
            context_str = json.dumps(context)
        else:
            context_str = "No context available."

        ideal_value = context.get(ideal_key_or_value, ideal_key_or_value)
        ideal_value_str = json.dumps(ideal_value) if isinstance(ideal_value, (dict, list)) else ideal_value

        content = {
            "input": (
                f"\n"
                f"Context: {context_str}\n"
                f"Question: {question}\n\n"
                f"{instruction['get_campaign']}"
            ),
            "ideal": ideal_value_str,
        }
        
        registry_data += json.dumps(content) + "\n"

    return registry_data