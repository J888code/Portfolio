import random
def rock_paper_scissors():
    print('=== Rock-Paper-Scissors ===')
    num = 1
    wins = 0
    losses = 0
    ties  = 0
    options = ['rock', 'paper', 'scissors']
    while True:
        print(f'Round {num}')
        shoot_user = input('Choose (rock/paper/scissors/quit): ').lower()
        if shoot_user == 'quit':
            print(f'\n=== Tournament Over ===')
            print(f'Final Stats:')
            print(f'Wins: {wins}')
            print(f'Losses: {losses}')
            print(f'Ties: {ties}')
            total_rounds = wins + losses + ties
            print(f'Total Rounds: {total_rounds}')
            if total_rounds > 0:
                win_percentage = (wins / total_rounds) * 100
                print(f'Win Percentage: {win_percentage:.2f}%')
            else:
                print('No rounds played.')
            break
        if shoot_user not in options:
            print('Invalid input. Try again.')
            continue
        shoot_bot = random.choice(options)
        print(f'Computer chose: {shoot_bot}')
        if shoot_user == shoot_bot:
            print("It's a tie\n")
            ties += 1
        elif (
            (shoot_user == "rock" and shoot_bot == "scissors") or
            (shoot_user == "paper" and shoot_bot == "rock") or
            (shoot_user == "scissors" and shoot_bot == "paper")
        ):
            print("You win!\n")
            wins += 1
        else:
            print("You lose!\n")
            losses += 1
        print(f"Current Score - Wins: {wins} | Losses: {losses} | Ties: {ties}")
        num += 1
rock_paper_scissors()