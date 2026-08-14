def contact_book():
    print('=== Contact Book ===')
    contacts = []
        
    def add_contact():
        name = input('Enter name: ')
        try:
            phone = int(input('Enter phone: '))
        except ValueError:
            print('Invalid phone.')
            return
        email = input('Enter email: ')
        address = input('Enter address: ')
        if "@" in email:
            contacts.append({
                'name': name,
                'phone': phone,
                'email': email,
                'address': address
            })
            print('Contact added successfully')
        else:
            print('Invalid email.')

    def search_contact():
        name_to_search = input('Search by name: ')
        found = False
        for contact in contacts:
            if name_to_search.lower() in contact['name'].lower():
                print(f"Found: {contact['name']} | Phone: {contact['phone']} | Email: {contact['email']} | Address: {contact['address']}")
                found = True
        if not found:
            print("No contact found with that name.")

    def display_contacts():
        print('=== All Contacts ===')
        for contact in contacts:
            print(f"{contact['name']} | Phone: {contact['phone']} | Email: {contact['email']} | Address: {contact['address']}")

    def edit_contact():
        name_to_edit = input('Enter name to edit: ')
        editable = False
        for contact in contacts:
            if name_to_edit.lower() in contact['name'].lower():
                print(f"Current details: {contact['name']} | Phone: {contact['phone']} | Email: {contact['email']} | Address: {contact['address']}")
                editable = True
                
                new_name = input('Enter new name (or press Enter to skip): ')
                if new_name:
                    contact['name'] = new_name
                
                new_phone_input = input('Enter new phone (or press Enter to skip): ')
                if new_phone_input:
                    try:
                        contact['phone'] = int(new_phone_input)
                    except ValueError:
                        print('Invalid phone.')
                
                new_email_input = input('Enter new email (or press Enter to skip): ')
                if new_email_input:
                    if "@" in new_email_input:
                        contact['email'] = new_email_input
                    else:
                        print('Invalid email.')
                
                new_address = input('Enter new address (or press Enter to skip): ')
                if new_address:
                    contact['address'] = new_address
        
        if editable:
            print("Contact updated successfully!")
        if not editable:
            print("No contact found with that name.")

    def delete_contact():
        nonlocal contacts  # ← Add this line
        name_to_delete = input('Enter name to delete: ')
        old_length = len(contacts)
        contacts = [c for c in contacts if not (name_to_delete.lower() in c['name'].lower())]
        new_length = len(contacts)
        
        if old_length > new_length:
            print('Contact deleted')
        else:
            print('No contact found with that name.')
            
    while True:
        print('1. Add Contact\n2. Search Contact\n3. Display All Contacts\n4. Edit Contact\n5. Delete Contact\n6. Quit')
        try:
            choice = int(input('Chooose an option: '))
        except ValueError:
            print('Please enter a valid number.\n')
            continue
        if choice == 6:
            return
        if choice not in [1, 2, 3, 4, 5]:
            print('Not a valid choice. Try again.\n')
            continue
        if choice == 1:
            add_contact()
        if choice == 2:
            search_contact()
        if choice == 3:
            display_contacts()
        if choice == 4:
            edit_contact()
        if choice == 5:
            delete_contact()
contact_book()