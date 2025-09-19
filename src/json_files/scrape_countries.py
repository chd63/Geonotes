#please note that the script may not have 100 percent accuracy
# for names compared to the names I use in geo some of them have not beed
# added to the website yet so we need to add them or the names are diffrent

# REMEMBER you must add the following manually to the json file
'''
  "czechia",
  "faeroe is.",
  "st-martin",
  "Nepal",
  "egypt",
  "lebanon",
  "tanzania",
  "namibia",
  "dom. rep.",
  "belarus",
  "vanuatu",
  "antarctica",
  "mali"

'''


import requests
from bs4 import BeautifulSoup
import json

web_url2 = "https://geometas.com/learn/geoguessr_country_coverage"
page5 = requests.get(web_url2, verify=False)
soup5 = BeautifulSoup(page5.content, 'html.parser')
quality_soup = soup5.find(class_="flex flex-col gap-y-4")
countries = quality_soup.find_all(class_="hidden sm:block")

country_list = []

# we should clean up the data before saving import
for country in countries:
    name = country.text.strip()
    name = name[3:]
    country_list.append(name) 

print(country_list)

with open("geoguessr_countries.json", "w", encoding="utf-8") as f:
    json.dump(country_list, f, ensure_ascii=False, indent=2) 
