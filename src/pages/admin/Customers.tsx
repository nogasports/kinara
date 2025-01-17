import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, where, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Customer } from '../../types/customer';
import { Users, Phone, Mail, MapPin, Search, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [filterValue, setFilterValue] = useState('all'); // all, active, inactive
  const [sortBy, setSortBy] = useState('recent'); // recent, orders, spent

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        let q = query(collection(db, 'customers'), orderBy('createdAt', 'desc'));

        // Apply filters
        if (filterValue === 'active') {
          q = query(q, where('lastOrderDate', '>=', Timestamp.fromDate(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000))));
        } else if (filterValue === 'inactive') {
          q = query(q, where('lastOrderDate', '<', Timestamp.fromDate(new Date(Date.now() - 90 * 24 * 60 * 60 * 1000))));
        }

        const snapshot = await getDocs(q);
        let customersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Customer[];

        // Apply sorting
        if (sortBy === 'orders') {
          customersData.sort((a, b) => b.totalOrders - a.totalOrders);
        } else if (sortBy === 'spent') {
          customersData.sort((a, b) => b.totalSpent - a.totalSpent);
        }

        setCustomers(customersData);
      } catch (err) {
        console.error('Error fetching customers:', err);
        setError('Failed to load customers');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [filterValue, sortBy]);

  const filteredCustomers = customers.filter(customer => {
    const searchString = `${customer.firstName} ${customer.lastName} ${customer.email} ${customer.phone}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  const getCustomerStatus = (customer: Customer) => {
    const lastOrder = customer.lastOrderDate ? new Date(customer.lastOrderDate.seconds * 1000) : null;
    const daysSinceLastOrder = lastOrder ? Math.floor((Date.now() - lastOrder.getTime()) / (1000 * 60 * 60 * 24)) : null;

    if (!lastOrder) return { label: 'New', color: 'bg-blue-100 text-blue-800' };
    if (daysSinceLastOrder! <= 30) return { label: 'Active', color: 'bg-green-100 text-green-800' };
    if (daysSinceLastOrder! <= 90) return { label: 'Recent', color: 'bg-yellow-100 text-yellow-800' };
    return { label: 'Inactive', color: 'bg-red-100 text-red-800' };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 py-8">{error}</div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customers</h1>
        
        {/* Stats Cards */}
        <div className="flex space-x-4">
          <div className="bg-white p-4 rounded-[2deg] shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Total Customers</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                12%
              </span>
            </div>
            <p className="text-2xl font-bold">{customers.length}</p>
          </div>
          
          <div className="bg-white p-4 rounded-[2deg] shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Active Customers</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                8%
              </span>
            </div>
            <p className="text-2xl font-bold">
              {customers.filter(c => getCustomerStatus(c).label === 'Active').length}
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-[2deg] shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Avg. Order Value</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                3%
              </span>
            </div>
            <p className="text-2xl font-bold">
              KES {Math.round(customers.reduce((acc, c) => acc + (c.totalSpent / Math.max(c.totalOrders, 1)), 0) / customers.length).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-[2deg] shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-[2deg] focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-4">
            <select
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="border border-gray-300 rounded-[2deg] px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Customers</option>
              <option value="active">Active (Last 90 days)</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-[2deg] px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="recent">Most Recent</option>
              <option value="orders">Most Orders</option>
              <option value="spent">Highest Spent</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-[2deg] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => {
                const status = getCustomerStatus(customer);
                return (
                  <tr key={customer.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {customer.firstName} {customer.lastName}
                          </div>
                          <div className="text-sm text-gray-500">
                            Customer since {new Date(customer.createdAt.seconds * 1000).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Mail className="h-4 w-4 mr-1" />
                        {customer.email || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center mt-1">
                        <Phone className="h-4 w-4 mr-1" />
                        {customer.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.color}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{customer.totalOrders} orders</div>
                      <div className="text-sm text-gray-500">
                        Last order: {customer.lastOrderDate ? new Date(customer.lastOrderDate.seconds * 1000).toLocaleDateString() : 'Never'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        KES {customer.totalSpent.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        Avg: KES {Math.round(customer.totalSpent / Math.max(customer.totalOrders, 1)).toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Details Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[2deg] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Customer Details</h2>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Customer Info */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold">
                      {selectedCustomer.firstName} {selectedCustomer.lastName}
                    </h3>
                    <p className="text-gray-500">
                      Customer since {new Date(selectedCustomer.createdAt.seconds * 1000).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Contact Information</p>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        {selectedCustomer.email || 'N/A'}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-400 mr-2" />
                        {selectedCustomer.phone}
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Default Address</p>
                    <div className="mt-2">
                      {selectedCustomer.addresses?.find(addr => addr.isDefault) ? (
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-1" />
                          <div>
                            <p>{selectedCustomer.addresses.find(addr => addr.isDefault)?.street}</p>
                            <p className="text-gray-500">
                              {selectedCustomer.addresses.find(addr => addr.isDefault)?.city},
                              {selectedCustomer.addresses.find(addr => addr.isDefault)?.state}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-gray-500">No default address set</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-[2deg]">
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <p className="text-2xl font-bold">{selectedCustomer.totalOrders}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-[2deg]">
                  <p className="text-sm text-gray-500">Total Spent</p>
                  <p className="text-2xl font-bold">KES {selectedCustomer.totalSpent.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-[2deg]">
                  <p className="text-sm text-gray-500">Average Order Value</p>
                  <p className="text-2xl font-bold">
                    KES {Math.round(selectedCustomer.totalSpent / Math.max(selectedCustomer.totalOrders, 1)).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Recent Orders */}
              <div>
                <h4 className="font-semibold mb-4">Recent Orders</h4>
                <div className="space-y-4">
                  {/* This would be populated with actual order data */}
                  <p className="text-gray-500 text-center py-4">
                    Order history will be implemented in the next phase
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}