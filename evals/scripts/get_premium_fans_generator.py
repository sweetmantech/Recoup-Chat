import json
import os
from create_yaml_data import create_yaml, create_data
from create_campaign_registry_data import create_campaign_registry_data

create_yaml("get_premium_fans")   

registry_data = create_campaign_registry_data("premium_fans_count", "What is the total number of fans with a premium Spotify account?")

create_data('get_premium_fans', registry_data)