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
    const updateBtn = document.getElementById('updateBtn');
    const searchBtn = document.getElementById('searchBtn');
    const showAllBtn = document.getElementById('showAllBtn');
    const showPopularBtn = document.getElementById('showPopularBtn');
    // Event listener for the Add button
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            // Get values from fields
            const idValue = document.getElementById('add_itemId').value;
            const nameValue = document.getElementById('add_itemName').value;
            const priceValue = document.getElementById('add_price').value;
            const quantityValue = document.getElementById('add_quantity').value;
            const supplierValue = document.getElementById('add_supplierName').value;
            const categoryValue = document.getElementById('add_category').value;
            const statusValue = document.getElementById('add_stockStatus').value;
            const popularValue = document.getElementById('add_popularItem').value;
            const commentsValue = document.getElementById('add_comment').value;
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
    // Event listener for updating
    if (updateBtn) {
        updateBtn.addEventListener('click', () => {
            const nameOnItem = document.getElementById('update_itemName').value;
            const item = inventory.find(i => i.itemName === nameOnItem);
            // Updating values in inventory array
            if (item) {
                // Get the new values 
                const newPrice = document.getElementById('update_price').value;
                const newQty = document.getElementById('update_quantity').value;
                const newSupp = document.getElementById('update_supplierName').value;
                const newComm = document.getElementById('update_comment').value;
                const newCat = document.getElementById('update_category').value;
                const newStat = document.getElementById('update_stockStatus').value;
                const newPop = document.getElementById('update_popularItem').value;
                // Only updating values, if the fields are not empty
                if (newPrice !== "")
                    item.price = Number(newPrice);
                if (newQty !== "")
                    item.quantity = Number(newQty);
                if (newSupp !== "")
                    item.supplierName = newSupp;
                if (newComm !== "")
                    item.comments = newComm;
                if (newCat !== "")
                    item.category = newCat;
                if (newStat !== "")
                    item.stockStatus = newStat;
                if (newPop !== "")
                    item.popularItem = newPop;
                displayInventoryList();
                const feedback = document.getElementById('feedbackDisplay');
                if (feedback) {
                    feedback.innerHTML = `<p style='color: green;'>Updated: ${nameOnItem}</p>`;
                }
                clearFields();
            }
            else {
                const feedback = document.getElementById('feedbackDisplay');
                if (feedback) {
                    feedback.innerHTML = `<p style='color: red;'>Error: Item '${nameOnItem}' not found.</p>`;
                }
            }
        });
    }
    // Event listener for the search button
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const term = document.getElementById('searchInput').value.toLowerCase();
            const filtered = inventory.filter(i => i.itemName.toLowerCase().includes(term));
            renderTable(filtered);
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
            document.getElementById('feedbackDisplay').innerHTML = "<p>Showing popular items</p>";
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
// Function for updating an item
function prepareUpdate(name) {
    const item = inventory.find(i => i.itemName === name);
    if (item) {
        document.getElementById('update_itemName').value = item.itemName;
        document.getElementById('update_price').value = item.price.toString();
        document.getElementById('update_quantity').value = item.quantity.toString();
        document.getElementById('update_category').value = item.category;
        document.getElementById('update_stockStatus').value = item.stockStatus;
        document.getElementById('update_popularItem').value = item.popularItem;
        document.getElementById('update_supplierName').value = item.supplierName;
        document.getElementById('update_comment').value = item.comments;
        document.getElementById('feedbackDisplay').innerHTML = "<p style='color: blue;'>Editing... Click 'Save changes' to save changes.</p>";
    }
}
function displayInventoryList() {
    localStorage.setItem('inventoryData', JSON.stringify(inventory));
    renderTable(inventory);
}
function clearFields() {
    // Empty Add-section
    document.getElementById('add_itemId').value = "";
    document.getElementById('add_itemName').value = "";
    document.getElementById('add_price').value = "";
    document.getElementById('add_quantity').value = "";
    document.getElementById('add_supplierName').value = "";
    document.getElementById('add_comment').value = "";
    // Empty Update-section
    document.getElementById('update_itemName').value = "";
    document.getElementById('update_price').value = "";
    document.getElementById('update_quantity').value = "";
    document.getElementById('update_supplierName').value = "";
    document.getElementById('update_comment').value = "";
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
