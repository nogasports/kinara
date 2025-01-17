export interface OrderItem {
  productId: string;
  quantity: number;
  price: number; // Price at time of purchase
  productName: string;
  productImage: string;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
  trackingNumber?: string;
  notes?: string;
}