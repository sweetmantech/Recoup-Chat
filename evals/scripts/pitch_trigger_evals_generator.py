import json
import string
from get_instruction import get_instruction
from create_yaml_data import create_yaml, create_data

create_yaml("pitch_question_tool_trigger", "The answer should be the pitch name.", "how can I best pitch Logic Pro?")

instruction = get_instruction()
content = {
    "input": (
        f"\n"
        f"Question:\n"
        f"1.How can I best pitch Logic Pro?\n"
        f"2.What is the listening habits?\n"
        f"3.Analyze a tiktok account.\n\n"
        f"4.Write Celebrity Relationship Commentators Pitch."

        f"Instruction: {instruction['pitch_report_trigger']}"
        f"To evaluate the tool's trigger mechanism, Respond only to questions fitting the specified format: '[Full question sentence]: [Pitch Name]'.\n"
    ),
    "ideal": "Answer should include these words - Logic Pro, Celebrity Relationship Commentators"
}
registry_data = json.dumps(content)
create_data("pitch_question_tool_trigger", registry_data)