import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const ProductChart = () => {
  const data = [
    { product: "Laptop", sales: 50 },
    { product: "Smartphone", sales: 80 },
    { product: "Tablet", sales: 30 },
    { product: "Tai nghe", sales: 40 },
  ];

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-lg font-bold mb-4">Sản phẩm bán chạy</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="product" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="sales" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
