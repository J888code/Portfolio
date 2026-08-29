from abc import ABC, abstractmethod
class Employee(ABC):
    def __init__(self, name, employee_id, base_salary):
        self.name = name
        self.employee_id = employee_id
        self.base_salary = base_salary
    @abstractmethod
    def calculate_pay(self):
        pass
    def get_info(self):
        print(f'Name: {self.name}\nEmployee id: {self.employee_id}\nSalary: {self.base_salary}\n')
class Salaried(Employee):
    def __init__(self, name, employee_id, base_salary):
        super().__init__(name, employee_id, base_salary)
    def calculate_pay(self):
        return self.base_salary
class Hourly(Employee):
    def __init__(self, name ,employee_id, hourly_rate, hours_worked):
        self.name = name
        self.employee_id = employee_id
        self.hourly_rate = hourly_rate
        self.hours_worked = hours_worked
    def calculate_pay(self):
        if self.hours_worked > 40:
            overtime_hours = self.hours_worked - 40
            result = self.hourly_rate * 40 + (overtime_hours * self.hourly_rate * 1.5)
        else:
            result = self.hourly_rate * self.hours_worked
        return result
class Manager(Salaried):
    def __init__(self, name, employee_id, base_salary, bonus):
        super().__init__(name, employee_id, base_salary)
        self.bonus = bonus
    def calculate_pay(self):
        return self.base_salary + self.bonus

def main():
    employees = []
    print('=== Payroll System ===')
    while True:
        print('1. Add Employee\n2. Calculate Pay\n3. View All Employees\n4. Payroll Report\n5. Quit\n')
        try:
            choice = int(input('Choose: '))
        except ValueError:
            print('Invalid input')
        if choice == 5:
            print('Goodbye!')
            return
        if choice not in [1, 2, 3, 4]:
            print('Invalid input')
            continue
        if choice == 1:
            employee_type  = input('Employee type (salaried/hourly/manager): ').lower().strip()
            name = input('Name: ')
            try:
                employee_id = int(input('Employee_id: '))
                base_salary = float(input('Base Salary: '))
                found = False
                if employee_type == 'salaried':
                    employee = Salaried(name, employee_id, base_salary)
                    employees.append(employee)
                    found = True
                elif employee_type == 'hourly':
                    try:
                        hourly_rate = float(input('Hourly rate: '))
                        hours_worked = int(input('Hours worked: '))
                        employee = Hourly(name, employee_id, hourly_rate, hours_worked)
                        employees.append(employee)
                        found = True
                    except ValueError:
                        print('INVALID INPUT')
                elif employee_type == 'manager':
                    try:
                        bonus = float(input('Bonus: '))
                        employee = Manager(name, employee_id, base_salary, bonus)
                        employees.append(employee)
                        found = True
                    except ValueError:
                        print('INVALID INPUT')
                if found == False:
                    print('ERROR: NOT FOUND')
                    continue
                if found == True:
                    print('Employee added!')
            except ValueError:
                print('Invalid input')
        if choice == 2:
            select = input('Select employee: ')
            founded = False
            for employee in employees:
                if employee.name == select:
                    print(f"{employee.name}'s pay: ${employee.calculate_pay()}")
                    founded = True
            if founded == False:
                print("ERROR: NOT FOUND")
        if choice == 3:
            print('=== All Employees ===')
            for i in employees:
                if isinstance(i, Manager):
                    print(f"{i.name} (ID: {i.employee_id}) - Manager - ${i.calculate_pay()}")
                elif isinstance(i, Hourly):
                    print(f"{i.name} (ID: {i.employee_id}) - Hourly (${i.hourly_rate}/hr, {i.hours_worked} hours) - ${i.calculate_pay()}")
                else:
                     print(f"{i.name} (ID: {i.employee_id}) - Salaried - ${i.calculate_pay()}")
        if choice == 4:
            # sum all pay, print total
            total = 0
            for x in employees:
                total += x.calculate_pay()
            print(f'Total : ${total}\n')
main()