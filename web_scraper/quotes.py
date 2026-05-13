import requests
from bs4 import BeautifulSoup
url = "http://quotes.toscrape.com/"
response = requests.get(url)
print(response.text)

soup = BeautifulSoup(response.text, 'html.parser')
quotes = soup.find_all('div', class_='quote')
for quote in quotes:
    print(quote)
text = soup.find_all('span', class_='text')
for quote in text:
    print(quote.text)
authors = soup.find_all('small', class_='author')
for author in authors:
    print(author.text)
    import csv

quotes_data = []
for i in range(len(text)):
    quotes_data.append({
        'quote': text[i].text,
        'author': authors[i].text
    })

with open('quotes.csv', 'w', newline='', encoding='utf-8') as file:
    writer = csv.DictWriter(file, fieldnames=['quote', 'author'])
    writer.writeheader()
    writer.writerows(quotes_data)

print(f"Scraped {len(quotes_data)} quotes!")