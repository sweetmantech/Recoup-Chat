import json
import os
import string
from get_context import get_context
from get_instruction import get_instruction
from create_yaml_data import create_yaml, create_data

create_yaml("get_free_fans")

mock_data = [
    ('a4c897f5-02cb-43d3-b971-948c85537785', 'sidney@syncstream.ai'),
    ('a4c897f5-02cb-43d3-b971-948c85537785', 'sweetmantech@gmail.com'),
]

registry_data = ""

for artist_id, email in mock_data:
    context = get_context(artist_id, email)
    context_str = json.dumps(context)
    instruction = get_instruction()
    instruction_str = json.dumps(instruction)

    if context:
        context_str = json.dumps(context)
    else:
        context_str = "No context available."
    content = {
        "input": (
            f"\n"
            f"Context: {context_str}\n"
            f"Question: How many fans have a free Spotify account??\n\n"
            f"{instruction_str}"
        ),
        "ideal": str(context['free_fans_count'])
    }

    registry_data += json.dumps(content) + "\n"

create_data('get_free_fans', registry_data)