import { ShoppingBag, Clock, TrendingUp, AlertTriangle } from 'lucide-react';
import SummaryCard from './SummaryCard';

interface OrdersSummaryProps {
  stats: {
    pendingOrders: number;
    pendingChange: number;
    avgProcessing: number;
    processingChange: number;
    completionRate: number;
    completionChange: number;
    cancelRate: number;
    cancelChange: number;
  };
}

export default function OrdersSummary({ stats }: OrdersSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <SummaryCard
        title="Pending Orders"
        value={stats.pendingOrders}
        trend={stats.pendingChange}
        icon={ShoppingBag}
        trendLabel="vs last month"
      />
      <SummaryCard
        title="Avg. Processing Time"
        value={`${stats.avgProcessing}h`}
        trend={stats.processingChange}
        icon={Clock}
        trendLabel="vs last month"
      />
      <SummaryCard
        title="Completion Rate"
        value={`${stats.completionRate}%`}
        trend={stats.completionChange}
        icon={TrendingUp}
        trendLabel="vs last month"
      />
      <SummaryCard
        title="Cancellation Rate"
        value={`${stats.cancelRate}%`}
        trend={stats.cancelChange}
        icon={AlertTriangle}
        trendLabel="vs last month"
      />
    </div>
  );
}