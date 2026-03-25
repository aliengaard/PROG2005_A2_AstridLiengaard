/* Author: Astrid Liengaard Nielsen 
   Student ID: 25037591
   Assessment 2: Part 1 */ 

// Interface for Inventory Items 
interface InventoryItem {
    itemId: string;
    itemName: string;
    category: 'Electronics' | 'Furniture' | 'Clothing' | 'Tools' | 'Miscellaneous';
    quantity: number;
    price: number;
    supplierName: string;
    stockStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
    popularItem: 'Yes' | 'No';
    comments: string;
}

// Array to hold inventory items 
let inventory: InventoryItem[] = [];

// Logic adding a new item 
window.onload = () => {
    const addBtn = document.getElementById('addBtn') as HTMLButtonElement;
    const searchBtn = document.getElementById('searchBtn') as HTMLButtonElement;
    const saveUpdateBtn = document.getElementById('saveUpdateBtn');

// Event listener for the Add button
if(addBtn){
addBtn.addEventListener('click', () => {
    // Get values from fields
    const idValue = (document.getElementById('itemId') as HTMLInputElement).value;
    const nameValue = (document.getElementById('itemName') as HTMLInputElement).value;
    const priceValue = (document.getElementById('price') as HTMLInputElement).value;
    const quantityValue = (document.getElementById('quantity') as HTMLInputElement).value;
    const supplierValue = (document.getElementById('supplierName') as HTMLInputElement).value;
    const categoryValue = (document.getElementById('category') as HTMLSelectElement).value as InventoryItem['category'];
    const statusValue = (document.getElementById('stockStatus') as HTMLSelectElement).value as InventoryItem['stockStatus'];
    const popularValue = (document.getElementById('popularItem') as HTMLSelectElement).value as InventoryItem['popularItem'];
    const commentsValue = (document.getElementById('comment') as HTMLTextAreaElement).value;

    // Validation: Check if ID is unique
    if (inventory.some(item => item.itemId === idValue)) {
        document.getElementById('feedbackDisplay')!.innerHTML = 
            "<p style='color: red;'>Error: ID must be unique</p>";
        return;
    }

    // Validation: Check if all required fields are filled (everything except comments)
    if (!idValue || !nameValue || !priceValue || !quantityValue || !supplierValue || !statusValue || !popularValue) {
        document.getElementById('feedbackDisplay')!.innerHTML = 
            "<p style='color: red;'>Error: All fields must be filled</p>";
        return;
    }

    const newItem: InventoryItem = {
        itemId: idValue,
        itemName: nameValue,
        category: categoryValue,
        quantity: Number(quantityValue),
        price: Number(priceValue),
        supplierName: supplierValue,
        stockStatus: statusValue,
        popularItem: popularValue,
        comments: commentsValue
    };

    inventory.push(newItem);

    // Feedback message to the user
    document.getElementById('feedbackDisplay')!.innerHTML = 
        `<p style='color: green;'>Added: ${nameValue}</p>`;
    
    // Clear form fields after adding, so that new items can be added 

    clearFields();
    displayInventoryList();
});
}

// Event listener for the update button
if (saveUpdateBtn) {
    saveUpdateBtn.addEventListener('click', () => {
        const idValue = (document.getElementById('itemId') as HTMLInputElement).value;
        
        // Finding the index of the item being updated in the inventory array
        const index = inventory.findIndex(item => item.itemId === idValue);

        if (index !== -1) {
            // Updating values in inventory array
            inventory[index] = {
                itemId: idValue,
                itemName: (document.getElementById('itemName') as HTMLInputElement).value,
                price: Number((document.getElementById('price') as HTMLInputElement).value),
                quantity: Number((document.getElementById('quantity') as HTMLInputElement).value),
                category: (document.getElementById('category') as HTMLSelectElement).value as InventoryItem['category'],
                supplierName: (document.getElementById('supplierName') as HTMLInputElement).value,
                stockStatus: (document.getElementById('stockStatus') as HTMLSelectElement).value as InventoryItem['stockStatus'],
                popularItem: (document.getElementById('popularItem') as HTMLSelectElement).value as InventoryItem['popularItem'],
                comments: (document.getElementById('comment') as HTMLTextAreaElement).value
            };

            // 1. Opdater tabellen så vi kan se ændringen
            displayInventoryList();
            
            // 2. Skift knapperne tilbage til "Normal mode"
            saveUpdateBtn.style.display = 'none';
            document.getElementById('addBtn')!.style.display = 'inline-block';
            
            // 3. Gør ID-feltet skrivbart igen og tøm felterne
            (document.getElementById('itemId') as HTMLInputElement).readOnly = false;
            clearFields(); 

            document.getElementById('feedbackDisplay')!.innerHTML = "<p style='color: green;'>Item updated!</p>";
        }
    });
}
// Event listener for the search button
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
        const term = (document.getElementById('searchInput') as HTMLInputElement).value.toLowerCase();
        const filtered = inventory.filter(i => i.itemName.toLowerCase().includes(term));
        renderTable(filtered); // Vi bruger en hjælpefunktion til at tegne
        });
    }
};

