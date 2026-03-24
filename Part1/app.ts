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

    (document.getElementById('itemId') as HTMLInputElement).value = '';
    (document.getElementById('itemName') as HTMLInputElement).value = '';
    (document.getElementById('price') as HTMLInputElement).value = '';
    (document.getElementById('quantity') as HTMLInputElement).value = '';
    (document.getElementById('supplierName') as HTMLInputElement).value = '';
    (document.getElementById('stockStatus') as HTMLSelectElement).value = 'In Stock';
    (document.getElementById('popularItem') as HTMLSelectElement).value = 'No';
    (document.getElementById('comment') as HTMLTextAreaElement).value = '';

    displayInventoryList();
});
}

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
        const term = (document.getElementById('searchInput') as HTMLInputElement).value.toLowerCase();
        const filtered = inventory.filter(i => i.itemName.toLowerCase().includes(term));
        renderTable(filtered); // Vi bruger en hjælpefunktion til at tegne
        });
    }
};

function displayInventoryList() {
    renderTable(inventory);
}

function renderTable(items: InventoryItem[]) {
    const output = document.getElementById('inventoryOutput')!;
    // Check if the list is empty, no search results, or no items at all
    if (items.length === 0) {
        output.innerHTML = "<p>No items found.</p>";
        return;
    }
    
    let html = "<table border='1'><tr><th>ID</th><th>Name</th><th>Category</th><th>Qty</th><th>Price</th><th>Actions</th></tr>";
    
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
            <td><button onclick="alert('Update logic here')">Update</button></td>
        </tr>`;
    });
    html += "</table>";
    output.innerHTML = html;
}
