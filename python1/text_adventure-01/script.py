class Player:
    def __init__(self, name, health, inventory):
        self.name = name
        self.health = health
        self.inventory = inventory
        self.current_room = None
    def move(self, direction):
        if direction in self.current_room.connected_rooms:
            self.current_room = self.current_room.connected_rooms[direction]
            print(f"You moved {direction}")
            print(self.current_room)
        else:
            print("Not a valid direction")
    def attack(self):
        if self.current_room.enemies:
            enemy = self.current_room.enemies[0]
            damage_taken = enemy.attack()
            self.health -= damage_taken
            enemy.damaged(5)
            print(f"Enemy dealt {damage_taken} damage.")
            print(f"Enemy health: {enemy.heath}")

            if enemy.health <= 0:
                self.current_room.enemies.remove(enemy)
                print(f"You defeated the {enemy.name}!")
        else:
            print("No enemy to attack!")
    def pick_up_item(self, item):
        # if there is an item at the player's position, pick up
        self.inventory.append(item)

class Room:
    def __init__(self, description, connected_rooms, enemies, items):
        self.description = description
        self.connected_rooms = connected_rooms
        self.enemies = enemies
        self.items = items
    def __str__(self):
        return f"Description: {self.description}"
    def spawn_enemies(self):
        pass

class Enemy:
    def __init__(self, name, health, damage):
        self.name = name
        self.health = health
        self.damage = damage
    def damaged(self, damage):
        self.health -= damage
    def attack(self):
        return self.damage
class Goblin(Enemy):
    def __init__(self, name, health, damage):
        super().__init__(name, health, damage)
class Dragonborn(Enemy):
    def __init__(self, name, health, damage):
        super().__init__(name, health, damage)
class Orc(Enemy):
    def __init__(self, name, health, damage):
        super().__init__(name, health, damage)
class Item:
    def __init__(self, name, description):  # ← Add self parameter
        self.name = name
        self.description = description

def main():
    red_room = Room("Current room: red", {}, [], [])
    blue_room = Room("Current room: blue", {}, [], [])
    green_room = Room("Current room: green", {}, [], [])
    
    # Connect the rooms (which direction leads where)
    red_room.connected_rooms = {"north": blue_room, "east": green_room}
    blue_room.connected_rooms = {"south": red_room}
    green_room.connected_rooms = {"west": red_room}
    
    # Create player
    player = Player("Red", 100, [])
    player.current_room = red_room  # Start in red room

    goblin = Goblin("Goblin", 20, 5)
    red_room.enemies = [goblin, goblin, goblin]

    dragonborn = Dragonborn("Dragonborn", 75, 15)
    blue_room.enemies = [dragonborn]

    orc = Orc("Orc", 60, 10)
    green_room.enemies = [orc]

    # Game loop
    while True:
        print(player.current_room)
        action = input("Move (north/south/east/west) or attack: ")
        if action == "attack":
            player.attack()
        else:
            player.move(action)
main()