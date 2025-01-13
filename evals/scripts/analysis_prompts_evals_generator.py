import json
import string
from get_instruction import get_instruction
from create_yaml_data import create_yaml, create_data
from get_pitch_report_context import get_pitch_report_context

create_yaml("instrumental_suggestion_tool_trigger", "Answer should be the prompts.", "Trigger evaluation of questions related to funnel analysis.")

instruction = get_instruction()
context = get_pitch_report_context()
context_str = json.dumps(context)

content = {
    "input": (
        f"\n"
        f"[Instruction]: {instruction['get_instrumental_suggestion']}\n\n\n"
        f"[Context]: {context_str}"
    ),
    "ideal": "Logic Pro, Celebrity Relationship Commentators"
}
registry_data = json.dumps(content)
create_data("instrumental_suggestion_tool_trigger", registry_data)