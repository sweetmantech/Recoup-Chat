import json
import os
from create_yaml_data import create_yaml, create_data
from create_campaign_registry_data import create_campaign_registry_data

create_yaml("get_total_unique_fans")

registry_data = create_campaign_registry_data("total_unique_fans_count", "How many unique fans have participated in this campaign?")

create_data('get_total_unique_fans', registry_data)