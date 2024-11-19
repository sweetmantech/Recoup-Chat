def extract_between_markers(text, start_marker, end_marker):
    """
    Extracts text between the specified start and end markers in a multiline string.

    :param text: The input multiline text from which to extract
    :param start_marker: The string that indicates where to start extracting
    :param end_marker: The string that indicates where to stop extracting
    :return: The string containing all lines between the two markers
    """
    lines = text.split('\n')

    extracted_lines = []
    
    inside_section = False

    for line in lines:
        if line.startswith(start_marker):
            inside_section = True
            continue
        
        if line.startswith(end_marker):
            inside_section = False
            break

        if inside_section:
            extracted_lines.append(line)

    return '\n'.join(extracted_lines).strip()