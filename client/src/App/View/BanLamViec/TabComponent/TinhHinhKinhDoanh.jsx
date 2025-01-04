import React from "react";
import { RevenueChart } from "./Component/RevenueChart";

export const TinhHinhKinhDoanh = () => {
  return (
    <div className="bg-gray-500 min-h-screen p-6">
      <div className="flex flex-wrap gap-4">
        {/* Biểu đồ 1 */}
        <div className="bg-white shadow-md p-4 rounded-lg flex-1 min-w-[300px]">
          <RevenueChart />
        </div>
      </div>
    </div>
  );
};

export default TinhHinhKinhDoanh;
