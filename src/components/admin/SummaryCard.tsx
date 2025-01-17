import { ArrowUpRight, ArrowDownRight, DivideIcon as LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string | number;
  trend: number;
  icon: LucideIcon;
  trendLabel?: string;
  isMonetary?: boolean;
}

export default function SummaryCard({ 
  title, 
  value, 
  trend, 
  icon: Icon,
  trendLabel,
  isMonetary = false 
}: SummaryCardProps) {
  const isPositive = trend >= 0;
  const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;
  const formattedValue = isMonetary ? `KES ${value.toLocaleString()}` : value;

  return (
    <div className="bg-white p-6 rounded-[2deg] shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold">{formattedValue}</h3>
        </div>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${
          isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          <TrendIcon className="h-4 w-4 mr-1" />
          {Math.abs(trend)}%
          {trendLabel && <span className="ml-1 text-xs">({trendLabel})</span>}
        </span>
      </div>
      <Icon className="h-8 w-8 text-primary-600" />
    </div>
  );
}