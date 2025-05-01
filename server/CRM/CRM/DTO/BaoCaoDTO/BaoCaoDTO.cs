namespace CRM.DTO.BaoCaoDTO
{
    public class BaoCaoDTO
    {
        // Dữ liệu khách hàng tiềm năng 
        public int KhachHangTiemNangHienTai { get; set; }
        public int KhachHangTiemNangThangTruoc { get; set; }
        public decimal TiLeChuyenDoiKhachHangThangHienTai { get; set; }
        public decimal TiLeChuyenDoiKhachHangThangTruoc { get; set; }
        // dữ liêu báo cáo cơ hội hiện tại và tháng trước
        public int TongSoCoHoiHienTai { get; set; }
        public int TongSoCoHoiThangTruoc { get; set; }
        // dữ liệu báo giá hiện tại và tháng trước
        public int TongSoBaoGiaHienTai { get; set; }
        public int TongSoBaoGiaThangTruoc { get; set; }
        // dữ liệu đơn hàng tháng này và tháng trước 
        public int TongSoDonHangHienTai { get; set; }
        public int TongSoDonHangThangTruoc { get; set; }
        // dữ liệu doanh số tháng này và tháng trước
        public decimal TongDoanhThuHienTai { get; set; }
        public decimal TongDoanhThuThangTruoc { get; set; }
        // dữ liệu cuộc gọi
        public int TongSoCuocGoiHienTai { get; set; }
        public int TongSoCuocGoiThangTruoc { get; set; }
        // dữ liệu nhiệm vụ
        public int TongSoNhiemVuDaHoanThanhhienTai { get; set; }
        public int TongSoNhiemVuDaHoanThanhThangTruoc { get; set; }
        // dữ liệu lịch hẹn
        public int TongSoLichHenHienTai { get; set; }
        public int TongSoLichHenCuaThangTruoc { get; set; }
    }
}
