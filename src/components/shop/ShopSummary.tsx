import { ShoppingBag, Package, Tag, Truck } from 'lucide-react';
import SummaryCard from '../admin/SummaryCard';

interface ShopSummaryProps {
  stats: {
    availableProducts: number;
    availableChange: number;
    newArrivals: number;
    newArrivalsChange: number;
    onSale: number;
    onSaleChange: number;
    shipping: number;
    shippingChange: number;
  };
}

export default function ShopSummary({ stats }: ShopSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <SummaryCard
        title="Available Products"
        value={stats.availableProducts}
        trend={stats.availableChange}
        icon={Package}
        trendLabel="vs last month"
      />
      <SummaryCard
        title="New Arrivals"
        value={stats.newArrivals}
        trend={stats.newArrivalsChange}
        icon={ShoppingBag}
        trendLabel="vs last month"
      />
      <SummaryCard
        title="On Sale"
        value={stats.onSale}
        trend={stats.onSaleChange}
        icon={Tag}
        trendLabel="vs last month"
      />
      <SummaryCard
        title="Shipping Time"
        value={`${stats.shipping} days`}
        trend={stats.shippingChange}
        icon={Truck}
        trendLabel="vs last month"
      />
    </div>
  );
}