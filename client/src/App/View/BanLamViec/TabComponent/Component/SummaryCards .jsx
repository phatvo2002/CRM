export const SummaryCards = () => (
  <div className="grid grid-cols-3 gap-4 my-6">
    <div className="bg-white shadow-md p-6 rounded-lg text-center">
      <h2 className="text-lg font-bold">Doanh thu</h2>
      <p className="text-2xl text-green-500 font-bold">$120,000</p>
    </div>
    <div className="bg-white shadow-md p-6 rounded-lg text-center">
      <h2 className="text-lg font-bold">Khách hàng</h2>
      <p className="text-2xl font-bold">350</p>
    </div>
    <div className="bg-white shadow-md p-6 rounded-lg text-center">
      <h2 className="text-lg font-bold">Sản phẩm bán chạy</h2>
      <p className="text-2xl text-blue-500 font-bold">50 sản phẩm</p>
    </div>
  </div>
);
