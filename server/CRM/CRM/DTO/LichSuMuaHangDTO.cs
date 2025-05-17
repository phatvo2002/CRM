namespace CRM.DTO
{
    public class LichSuMuaHangDTO
    {
        public string? TenDonHang { get; set; }
        public string? MoTaDonHang { get; set; }
        public DateTime? NgayDatHang { get; set; }
        public decimal GiaTriDonHang { get; set; }
        public decimal SoTienConPhaiThu { get; set; }
        public decimal ThucThuDonHang { get; set; }
        public DateTime? HanThanhToan { get; set; }
        public List<HangHoaQuanTamDTO>? HangHoaDTOs { get; set; }
    }
}
