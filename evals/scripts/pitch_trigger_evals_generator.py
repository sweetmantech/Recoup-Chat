import json
import string
from get_instruction import get_instruction
from create_yaml_data import create_yaml, create_data

create_yaml("pitch_question_tool_trigger", "Answer should include ideal values.", "Trigger evaluation of questions related to pitch reports.")

instruction = get_instruction()
content = {
    "input": (
        f"\n"
        f"Question:\n"
        f"1.How can I best pitch Logic Pro?\n"
        f"2.What is the listening habits?\n"
        f"3.Analyze a tiktok account.\n\n"
        f"4.Write Celebrity Relationship Commentators Pitch."
        f"Instruction: {instruction['pitch_report_trigger']}\n\n\n"
        f"Based on instruction, I am gonna evaluate tool trigger.\n"
        f"Response the only triggerable questions as this format [question full setence]: [pitch name].\n"
    ),
    "ideal": "Logic Pro, Celebrity Relationship Commentators"
}
registry_data = json.dumps(content)
create_data("pitch_question_tool_trigger", registry_data)