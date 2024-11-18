count_query_criteria = "The answer should be numerically correct and include appropriate units (if applicable). The solution should match exactly with the reference answer."
sub_set_criteria = "The actual answer should be a subset of the reference answer, answers can include emoji unicode values."

evals_questions_ideals = [
    {
        "question": "What is the email count for users with an Apple Music account?",
        "ideal": "Due to Apple's policy, we do not collect Apple Music emails.",
        "eval_name": "get_email_count_of_apple",
        "criteria": "The main points explained in the reference answer and the actual answer should be the same."
    },
    {
        "question": "What is the total number of fans with a premium Spotify account?",
        "ideal": "premium_fans_count",
        "eval_name": "get_premium_fans",
        "criteria": count_query_criteria
    },
    {
        "question": "How many fans have a free Spotify account??",
        "ideal": "free_fans_count",
        "eval_name": "get_free_fans",
        "criteria": count_query_criteria
    },
    {
        "question": "How many unique fans have participated in this campaign?",
        "ideal": "total_unique_fans_count",
        "eval_name": "get_total_unique_fans",
        "criteria": count_query_criteria
    },
    {
        "question": "What are the top five artists that fans are listening to on aggregate?",
        "ideal": "artists",
        "eval_name": "get_top_five_artist",
        "criteria": sub_set_criteria
    },
    {
        "question": "What are the top five playlists among users?",
        "ideal": "playlists",
        "eval_name": "get_top_five_playlists",
        "criteria": sub_set_criteria
    },
    {
        "question": "How many total playlists are fans engaging with?",
        "ideal": "playlists_count",
        "eval_name": "get_playlists_count",
        "criteria": count_query_criteria
    }
]