class Item:
    def __init__(self, name, price, quantity):
        self.name = name
        self.price = price
        self.quantity = quantity
class VendingMachine:
    def __init__(self):
        self.items = []
        self.balance = 0
class States:
    pass
def main():
    vending_machine = VendingMachine()
    print('=== Vending Machine ===')
    while True:
        print('1. Insert Money\n2. Select Item\n3. Refund\n4. Restock (Admin)\n5. Quit\n')
        print('Available Items: ')
        for item in vending_machine.items:
            print(f'- {item.name} (${item.price:.2f}) - {item.quantity} in stock\nCurrent balance: ${vending_machine.balance:.2f}\n')
        try:
         choice = int(input('Choose: '))
        except ValueError:
            print('Invalid input.')
        if choice == 5:
            print('Goodbye!')
            return
        if choice not in [1, 2, 3, 4]:
            print('Invallid input.')
            continue
        if choice == 1:
            try:
                amount = float(input('Insert amount: '))
                vending_machine.balance += amount
                print(f'Balance updated! Current balance: ${vending_machine.balance:.2f}\n')
            except ValueError:
                print('Invalid input.')
        if choice == 2:
            select = input('Select item: ').strip().lower()
            for item in vending_machine.items:
                if item.name.lower() == select:
                    if vending_machine.balance >= item.price:
                        item.quantity -= 1
                        vending_machine.balance -= item.price
                        if item.quantity == 0:
                            vending_machine.items.remove(item)
                        print(f'Dispensed {item.name}! Current balance: ${vending_machine.balance:.2f}')
                    else:
                        print('Not enough money.')
            else:
                print('Could not find item')
        if choice == 3:
            print(f'Refunded ${vending_machine.balance:.2f}')
            vending_machine.balance = 0
        if choice == 4:
            password = 'PEPSISTADIUM67'
            guess = input('Enter password: ')
            if guess == password:
                item_name = input('Item: ').lower()
                found = False
                try:
                    amount = int(input('Quantity: '))
                    item.quantity += amount
                except ValueError:
                    print('Invalid input')
                break
                for item in vending_machine.items:
                    if item.name.lower() == item_name:
                        found = True
                        item.quantity += 1
                        break
                if not found:
                    try:
                        priced = float(input('Price: '))
                        quant = int(input('Quantity: '))
                    except ValueError:
                        print('Error')
                    new = Item(item_name, priced, quant)
                    vending_machine.items.append(new)
                else:
                    print('Item restocked!')
            else:
                print('Incorrect')
main()