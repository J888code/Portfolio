Project 11: RPG Battle System v2

Objective: Build a turn-based battle system with Player, Enemy subclasses, and Item classes.

Classes:

Player:

__init__(name, health, level, inventory)
attack(enemy) — deal damage
take_damage(damage) — reduce health
level_up() — increase health and damage
use_item(item) — consume item for effect

Enemy (base class):

__init__(name, health, damage)
attack() — return damage to deal
take_damage(damage)

Enemy subclasses (Goblin, Orc, Dragon):

Each has different health/damage values
Override attack() for special abilities (e.g., Dragon deals 1.5x damage)

Item:

__init__(name, effect_type, value) — e.g., "Health Potion", "heal", 50
apply(player) — heal player or boost damage

Battle System:

Player vs multiple enemies (turn-based)
Each turn: player attacks, enemy attacks back
Player can use items instead of attacking
Battle ends when enemy dies or player health ≤ 0
Winning gives experience → level up

Example:

=== RPG Battle System ===
Player: Hero (Level 1, Health: 100)

Battle Start! vs Goblin (Health: 30)

Your turn:
1. Attack
2. Use Item
3. Flee
Choose: 1
You dealt 15 damage! Goblin has 15 health.

Goblin's turn:
Goblin dealt 8 damage! You have 92 health.

Your turn:
Choose: 1
You dealt 15 damage! Goblin died!
Victory! You leveled up! (Level 2, Health: 120)

Build it. Use inheritance for Enemy subclasses.