def unit_converter():
    temperature = ['celsius', 'fahrenheit', 'kelvin']
    length = ['meters', 'feet', 'inches', 'kilometers', 'miles']
    weight = ['kilograms', 'pounds', 'ounces', 'grams']
    
    print('=== Unit Converter ===')
    while True:
        print('1. Temperature\n2. Length\n3. Weight\n4. Quit')
        
        try:
            category = int(input('Choose a category: '))
        except ValueError:
            print('Please enter a valid number.\n')
            continue
            
        if category == 4:
            print('Terminating program...\nQuitting...')
            return
            
        if category not in [1, 2, 3]:
            print('Not a valid category selection. Try again.\n')
            continue
            
        if category == 1:
            chosen_list = temperature
        elif category == 2:
            chosen_list = length
        else:
            chosen_list = weight
            
        try:
            value = float(input('Enter value: '))
        except ValueError:
            print('Invalid numerical value. Returning to main menu.\n')
            continue
            
        fro = input('Convert from: ').lower().strip()
        to = input('Convert to: ').lower().strip()
        
        # Check if units are valid for the selected category
        if fro not in chosen_list or to not in chosen_list:
            print(f"Invalid units. Must choose from: {', '.join(chosen_list)}\n")
            continue  # Re-starts the loop instead of exiting the program
            
        result = 0.0
        
        # --- 1. TEMPERATURE MATH ---
        if category == 1:
            if fro == to:
                result = value
            elif fro == 'celsius' and to == 'fahrenheit':
                result = (value * 9/5) + 32
            elif fro == 'celsius' and to == 'kelvin':
                result = value + 273.15
            elif fro == 'fahrenheit' and to == 'celsius':
                result = (value - 32) * 5/9
            elif fro == 'fahrenheit' and to == 'kelvin':
                result = (value - 32) * 5/9 + 273.15
            elif fro == 'kelvin' and to == 'celsius':
                result = value - 273.15
            elif fro == 'kelvin' and to == 'fahrenheit':
                result = (value - 273.15) * 9/5 + 32

        # --- 2. LENGTH MATH (Base unit: meters) ---
        elif category == 2:
            # Conversion factors relative to 1 Meter
            meters_per_unit = {'meters': 1.0, 'feet': 0.3048, 'inches': 0.0254, 'kilometers': 1000.0, 'miles': 1609.344}
            # Step 1: Convert input unit to meters
            value_in_meters = value * meters_per_unit[fro]
            # Step 2: Convert meters to target unit by dividing
            result = value_in_meters / meters_per_unit[to]

        # --- 3. WEIGHT MATH (Base unit: grams) ---
        elif category == 3:
            # Conversion factors relative to 1 Gram
            grams_per_unit = {'grams': 1.0, 'kilograms': 1000.0, 'pounds': 453.59237, 'ounces': 28.349523125}
            # Step 1: Convert input unit to grams
            value_in_grams = value * grams_per_unit[fro]
            # Step 2: Convert grams to target unit by dividing
            result = value_in_grams / grams_per_unit[to]
            
        print(f"\nResult: {value} {fro} = {round(result, 4)} {to}\n")

unit_converter()
