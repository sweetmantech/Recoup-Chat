from criteria import count_query_criteria

evals_questions_ideals = [
    {
        "eval_name": "get_streams_count",
        "question": "How many times has the average fan streamed the campaign song?",
        "ideal": "average_streamed_count",
        "criteria": count_query_criteria
    },
    {
        "eval_name": "get_highest_score_gained_fan",
        "question": "Who achieved the highest game score in this campaign?",
        "ideal": "highest_scored_fan",
        "criteria": "The answer should accurately reflect the name & points of the reference answer."
    }
]