from random import randint 
# Level 1
card1 = randint(1,100)
card2 = randint(1,100)
card3 = randint(1,100)
card4 = randint(1,100)
card5 = randint(1,100)
target = randint(50,300)
def operations(card1, card2, operator):
    if operator == "+":
        