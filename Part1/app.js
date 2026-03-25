/* Author: Astrid Liengaard Nielsen
   Student ID: 25037591
   Assessment 2: Part 1 */
// Array to hold inventory items 
let inventory = [];
// Logic adding a new item 
window.onload = () => {
    // Getting saved data from localStorage, if it exists
    const savedData = localStorage.getItem('inventoryData');
    if (savedData) {
        inventory = JSON.parse(savedData);
        displayInventoryList();
    }
    // Getting references to buttons
    const addBtn = document.getElementById('addBtn');
    const searchBtn = document.getElementById('searchBtn');
    const saveUpdateBtn = document.getElementById('saveUpdateBtn');
    const showAllBtn = document.getElementById('showAllBtn');
    const showPopularBtn = document.getElementById('showPopularBtn');
    // Event listener for the Add button
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            // Get values from fields
            const idValue = document.getElementById('itemId').value;
            const nameValue = document.getElementById('itemName').value;
            const priceValue = document.getElementById('price').value;
            const quantityValue = document.getElementById('quantity').value;
            const supplierValue = document.getElementById('supplierName').value;
            const categoryValue = document.getElementById('category').value;
            const statusValue = document.getElementById('stockStatus').value;
            const popularValue = document.getElementById('popularItem').value;
            const commentsValue = document.getElementById('comment').value;
            // Validation: Check if ID is unique
            if (inventory.some(item => item.itemId === idValue)) {
                document.getElementById('feedbackDisplay').innerHTML =
                    "<p style='color: red;'>Error: ID must be unique</p>";
                return;
            }
            // Validation: Check if all required fields are filled (everything except comments)
            if (!idValue || !nameValue || !priceValue || !quantityValue || !supplierValue || !statusValue || !popularValue) {
                document.getElementById('feedbackDisplay').innerHTML =
                    "<p style='color: red;'>Error: All fields must be filled</p>";
                return;
            }
            const newItem = {
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
            document.getElementById('feedbackDisplay').innerHTML =
                `<p style='color: green;'>Added: ${nameValue}</p>`;
            // Clear form fields after adding, so that new items can be added 
            clearFields();
            displayInventoryList();
        });
    }
    // Event listener for the update button
    if (saveUpdateBtn) {
        saveUpdateBtn.addEventListener('click', () => {
            const idValue = document.getElementById('itemId').value;
            // Finding the index of the item being updated in the inventory array
            const index = inventory.findIndex(item => item.itemId === idValue);
            if (index !== -1) {
                // Updating values in inventory array
                inventory[index] = {
                    itemId: idValue,
                    itemName: document.getElementById('itemName').value,
                    price: Number(document.getElementById('price').value),
                    quantity: Number(document.getElementById('quantity').value),
                    category: document.getElementById('category').value,
                    supplierName: document.getElementById('supplierName').value,
                    stockStatus: document.getElementById('stockStatus').value,
                    popularItem: document.getElementById('popularItem').value,
                    comments: document.getElementById('comment').value
                };
                // 1. Opdater tabellen så vi kan se ændringen
                displayInventoryList();
                // 2. Skift knapperne tilbage til "Normal mode"
                saveUpdateBtn.style.display = 'none';
                document.getElementById('addBtn').style.display = 'inline-block';
                // 3. Gør ID-feltet skrivbart igen og tøm felterne
                document.getElementById('itemId').readOnly = false;
                clearFields();
                document.getElementById('feedbackDisplay').innerHTML = "<p style='color: green;'>Item updated!</p>";
            }
        });
    }
    // Event listener for the search button
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const term = document.getElementById('searchInput').value.toLowerCase();
            const filtered = inventory.filter(i => i.itemName.toLowerCase().includes(term));
            renderTable(filtered); // Vi bruger en hjælpefunktion til at tegne
        });
    }
    // Event listener for the show all items button
    if (showAllBtn) {
        showAllBtn.addEventListener('click', () => {
            renderTable(inventory);
            document.getElementById('feedbackDisplay').innerHTML = "<p>Showing all items.</p>";
        });
    }
    // Event listener for the show popular items button
    if (showPopularBtn) {
        showPopularBtn.addEventListener('click', () => {
            const popular = inventory.filter(i => i.popularItem === 'Yes');
            renderTable(popular);
            document.getElementById('feedbackDisplay').innerHTML = "<p>Showing popular items ⭐</p>";
        });
    }
};
// Function for deleting an item from the list based on name
function deleteItem(itemName) {
    // Confirmation prompt
    const confirmDelete = confirm(`Are you sure you want to delete: ${itemName}?`);
    if (confirmDelete) {
        inventory = inventory.filter(item => item.itemName !== itemName);
        displayInventoryList();
        // InnerHTML feedback for the user
        const feedback = document.getElementById('feedbackDisplay');
        feedback.innerHTML = `<div style="color: orange;">Item <strong>${itemName}</strong> was successfully deleted.</div>`;
    }
}
// Function for preparing an item for an update (filling the fields with the existing data, making it editable)
function prepareUpdate(name) {
    const item = inventory.find(i => i.itemName === name);
    if (item) {
        document.getElementById('itemId').value = item.itemId;
        // ID is unique and should not be changed, so I make it read-only
        document.getElementById('itemId').readOnly = true;
        document.getElementById('itemName').value = item.itemName;
        document.getElementById('price').value = item.price.toString();
        document.getElementById('quantity').value = item.quantity.toString();
        document.getElementById('category').value = item.category;
        document.getElementById('stockStatus').value = item.stockStatus;
        document.getElementById('popularItem').value = item.popularItem;
        document.getElementById('supplierName').value = item.supplierName;
        document.getElementById('comment').value = item.comments;
        // Changing from add button to save update button
        document.getElementById('addBtn').style.display = 'none';
        document.getElementById('saveUpdateBtn').style.display = 'inline-block';
        document.getElementById('feedbackDisplay').innerHTML = "<p style='color: blue;'>Editing... Click 'Save changes' to save changes.</p>";
    }
}
function displayInventoryList() {
    localStorage.setItem('inventoryData', JSON.stringify(inventory));
    renderTable(inventory);
}
function clearFields() {
    document.getElementById('itemId').value = "";
    document.getElementById('itemName').value = "";
    document.getElementById('price').value = "";
    document.getElementById('quantity').value = "";
    document.getElementById('supplierName').value = "";
    document.getElementById('comment').value = "";
}
function renderTable(items) {
    const output = document.getElementById('inventoryOutput');
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
                <button onclick="prepareUpdate('${item.itemName}')">Update</button>
                <button onclick="deleteItem('${item.itemName}')">Delete</button>
            </td>
        </tr>`;
    });
    html += "</tbody></table>";
    output.innerHTML = html;
}
// Making the delete and update functions available globally so that they can be called from the HTML buttons
window.deleteItem = deleteItem;
window.prepareUpdate = prepareUpdate;
