def extract_between_markers(text):
    begin_marker = '[BEGIN SUBMISSION]'
    end_marker = '[END SUBMISSION]'

    begin_index = input_text.find(begin_marker)
    end_index = input_text.find(end_marker)

    if begin_index == -1 or end_index == -1 or begin_index >= end_index:
        return None

    content = input_text[begin_index + len(begin_marker):end_index].strip()
    return content