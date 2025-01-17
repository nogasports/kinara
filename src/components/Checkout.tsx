import { useState } from 'react';
import { X } from 'lucide-react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { CartItem } from '../types/cart';

interface CheckoutProps {
  cart: CartItem[];
  onClose: () => void;
  onComplete: () => void;
  total: number;
}

export default function Checkout({ cart, onClose, onComplete, total }: CheckoutProps) {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    mpesaNumber: '',
    location: '',
    orderNow: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Create customer record
      const customerRef = await addDoc(collection(db, 'customers'), {
        firstName: formData.name.split(' ')[0],
        lastName: formData.name.split(' ').slice(1).join(' '),
        phone: formData.phoneNumber,
        email: '', // Optional for website orders
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        totalOrders: 1,
        totalSpent: total,
        lastOrderDate: Timestamp.now()
      });

      // Create order
      const orderData = {
        customerId: customerRef.id,
        items: cart,
        totalAmount: total,
        status: 'pending',
        orderType: 'online',
        shippingAddress: {
          street: formData.location,
          city: 'Nairobi',
          state: 'Nairobi',
          country: 'Kenya',
          postalCode: ''
        },
        paymentStatus: 'pending',
        paymentMethod: 'mpesa',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      };

      await addDoc(collection(db, 'orders'), orderData);

      // TODO: If orderNow is true, initiate M-Pesa payment here

      onComplete();
    } catch (err) {
      console.error('Error creating order:', err);
      alert('Failed to create order. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-[2deg] max-w-lg w-full">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">Checkout</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                name: e.target.value
              }))}
              className="mt-1 block w-full border border-gray-300 rounded-[2deg] shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={formData.phoneNumber}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                phoneNumber: e.target.value
              }))}
              className="mt-1 block w-full border border-gray-300 rounded-[2deg] shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              M-Pesa Number
            </label>
            <input
              type="tel"
              required
              value={formData.mpesaNumber}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                mpesaNumber: e.target.value
              }))}
              className="mt-1 block w-full border border-gray-300 rounded-[2deg] shadow-sm p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Delivery Location
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                location: e.target.value
              }))}
              className="mt 1 block w-full border border-gray-300 rounded-[2deg] shadow-sm p-2"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="orderNow"
              checked={formData.orderNow}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                orderNow: e.target.checked
              }))}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="orderNow" className="text-sm text-gray-700">
              Pay now with M-Pesa
            </label>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>KES {total.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              {formData.orderNow ? 'Pay Now' : 'Order Later'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}