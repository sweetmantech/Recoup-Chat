import json
import os
from create_yaml_data import create_yaml, create_data
from create_campaign_registry_data import create_campaign_registry_data

create_yaml("get_email_count_of_apple")

registry_data = create_campaign_registry_data("Due to Apple's policy, we do not collect Apple Music emails.", "What is the email count for users with an Apple Music account?")

create_data('get_email_count_of_apple', registry_data)

