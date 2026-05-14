import requests
from bs4 import BeautifulSoup
import csv

url = "https://www.ycombinator.com/jobs" 
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')
print(response.text)
jobs = []
for job in soup.find_all('div', class_='job'):
    title = job.find('h2').text.strip()
    company = job.find('h3').text.strip()
    location = job.find('p', class_='location').text.strip() if job.find('p', class_='location') else 'N/A'
    jobs.append({'title': title, 'company': company, 'location': location})
    print(f"{title} at {company} - {location}")
with open('ycombinator_jobs.csv', 'w', newline='', encoding='utf-8') as f:    
    writer = csv.DictWriter(f, fieldnames=['title', 'company', 'location'])
    writer.writeheader()
    writer.writerows(jobs)
print(f"\nScraped {len(jobs)} jobs!")