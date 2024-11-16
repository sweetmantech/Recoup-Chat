import json
import os
import string
from supabase import create_client

supabase_url = os.environ.get("SUPABASE_URL")
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

def get_context(artist_id, email):
    response = supabase.rpc('get_campaign', {'artistid': artist_id, 'email': email, 'clientid': ''}).execute()
    return response.data

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
    modelgraded_spec: closedqa
    modelgraded_spec_args:
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
    context = get_context(artist_id, email)
    context_str = json.dumps(context)
    if context:
        context_str = json.dumps(context)
    else:
        context_str = "No context available."
    content = {
        "input": f"Context: {context_str}\n"
                  "Question: What is the total number of fans with a premium Spotify account?\n\n"
                  "1. Due to Apple's policy, do not collect Apple Music emails. No recommendations or insights are needed.\n"
                  "For example: 'Due to Apple's policy, we do not collect Apple Music emails.'\n"
                  "2. The guidelines below outline responses based on question type:\n"
                  "- Count Queries: Respond with only the number, NOTHING ELSE.\n"
                  "- Artists, Albums, Episodes, Playlists, Audio Books, Tracks, Shows: Provide only relevant information.\n"
                  "- Country Distribution Fans: Format as [country name]: [fan count] with <li> tags.\n"
                  "- Listening Habits (4 Sentences):\n"
                  "    a. Overview: Summarize listening trends, including genres, artists, content types, countries, cities, and segments.\n"
                  "    b. Content Breakdown: Highlight popular items and standout artists.\n"
                  "    c. Engagement Metrics: Report key statistics and identify top performers.\n"
                  "3. Recommendations (2-3 Sentences):\n"
                  "   Provide actionable strategies to improve engagement.\n"
                  "4. Trends and Insights (2-3 Sentences):\n"
                  "   Identify emerging trends or insights from the data and compare to broader industry trends, if relevant.\n\n"
                  "Ensure your answer is data-driven, insightful, and provides clear value for understanding and acting on the fan base's behavior.",
        "ideal": str(premium_fans_count)
    }

    registry_data += json.dumps(content) + "\n"

file_name = os.path.join(data_dir, f"samples.jsonl")

with open(file_name, "w") as f:
    f.write(registry_data)