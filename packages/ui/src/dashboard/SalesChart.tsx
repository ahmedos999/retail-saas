import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface SalesDataPoint {
  date: string;
  sales: number;
}

interface SalesChartProps {
  data: SalesDataPoint[];
  title?: string;
}

export const SalesChart = ({
  data,
  title = "Sales Over Time",
}: SalesChartProps) => {
  const totalSales = data.reduce((acc, point) => acc + point.sales, 0);
  return (
    <div className="p-4 rounded-md bg-white box-shadow">
      <h2 className="font-bold mb-2">{title}</h2>
      <h4 className="text-lg font-bold mb-4">
        ${totalSales.toLocaleString()}{" "}
        <span className="text-xs font-normal text-green-500">
          12% ↑ <span className="text-gray-500">from last month</span>
        </span>
      </h4>
      <ResponsiveContainer width="100%" height={340}>
        <AreaChart
          data={data}
          margin={{ top: 4, right: 16, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#e23c33" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#feebea" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
            dy={8}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#6b7280" }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${v.toLocaleString()}`}
            width={72}
          />
          <Tooltip
            contentStyle={{
              borderRadius: "0.5rem",
              border: "1px solid #e5e7eb",
              fontSize: "0.875rem",
            }}
            formatter={(value: number) => [
              `$${value.toLocaleString()}`,
              "Sales",
            ]}
          />
          <Area
            type="monotone"
            dataKey="sales"
            stroke="#e23c33"
            strokeWidth={2}
            fill="url(#salesGradient)"
            dot={{ r: 4, fill: "#e23c33", strokeWidth: 0 }}
            activeDot={{ r: 5, fill: "#e23c33", strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
