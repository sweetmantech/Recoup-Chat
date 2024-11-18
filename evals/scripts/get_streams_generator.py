import json
import os
import string
from create_yaml_data import create_yaml, create_data
from create_general_campaign_registry_data import create_general_campaign_registry_data

create_yaml("get_streams_count", "The answer should accurately reflect the total streams generated, match exactly with the reference data.")

registry_data = create_general_campaign_registry_data("streamsCount", "What is the number of total streams generated from the campaign?")

create_data('get_streams_count', registry_data)