import { Users, ShoppingBag, Package, DollarSign } from 'lucide-react';
import SummaryCard from './SummaryCard';

interface SummarySectionProps {
  stats: {
    revenue: number;
    revenueChange: number;
    orders: number;
    ordersChange: number;
    customers: number;
    customersChange: number;
    products: number;
    productsChange: number;
  };
}

export default function SummarySection({ stats }: SummarySectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <SummaryCard
        title="Total Revenue"
        value={stats.revenue}
        trend={stats.revenueChange}
        icon={DollarSign}
        trendLabel="vs last period"
        isMonetary
      />
      <SummaryCard
        title="Total Orders"
        value={stats.orders}
        trend={stats.ordersChange}
        icon={ShoppingBag}
        trendLabel="vs last period"
      />
      <SummaryCard
        title="Total Customers"
        value={stats.customers}
        trend={stats.customersChange}
        icon={Users}
        trendLabel="vs last period"
      />
      <SummaryCard
        title="Products Sold"
        value={stats.products}
        trend={stats.productsChange}
        icon={Package}
        trendLabel="vs last period"
      />
    </div>
  );
}