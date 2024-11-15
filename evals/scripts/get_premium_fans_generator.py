import json
import os
import string
from supabase import create_client

supabase_url = os.environ.get("SUPABSE_URL")
supabase_key = os.environ.get("SUPABASE_KEY")
supabase = create_client(supabase_url, supabase_key)

CURRENT_DIR = os.path.dirname(__file__)
REGISTRY_PATH = os.path.join(CURRENT_DIR, "../registry")

def get_premium_fans(artist_id, email):
    response = supabase.rpc('get_campaign', {'artistid': artist_id, 'email': email, 'clientid': ''}).execute()
    if response.data:
        premium_fans = [fan for fan in response.data['fans'] if fan['product'] == 'premium']
        return len(premium_fans)
    return 0

YAML = """
get_premium_fans:
  id: get_premium_fans.dev.v0
  description: Evaluates the model's ability to analyze music streaming and fan engagement data, including metrics like premium vs free subscribers, playlist engagement, artist performance, and listener behavior across different streaming platforms.
  metrics: [accuracy]
get_premium_fans.dev.v0:
  class: evals.elsuite.modelgraded.classify:ModelBasedClassify
  args:
    samples_jsonl: get_premium_fans/samples.jsonl
    eval_type: cot_classify
    modelgraded_spec: 
      criteria: "correctness: The answer should be numerically correct and include appropriate units (if applicable). The solution should match exactly with the reference answer."
""".strip()

yaml_file = os.path.join(REGISTRY_PATH, "evals/get_premium_fans.yaml")
with open(yaml_file, "w") as yf:
    yf.write(YAML)
    
data_dir = os.path.join(REGISTRY_PATH, "data/get_premium_fans")

mock_data = [
    ('a4c897f5-02cb-43d3-b971-948c85537785', 'sidney@syncstream.ai'),
    ('a4c897f5-02cb-43d3-b971-948c85537785', 'sweetmantech@gmail.com'),
]

registry_data = ""

for artist_id, email in mock_data:
    premium_fans_count = get_premium_fans(artist_id, email)

    content = {
        "input": [
            {
                "role": "system",
                "content": "Based on provided params you should get number of premium fans from supabase fans table. You should first context related to params from supabase. And then you should calculate premium fans count."
            },
            {
                "role": "user",
                "content": f"""
                    Question: What is the total number of fans with a premium Spotify account?
                    Params:
                    - ArtistId: {artist_id}
                    - Email: {email}
                """
            }
        ],
        "ideal": str(premium_fans_count)
    }

    registry_data += json.dumps(content) + "\n"

file_name = os.path.join(data_dir, f"samples.jsonl")

with open(file_name, "w") as f:
    f.write(registry_data)