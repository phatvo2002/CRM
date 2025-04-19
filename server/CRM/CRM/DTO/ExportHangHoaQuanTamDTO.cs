namespace CRM.DTO
{
    public class ExportHangHoaQuanTamDTO
    {
        public Guid Id { get; set; }
        public string? MaHangHoaId { get; set; }
        public string? TenHangHoa { get; set; }
        public Guid? KhachHangTiemNangId { get; set; }
        public string? KhachHangId { get; set; }
        public string? CoHoiId { get; set; }
        public string? HoaDonId { get; set; }
        public int? SoLuong { get; set; }
        public int? ThueSuat { get; set; }
        public string? DonGia { get; set; }
        public decimal? TienThue { get; set; }
        public decimal? ThanhTien { get; set; }
        public decimal? TongTien { get; set; }
        public string? ThanhTienFormat { get; set; }
        public string? TongTienFormat { get; set; }
        public decimal? ChiecKhauDonHang { get; set; }
        public string? TenDonViTinh { get; set; }
        public DonViTinhDTO? DonViTinh { get; set; }
    }
}
