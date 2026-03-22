/* Author: Astrid Liengaard Nielsen 
   Student ID: 25037591
   Assessment 2: Part 1 */ 

/* Interface for Inventory Items */
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

/* Array to hold inventory items */
let inventory: InventoryItem[] = [];

/* Delete and Add buttons */ 

`<tr>
    <td>${InventoyItem.itemName}</td>
    <td>${item.price}</td>
    <td>
        <button onclick="handleUpdate('${item.itemId}')">Update</button>
        <button class="delete-btn" onclick="handleDelete('${item.itemId}')">Delete</button>
    </td>
</tr>`

