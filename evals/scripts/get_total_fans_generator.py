import json
import os
import string
from get_context import get_context
from get_instruction import get_instruction

CURRENT_DIR = os.path.dirname(__file__)
REGISTRY_PATH = os.path.join(CURRENT_DIR, "../registry")

YAML = """
get_total_unique_fans:
  id: get_total_unique_fans.dev.v0
  description: Evaluates the model's ability to analyze music streaming and fan engagement data, including metrics like premium vs free subscribers, playlist engagement, artist performance, and listener behavior across different streaming platforms.
  metrics: [accuracy]
get_total_unique_fans.dev.v0:
  class: evals.elsuite.modelgraded.classify:ModelBasedClassify
  args:
    samples_jsonl: get_total_unique_fans/samples.jsonl
    eval_type: cot_classify
    modelgraded_spec: closedqa
    modelgraded_spec_args:
      criteria: "correctness: The answer should be numerically correct and include appropriate units (if applicable). The solution should match exactly with the reference answer."
""".strip()

yaml_file = os.path.join(REGISTRY_PATH, "evals/get_total_unique_fans.yaml")
with open(yaml_file, "w") as yf:
    yf.write(YAML)
    
data_dir = os.path.join(REGISTRY_PATH, "data/get_total_unique_fans")

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
            f"Question: How many unique fans have participated in this campaign?\n\n"
            f"{instruction_str}"
        ),
        "ideal": str(context['total_unique_fans_count'])
    }

    registry_data += json.dumps(content) + "\n"

file_name = os.path.join(data_dir, f"samples.jsonl")

with open(file_name, "w") as f:
    f.write(registry_data)