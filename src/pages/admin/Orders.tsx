import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Order } from '../../types/order';
import { Package, Truck, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import OrdersSummary from '../../components/admin/OrdersSummary';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [summaryStats, setSummaryStats] = useState({
    pendingOrders: 0,
    pendingChange: 0,
    avgProcessing: 0,
    processingChange: 0,
    completionRate: 0,
    completionChange: 0,
    cancelRate: 0,
    cancelChange: 0
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        const ordersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Order[];
        setOrders(ordersData);

        // Calculate order stats
        const pendingOrders = ordersData.filter(o => o.status === 'pending').length;
        const completedOrders = ordersData.filter(o => o.status === 'delivered').length;
        const cancelledOrders = ordersData.filter(o => o.status === 'cancelled').length;
        const completionRate = Math.round((completedOrders / ordersData.length) * 100);
        const cancelRate = Math.round((cancelledOrders / ordersData.length) * 100);

        setSummaryStats({
          pendingOrders,
          pendingChange: Math.floor(Math.random() * 20) - 10,
          avgProcessing: 24, // Example fixed value
          processingChange: Math.floor(Math.random() * 20) - 10,
          completionRate,
          completionChange: Math.floor(Math.random() * 20) - 10,
          cancelRate,
          cancelChange: Math.floor(Math.random() * 20) - 10
        });
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'processing':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        status: newStatus,
        updatedAt: new Date()
      });
      
      // Update local state
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus, updatedAt: new Date() }
          : order
      ));
    } catch (err) {
      console.error('Error updating order status:', err);
      // Handle error appropriately
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-8">{error}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="flex space-x-4">
          <button className="btn btn-primary">Export Orders</button>
        </div>
      </div>

      {/* Orders Summary */}
      <OrdersSummary stats={summaryStats} />

      <div className="bg-white rounded-[2deg] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">
                      #{order.id.slice(0, 8)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(order.createdAt.seconds * 1000).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.items.length} items
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {order.shippingAddress.street}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.shippingAddress.city}, {order.shippingAddress.country}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(order.status)}
                      <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      KES {order.totalAmount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.paymentStatus}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                      className="text-sm border border-gray-300 rounded-[2deg] px-2 py-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}