// Function for deleting an item from the list
function deleteItem(id: string) {
    inventory = inventory.filter(item => item.itemId !== id);
    displayInventoryList();
    document.getElementById('feedbackDisplay')!.innerHTML = "<p style='color: orange;'>Item deleted.</p>";
}

// Function for preparing an item for an update (filling the fields with the existing data, making it editable)
function prepareUpdate(id: string) {
    const item = inventory.find(i => i.itemId === id);
    if (item) {
        (document.getElementById('itemId') as HTMLInputElement).value = item.itemId;
        (document.getElementById('itemName') as HTMLInputElement).value = item.itemName;
        (document.getElementById('price') as HTMLInputElement).value = item.price.toString();
        (document.getElementById('quantity') as HTMLInputElement).value = item.quantity.toString();
        (document.getElementById('supplierName') as HTMLInputElement).value = item.supplierName;
        (document.getElementById('comment') as HTMLTextAreaElement).value = item.comments;
        
        // Changing from add button to save update button
        document.getElementById('addBtn')!.style.display = 'none';
        document.getElementById('saveUpdateBtn')!.style.display = 'inline-block';

        document.getElementById('feedbackDisplay')!.innerHTML = "<p style='color: blue;'>Editing... Click 'Save changes' to save changes.</p>";
    }
}

function displayInventoryList() {
    renderTable(inventory);
}

function clearFields() {
    (document.getElementById('itemId') as HTMLInputElement).value = "";
    (document.getElementById('itemName') as HTMLInputElement).value = "";
    (document.getElementById('price') as HTMLInputElement).value = "";
    (document.getElementById('quantity') as HTMLInputElement).value = "";
    (document.getElementById('supplierName') as HTMLInputElement).value = "";
    (document.getElementById('comment') as HTMLTextAreaElement).value = "";
}

function renderTable(items: InventoryItem[]) {
    const output = document.getElementById('inventoryOutput')!;
    // Check if the list is empty, no search results, or no items at all
    if (items.length === 0) {
        output.innerHTML = "<p>No items found.</p>";
        return;
    }
    
    let html = `
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Supplier</th>
                <th>Status</th>
                <th>Popular</th>
                <th>Comments</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>`;
    
    items.forEach(item => {
        html += `<tr>
            <td>${item.itemId}</td>
            <td>${item.itemName}</td>
            <td>${item.category}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            <td>${item.supplierName}</td>
            <td>${item.stockStatus}</td>
            <td>${item.popularItem}</td>
            <td>${item.comments}</td>
            <td>
                <button onclick="prepareUpdate('${item.itemId}')">Update</button>
                <button onclick="deleteItem('${item.itemId}')">Delete</button>
            </td>
        </tr>`;
    });
    html += "</tbody></table>";
    output.innerHTML = html;
}

// Making the delete and update functions available globally so that they can be called from the HTML buttons
(window as any).deleteItem = deleteItem;
(window as any).prepareUpdate = prepareUpdate;
