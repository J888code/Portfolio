class Account:
    def __init__(self, name, balance):
        self.name = name
        self.balance = balance
    def deposit(self, amount):
        self.balance += amount
    def withdraw(self, amount):
        if self.balance >= amount:
            self.balance -= amount
            return True
        else:
            print('Insufficient funds.')
            return False
    def get_balance(self):
        return self.balance
class SavingAccount(Account):
    def __init__(self, name, balance, interest_rate=2):
        super().__init__(name, balance)
        self.interest_rate = interest_rate
    def apply_interest(self):
        interest = self.balance * (self.interest_rate / 100)
        self.balance += interest
class CheckingAccount(Account):
    def __init__(self, name, balance):
        super().__init__(name, balance)
def main():
    accounts = []
    print('=== Bank Account Simulator ===')
    while True:
        print("1. Create Account\n2. Deposit\n3. Withdraw\n4. View Accounts\n5. Apply Interest (Savings)\n6. Quit\n")
        try:
            choice = int(input('Choose: '))
        except ValueError:
            print('Invalid input.')
        if choice == 6:
            print('Goodbye')
            return
        if choice not in [1, 2, 3, 4, 5]:
            print('Invaid input. Please try again.')
            continue
        if choice == 1:
            acc_type = input('Account type (savings/checking): ').lower()
            name = input('Enter name: ')
            if acc_type == 'savings':
                acc = SavingAccount(name, 0)
                accounts.append(acc)
                print(f'Savings accunt created for {name} (Balance: $0)')
            elif acc_type == 'checking':
                acc = CheckingAccount(name, 0)
                accounts.append(acc)
                print(f'Checking accunt created for {name} (Balance: $0)')
            else:
                print('Invalid acc_type')
                continue
        if choice == 2:
            try:
                acc_no = int(input('Select account number: ')) -1
                if 0 <= acc_no < len(accounts):
                    account = accounts[acc_no]
                    amount = int(input('Deposit amount: '))
                    account.deposit(amount)
                    print(f'Deposited ${amount}. New balance: ${account.get_balance()}')
                else:
                    print('Account not found')
            except ValueError:
                print('Invalid input')
                continue
        if choice == 3:
            try:
                acc_no = int(input('Select account number: '))
                if 1 <= acc_no < len(accounts):
                    account = accounts[acc_no -1]
                    amount = int(input('Withdraw amount: '))
                    if amount <= account.balance:
                        account.withdraw(amount)
                        print(f'Withdrew ${amount}. New balance: ${account.get_balance()}')
            except ValueError:
                print('Invalid input')
                continue
        if choice == 4:
            print('=== Your Accounts ===')
            # for index, acc in enumerate(accs): print(f"{index}. {name} - {acc_type} - Balance: ${balance}") if savings: print(f'(Interest: {interest}%)')
            for index, account in enumerate(accounts, 1):
                acc_type = 'Savings' if isinstance(account, SavingAccount) else 'Checking'
                print(f"{index}. {account.name} - {acc_type} Account - Balance: ${account.get_balance()}")
                if isinstance(account, SavingAccount):
                    print(f"(Interest Rate: {account.interest_rate}%)")
        if choice == 5:
            try:
                acc_no = int(input('Select account number: '))
                if 1 <= acc_no < len(accounts):
                    account = accounts[acc_no -1]
                    if isinstance(account, SavingAccount):
                        account.apply_interest()
                        print(f'Interest applied! New balance: ${account.get_balance()}')
                    else:
                        print('This account type does not earn interest.')
                else:
                    print("Couldn't find account")
            except ValueError:
                print('Invalid input')
main()