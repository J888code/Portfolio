import json
from datetime import date
def quiz_game():
    print('=== Quiz Game v2 ===')
    questions = []
    scores = []
    def load(type):
        try:
            with open(f'{type}.json', 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            return []
    def save(type, data):
        with open(f'{type}.json', 'w') as f:
            json.dump(data, f)
    questions = load('questions')
    scores = load('scores')
    while True:
        try:
            choice = int(input('1. Take Quiz\n2. View Score History\n3. View All Questions\n4. Add New Question\n5. Quit\n'))
        except ValueError:
            print('Please enter an integer.')
        if choice == 5:
            print('Goodbye!')
            return
        if choice not in [1, 2, 3, 4]:
            print('Invalid choice. Try again.')
            continue
        if choice == 1:
            today = str(date.today())
            print('Quiz Started!')
            if not questions:
                print('No questions. Add some questions')
                continue
            else:
                score = 0
                for index, question in enumerate(questions, 1):
                    print(f"Question {index}/{len(questions)}: {question['question']}")
                    your_answer = input('Your answer: ').lower().strip()
                    if your_answer == question['answer'].lower():
                        print('Correct')
                        score += 1
                    else:
                        print(f"Wrong! The answer is {question['answer']}")
                print('Quiz Complete!')
                print(f'Your score: {score}/{len(questions)} ({score/len(questions):.2f}%)')
                scores.append({'score': score, 'total': len(questions), 'date': today})
                save('scores', scores)
        if choice == 2:
            print('=== Score History ===')
            for index, score_entry in enumerate(scores, 1):
                print(f"{index}. {score_entry['date']}: {score_entry['score']}/{score_entry['total']} ({score_entry['score']/score_entry['total']*100:.2f}%)")
        if choice == 3:
            print('=== All Questions ===')
            for index, question in enumerate(questions, 1):
                print(f"{index}. {question['question']} (Answer: {question['answer']})")
        if choice == 4:
            new = input('Enter new question: ').lower().strip()
            answer = input('Enter answer: ').lower().strip()
            question = {'question': new, 'answer': answer}
            questions.append(question)
            save('questions', questions)
            print('Question added!')
quiz_game()