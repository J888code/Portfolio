import requests
from bs4 import BeautifulSoup
import csv

url = "https://news.ycombinator.com/"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

stories = []
for row in soup.find_all('tr', class_='athing'):
    headline = row.find('span', class_='titleline').text
    link = row.find('a')['href']
    
    # Get score from next row
    next_row = row.find_next('tr')
    score = next_row.find('span', class_='score').text if next_row.find('span', class_='score') else 'N/A'
    
    stories.append({'headline': headline, 'link': link, 'score': score})
    print(f"{headline} - {score}")

# Save to CSV
with open('hackernews.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=['headline', 'link', 'score'])
    writer.writeheader()
    writer.writerows(stories)

print(f"\nScraped {len(stories)} stories!")