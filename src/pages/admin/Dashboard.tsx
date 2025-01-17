import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  ShoppingBag,
  Package,
  Download
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { collection, getDocs, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import SummarySection from '../../components/admin/SummarySection';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

export default function Dashboard() {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<any[]>([]);
  const [summaryStats, setSummaryStats] = useState({
    revenue: 0,
    revenueChange: 0,
    orders: 0,
    ordersChange: 0,
    customers: 0,
    customersChange: 0,
    products: 0,
    productsChange: 0
  });

  const downloadReport = () => {
    // TODO: Implement report download
    console.log('Downloading report...');
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Calculate period dates
        const now = new Date();
        const currentPeriodStart = new Date();
        const previousPeriodStart = new Date();
        
        if (timeframe === 'week') {
          currentPeriodStart.setDate(now.getDate() - 7);
          previousPeriodStart.setDate(currentPeriodStart.getDate() - 7);
        } else if (timeframe === 'month') {
          currentPeriodStart.setDate(now.getDate() - 30);
          previousPeriodStart.setDate(currentPeriodStart.getDate() - 30);
        } else {
          currentPeriodStart.setDate(now.getDate() - 365);
          previousPeriodStart.setDate(currentPeriodStart.getDate() - 365);
        }

        // Fetch current period orders
        const currentPeriodQuery = query(
          collection(db, 'orders'),
          where('createdAt', '>=', Timestamp.fromDate(currentPeriodStart)),
          where('createdAt', '<=', Timestamp.fromDate(now))
        );
        const currentPeriodSnapshot = await getDocs(currentPeriodQuery);
        const currentOrders = currentPeriodSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setOrders(currentOrders);

        // Fetch previous period orders
        const previousPeriodQuery = query(
          collection(db, 'orders'),
          where('createdAt', '>=', Timestamp.fromDate(previousPeriodStart)),
          where('createdAt', '<', Timestamp.fromDate(currentPeriodStart))
        );
        const previousPeriodSnapshot = await getDocs(previousPeriodQuery);
        const previousPeriodOrders = previousPeriodSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Calculate metrics
        const currentRevenue = currentOrders.reduce((sum, order) => sum + order.totalAmount, 0);
        const previousRevenue = previousPeriodOrders.reduce((sum, order) => sum + order.totalAmount, 0);
        const revenueChange = previousRevenue === 0 ? 100 : Math.round(((currentRevenue - previousRevenue) / previousRevenue) * 100);

        const ordersChange = previousPeriodOrders.length === 0 ? 100 : 
          Math.round(((currentOrders.length - previousPeriodOrders.length) / previousPeriodOrders.length) * 100);

        // Calculate product metrics
        const currentProducts = currentOrders.reduce((sum, order) => 
          sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
        );
        const previousProducts = previousPeriodOrders.reduce((sum, order) => 
          sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
        );
        const productsChange = previousProducts === 0 ? 100 : 
          Math.round(((currentProducts - previousProducts) / previousProducts) * 100);

        // Get customer metrics
        const customersQuery = query(collection(db, 'customers'));
        const customersSnapshot = await getDocs(customersQuery);
        const previousCustomersQuery = query(
          collection(db, 'customers'),
          where('createdAt', '<', Timestamp.fromDate(currentPeriodStart))
        );
        const previousCustomersSnapshot = await getDocs(previousCustomersQuery);
        const customersChange = previousCustomersSnapshot.docs.length === 0 ? 100 :
          Math.round(((customersSnapshot.docs.length - previousCustomersSnapshot.docs.length) / previousCustomersSnapshot.docs.length) * 100);

        setSummaryStats({
          revenue: currentRevenue,
          revenueChange,
          orders: currentOrders.length,
          ordersChange,
          customers: customersSnapshot.docs.length,
          customersChange,
          products: currentProducts,
          productsChange
        });

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [timeframe]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex space-x-4">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value as 'week' | 'month' | 'year')}
            className="border border-gray-300 rounded-[2deg] px-4 py-2"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="year">Last 12 Months</option>
          </select>
          <button 
            onClick={downloadReport}
            className="btn btn-primary flex items-center gap-2"
          >
            <Download className="h-5 w-5" />
            Download Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <SummarySection stats={summaryStats} />

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-[2deg] shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Revenue Overview</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64">
            <Bar
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                  {
                    label: 'Revenue',
                    data: [12000, 19000, 15000, 25000, 22000, 30000],
                    backgroundColor: 'rgba(14, 165, 233, 0.5)',
                    borderColor: 'rgb(14, 165, 233)',
                    borderWidth: 1
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2deg] shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Sales Trends</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64">
            <Line
              data={{
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                  {
                    label: 'Sales',
                    data: [65, 59, 80, 81, 56, 55],
                    fill: false,
                    borderColor: 'rgb(14, 165, 233)',
                    tension: 0.1
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-[2deg] shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-6">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <Package className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New order #{order.id.slice(0, 8)}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt.seconds * 1000).toLocaleString()}
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  KES {order.totalAmount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}