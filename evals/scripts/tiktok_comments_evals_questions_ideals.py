from criteria import count_query_criteria

evals_questions_ideals = [
    {
        "eval_name": "get_tiktok_video_comments_count",
        "question": "How many comments does this video have?",
        "ideal": "total_video_comments_count",
        "criteria": count_query_criteria
    },
    {
        "eval_name": "get_tiktok_analysis",
        "question": "Analyze a tiktok account? username: officialluhtyler",
        "ideal": "",
        "criteria": "The answer is not related to ideal value. The answer should provide a concise artist introduction followed by automatically generated fan segment data, including segment names and counts."
    }
]