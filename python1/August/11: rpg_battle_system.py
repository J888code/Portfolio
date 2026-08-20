class Player:
    def __init__(self, name):
        self.name = name
        self.level = 1
        self.health = 10
        self.inventory = []
        self.damage = 1
    def attack(self, enemy):
        enemy.take_damage(self.damage)
        print(f'You dealt {self.damage} damage!')
        print(f'{enemy.name} has {enemy.health} health.')
    def take_damage(self, damage):
        self.health -= damage
    def level_up(self):
        self.level += 1
        self.damage += 1
        self.health += 5
    def use_item(self, item):
        self.inventory.remove(item)
class Enemy:
    def __init__(self, name, health, damage):
        self.name = name
        self.health = health
        self.damage = damage
    def attack(self, player):
        player.take_damage(self.damage)
        print(f'{self.name} dealt {self.damage} damage! You have {player.health} health.')
    def take_damage(self, damage):
        self.health -= damage
class Goblin(Enemy):
    def __init__(self):
        super().__init__('Goblin', health=3, damage=1)
class Orc(Enemy):
    def __init__(self):
        super().__init__('Orc', health=7, damage=3)
class Gnome(Enemy):
    def __init__(self):
        super().__init__('Gnome', health=15, damage=2)
class Item:
    def __init__(self, name, effect_type, value):
        self.name = name
        self.effect_type = effect_type
        self.value = value

    def apply(self, player):
        if self.effect_type == 'heal':
            player.health += self.value

def main():
    name = input('Enter name: ')
    player = Player(name)

    print("=== RPG Battle System ===")
    count = 1
    while True:
        print(f'Player: {player.name} (Level {player.level}, Health: {player.health})\n')
        if count % 3 == 0:
            enemy = Orc()
            print(f'Battle Start! vs {enemy.name} (Health: {enemy.health})')
        elif count % 2 == 0 or count == 1:
            enemy = Goblin()
            print(f'Battle Start! vs {enemy.name} (Health: {enemy.health})')
        else:
            enemy = Gnome()
            print(f'Battle Start! vs {enemy.name} (Health: {enemy.health})')
        while enemy.health > 0 and player.health > 0:
            print(f'Your turn: \n1. Attack\n2. Use Item\n3. Flee\n')
            try:
                choice = int(input('Choose: '))
            except ValueError:
                print('Invalid input')
            if choice not in [1, 2, 3]:
                print('Invalid choice')
                continue
            if choice == 1:
                player.attack(enemy)
                if enemy.health <= 0:
                    player.level_up()
                    print(f'{enemy.name} died! Victory! You leveled up! (Level: {player.level}, Health: {player.health})')
                    count += 1
                    break
            elif choice == 2:
                print(f'Inventory: {player.inventory}')
                try:
                    index = int(input('Choose item index: '))
                except ValueError:
                    print('Invalid input')
                player.use_item(player.inventory[index])
            elif choice == 3:
                print('You ran away')
                return
            print(f"\n{enemy.name}'s Turn:")
            enemy.attack(player)
            if player.health <= 0:
                print('You died')
                return
main()