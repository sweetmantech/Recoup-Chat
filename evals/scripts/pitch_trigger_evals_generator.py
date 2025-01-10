from create_yaml_data import create_yaml, create_data
from get_instruction import get_instruction

create_yaml("pitch_question_tool_trigger", "The answer should be the pitch name.", "how can I best pitch Logic Pro?")

instruction = get_instruction()
content = {
    "input": (
        f"\n"
        f"Question: ${question}\n\n"
        f"{instruction[""]}"
    ),
    "ideal": ideal_value_str
}
registry_data = json.dumps(content) + "\n"
create_data("pitch_question_tool_trigger", registry_data)