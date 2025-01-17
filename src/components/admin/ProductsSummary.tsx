import { Package, DollarSign, AlertCircle, Archive } from 'lucide-react';
import SummaryCard from './SummaryCard';

interface ProductsSummaryProps {
  stats: {
    totalProducts: number;
    totalChange: number;
    avgPrice: number;
    priceChange: number;
    lowStock: number;
    lowStockChange: number;
    outOfStock: number;
    outOfStockChange: number;
  };
}

export default function ProductsSummary({ stats }: ProductsSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <SummaryCard
        title="Total Products"
        value={stats.totalProducts}
        trend={stats.totalChange}
        icon={Package}
        trendLabel="vs last month"
      />
      <SummaryCard
        title="Average Price"
        value={stats.avgPrice}
        trend={stats.priceChange}
        icon={DollarSign}
        trendLabel="vs last month"
        isMonetary
      />
      <SummaryCard
        title="Low Stock"
        value={stats.lowStock}
        trend={stats.lowStockChange}
        icon={AlertCircle}
        trendLabel="vs last month"
      />
      <SummaryCard
        title="Out of Stock"
        value={stats.outOfStock}
        trend={stats.outOfStockChange}
        icon={Archive}
        trendLabel="vs last month"
      />
    </div>
  );
}