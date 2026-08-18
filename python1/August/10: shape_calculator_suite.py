from abc import ABC, abstractmethod
class Shape(ABC):
    @abstractmethod
    def area(self):
        pass
    def perimeter(self):
        pass
    def display_info(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    def area(self):
        return self.width * self.height
    def perimeter(self):
        return 2 * (self.width + self.height)
    def display_info(self):
        print(f"width * height = {self.area()}")
        print(f"2(width + height) = {self.perimeter()}")

class Square(Rectangle):
    def __init__(self, side):
        super().__init__(side, side)
        self.side = side
    def display_info(self):
        super().display_info(self)

def main():
    shapes = []
    print('=== Shape Calculator ===')
    while True:
        print('1. Add Rectangle\n2. Add Square\n3. View All Shapes\n4. Total Area\n5. Quit\n')
        try:
            choice = int(input('Choose: '))
        except ValueError:
            print('Invalid input.')
        if choice == 5:
            print("Goodbye!")
            return
        if choice not in [1, 2, 3, 4]:
            print('Invalid choice.')
            continue
        if choice == 1:
            try:
                width = int(input('Width: '))
                height = int(input('Height: '))
                rectangle = Rectangle(width, height)
                shapes.append(rectangle)
                area = rectangle.area()
                perimeter = rectangle.perimeter()
                print(f'Rectangle added! Area: {area}, Perimeter: {perimeter}')
            except ValueError:
                print('Invalid input')
        if choice == 2:
            try:
                side = int(input('Side: '))
                square = Square(side)
                shapes.append(square)
                area = square.area()
                perimeter = square.perimeter()
                print(f'Square added! Area: {area}, Perimeter: {perimeter}')
            except ValueError:
                print('Invaldi input.')
        if choice == 3:
            print('=== All Shapes ===')
            for index, shape in enumerate(shapes, 1):
                if isinstance(shape, Square):
                    print(f'{index}. Square ({shape.side}x{shape.side}) - Area: {shape.area()}')
                else:
                    print(f'{index}. Rectangle ({shape.width}x{shape.height}) - Area: {shape.area()}')
        if choice == 4:
            total_area = 0
            for shape in shapes:
                total_area += shape.area()  
            print(f'Total area: {total_area}')
main()
