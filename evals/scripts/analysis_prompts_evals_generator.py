import json
import string
from get_instruction import get_instruction
from create_yaml_data import create_yaml, create_data
from get_pitch_report_context import get_pitch_report_context

create_yaml("analysis_suggestion_tool_trigger", "Answer should be the prompts.", "Funnel Analysis Suggestions.")

instruction = get_instruction()
context = get_pitch_report_context()
context_str = json.dumps(context)

content = {
    "input": (
        f"\n"
        f"[Instruction]: {instruction['get_analysis_suggestion']}\n\n\n"
        f"[Context]: {context_str}"
    ),
    "ideal": ""
}
registry_data = json.dumps(content)
create_data("analysis_suggestion_tool_trigger", registry_data)