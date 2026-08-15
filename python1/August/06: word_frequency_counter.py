import string
def word_frequency_counter():
    def freq():
        with open(f'{file}', 'r') as f:
            print(f'Reading {file}...')
            content = f.read()
            words = content.lower().split()
            words = [word.strip(string.punctuation) for word in words]
            freq = {}
            for word in words:
                freq[word] = freq.get(word, 0) + 1
            sorted_freq = dict(sorted(freq.items(), key=lambda item: item[1], reverse=True))
            top10 = {}
            for index, (word, count) in enumerate(sorted_freq.items()):
                if index < 10:
                    top10[word] = count
            for index, (word, count) in enumerate(top10.items()):
                print(f"{index + 1}. {word} ({count})")
    file = input('Enter filename (or press Enter for test.txt): ')
    if not file:
        file = 'test.txt'
        with open('test.txt', 'w') as f:
            f.write('The quick brown fox jumps over the lazy dog. The dog was sleeping under the tree. The fox was quick and clever. The brown fox jumped and jumped. The lazy dog did not care about the fox. The tree was tall and green. Under the tree there was a small house. The fox wanted to explore the house. The dog wanted to sleep more. The quick fox ran around the tree many times. The lazy dog finally woke up. The dog saw the fox near the tree. Both the fox and the dog were tired. They rested under the tree together.\n')
    freq()
word_frequency_counter()