export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addresses: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  }[];
  createdAt: Date;
  updatedAt: Date;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: Date;
}