import json
import string
from get_instruction import get_instruction
from create_yaml_data import create_yaml, create_data

create_yaml("pitch_question_tool_trigger", "The answer should be the pitch name.", "how can I best pitch Logic Pro?")

instruction = get_instruction()
content = {
    "input": (
        f"\n"
        f"Question: how can I best pitch Logic Pro?\n\n"
        f"{instruction['pitch_report_trigger']}"
    ),
    "ideal": ""
}
registry_data = json.dumps(content)
create_data("pitch_question_tool_trigger", registry_data)