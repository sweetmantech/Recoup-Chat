import json

def load_json(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)

def get_instruction():
    instruction = load_json("../../lib/instructions.json")
    return instruction