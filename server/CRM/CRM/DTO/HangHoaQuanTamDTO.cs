namespace CRM.DTO
{
    public class HangHoaQuanTamDTO
    {
        public Guid Id { get; set; }
        public string? MaHangHoaId { get; set; }
        public Guid? KhachHangTiemNangId { get; set; }
        public string? KhachHangId { get; set; }
        public string? CoHoiId { get; set; }
        public string? HoaDonId { get; set; }
        public int? SoLuong { get; set; }
        public int? ThueSuat { get; set; }
        public decimal? TienThue { get; set; }
        public decimal? ThanhTien { get; set; }
        public decimal? TongTien { get; set; }
    }
}
