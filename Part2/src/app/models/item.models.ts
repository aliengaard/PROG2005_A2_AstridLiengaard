// Model for an inventory item defining 
// the structure of the data used in the application
export interface Item {
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