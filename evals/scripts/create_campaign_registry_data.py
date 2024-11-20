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

        ideal_value = context.get(ideal_key_or_value, ideal_key_or_value)
        ideal_value_str = json.dumps(ideal_value) if isinstance(ideal_value, (dict, list)) else ideal_value

        if question == "What are the most common podcast genres among fans?":
            instruction_str = instruction['get_common_podcast_genres']
            context_str = json.dumps(context.get('episodes_descriptions', []))
        else:
            instruction_str = instruction['get_campaign']
            context_str = json.dumps(context)

        content = {
            "input": (
                f"Context: {context_str}\n"
                f"Question {question}\n"
                f"{instruction_str}"
            ),
            "ideal": ideal_value_str,
        }
        
        registry_data += json.dumps(content) + "\n"

    return registry_data