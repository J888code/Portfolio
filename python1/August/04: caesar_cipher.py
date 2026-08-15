def caesar_cipher():
    print('=== Caesar Cipher v2 ===')
    def is_upper(ch):
        if ch.isupper():
            return True
        else:
            return False
        
    while True:
        print('1. Encrypt\n2. Decrypt\n3. Crack (brute force)\n4. Quit\n')
        try:
            choice = int(input('Choose option: '))
        except ValueError:
            print('Invalid input.')
        if choice == 4:
            print('Goodbye!')
            return
        if choice not in [1, 2, 3]:
            print('Invalid choice. Try again.')
            continue

        if choice == 1:
            result = []
            text = input('Enter text: ')
            try:
                shift = int(input('Enter shift (1-25): '))
            except ValueError:
                print('Invalid input.')
            for ch in text:
                if ch.isupper():
                    new_ch = chr(ord(ch) + shift)
                    result.append(new_ch)
                if ch in " !@£$%^&*()_+-€#[]{}:;'|?,.":
                    result.append(ch)
                else:
                    new_ch = chr(ord(ch) + shift)
                    result.append(new_ch)
            final = "".join(result)
            print(f'Encrypted: {final}')

        if choice == 2:
            result = []
            text = input('Enter text: ')
            try:
                shift = int(input('Enter shift (1-25): '))
            except ValueError:
                print('Invalid input.')
            for ch in text:
                if ch.isupper():
                    new_ch = chr(ord(ch) - shift)
                    result.append(new_ch)
                if ch in " !@£$%^&*()_+-€#[]{}:;'|?,.":
                    result.append(ch)
                else:
                    new_ch = chr(ord(ch) - shift)
                    result.append(new_ch)
            final = "".join(result)
            print(f'Decrypted: {final}')

        if choice == 3:
            best_shift = 0
            best_score = float('inf')
            text = input('Enter encrypted text: ')
            print('Trying all shifts...')
            for shift in range(1, 27):
                result = []
                for ch in text:
                    if ch.isupper():
                        new_ch = chr(ord(ch) - shift)
                        result.append(new_ch)
                    if ch in " !@£$%^&*()_+-€#[]{}:;'|?,.":
                        result.append(ch)
                    else:
                        new_ch = chr(ord(ch) - shift)
                        result.append(new_ch)
                final = "".join(result)
                freq = {}
                for ch in final:
                    if ch.isalpha():
                        ch = ch.lower()
                        freq[ch] = freq.get(ch, 0) + 1
                english_freq = {'e': 11, 't': 9, 'a': 8, 'o': 7, 'i': 7, 'n': 7, 's': 6, 'h': 6, 'r': 6, 'd': 4, 'l': 4, 'c': 3, 'u': 3, 'm': 2, 'w': 2, 'f': 2, 'g': 2, 'y': 2, 'p': 2, 'b': 1, 'v': 1, 'k': 1, 'j': 0.15, 'x': 0.15, 'q': 0.10, 'z': 0.07}
                score = 0
                for letter in english_freq:
                    english_count = english_freq[letter]
                    decrypted_count = freq.get(letter, 0)
                    score += abs(english_count - decrypted_count)
                if score < best_score:  # Lower is better
                    best_score = score
                    best_shift = shift
            # After the for loop ends:
            best_result = []
            for ch in text:
                if ch.isupper():
                    new_ch = chr(ord(ch) - best_shift)
                    best_result.append(new_ch)
                elif ch in " !@£$%^&*()_+-€#[]{}:;'|?,.":
                    best_result.append(ch)
                else:
                    new_ch = chr(ord(ch) - best_shift)
                    best_result.append(new_ch)
            best_final = "".join(best_result)

            print(f"Best match (shift {best_shift}): {best_final}")
            confidence = 100 - (best_score / len(text)) * 1  # Rough confidence %
            print(f'Confidence: {confidence:.2f}%')
caesar_cipher()