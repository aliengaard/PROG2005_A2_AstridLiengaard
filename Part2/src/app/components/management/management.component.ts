import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item } from '../../models/item.models';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css'
})
export class ManagementComponent implements OnInit {
  items: Item[] = [];
  feedbackMessage: string = '';
  isError: boolean = false;

  // Initialize the form object
  newItem: Item = this.getEmptyItem();

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.refreshList();
  }

  // Triggers the add logic in the service
  saveItem(): void {
    if (!this.newItem.itemName || !this.newItem.itemId) {
      this.setFeedback("Name and ID are required!", true);
      return;
    }

    const result = this.inventoryService.addItem(this.newItem);
    this.handleServiceResult(result);
    
    if (result.success) {
      this.resetForm();
    }
  }

  // Triggers the selective update logic in the service
  updateItem(): void {
    if (!this.newItem.itemName) {
      this.setFeedback("Please enter the Product Name to identify the item.", true);
      return;
    }

    const result = this.inventoryService.updateItem(this.newItem.itemName, this.newItem);
    this.handleServiceResult(result);
  }

  // Deletes an item after user confirmation
  deleteItem(name: string): void {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      this.inventoryService.deleteItem(name);
      this.refreshList();
      this.setFeedback(`Deleted ${name}`, false);
    }
  }

  private refreshList(): void {
    this.items = this.inventoryService.getItems();
  }

  private handleServiceResult(result: { success: boolean, message: string }): void {
    this.setFeedback(result.message, !result.success);
    if (result.success) {
      this.refreshList();
    }
  }

  private setFeedback(msg: string, err: boolean): void {
    this.feedbackMessage = msg;
    this.isError = err;
  }

  private resetForm(): void {
    this.newItem = this.getEmptyItem();
  }

  private getEmptyItem(): Item {
    return { 
      itemId: '', 
      itemName: '', 
      category: 'Electronics', 
      quantity: 0, 
      price: 0, 
      supplierName: '', 
      stockStatus: 'In Stock', 
      popularItem: 'No', 
      comments: '' 
    };
  }
}