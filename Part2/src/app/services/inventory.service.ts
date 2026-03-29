import { Injectable } from '@angular/core';
import { Item } from '../models/item.models';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private inventory: Item[] = [];

  constructor() {}

  // Retrieves the full list of inventory items
  getItems(): Item[] {
    return this.inventory;
  }

  // Adds a new item if the ID is unique
  addItem(newItem: Item): { success: boolean; message: string } {
    const exists = this.inventory.find(i => i.itemId === newItem.itemId);
    if (exists) {
      return { success: false, message: `Error: ID '${newItem.itemId}' is already in use.` };
    }
    
    // Use spread operator to store a copy of the object
    this.inventory.push({ ...newItem });
    return { success: true, message: `Successfully added ${newItem.itemName}!` };
  }

  // Updates an item found by name (selective update)
  updateItem(name: string, newData: Item): { success: boolean; message: string } {
    const index = this.inventory.findIndex(i => i.itemName.toLowerCase() === name.toLowerCase());

    if (index !== -1) {
      const oldItem = this.inventory[index];

      // Merge data: Use new value if provided, otherwise keep old
      this.inventory[index] = {
        ...oldItem,
        category: newData.category || oldItem.category,
        price: newData.price > 0 ? newData.price : oldItem.price,
        quantity: newData.quantity > 0 ? newData.quantity : oldItem.quantity,
        supplierName: newData.supplierName || oldItem.supplierName,
        stockStatus: newData.stockStatus || oldItem.stockStatus,
        popularItem: newData.popularItem || oldItem.popularItem,
        comments: newData.comments || oldItem.comments
      };

      return { success: true, message: `Updated fields for: ${oldItem.itemName}` };
    }
    return { success: false, message: `Could not find item: ${name}` };
  }

  // Removes an item from the array
  deleteItem(name: string): void {
    this.inventory = this.inventory.filter(i => i.itemName !== name);
  }
}