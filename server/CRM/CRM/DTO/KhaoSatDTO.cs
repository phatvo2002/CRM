namespace CRM.DTO
{
    public class KhaoSatDTO
    {
        public Guid Id { get; set; }
        public Guid? NhanVienId { get; set; }
        public Guid? DonHangId { get; set; }
        public string? KhachHangId { get; set; }
        public string? TenNhanVien { get; set; }
        public string? TenKhachHang { get; set; }
        public string? TraiNghiemMuaSam { get; set; }
        public string? TraiNghiemTuVan { get; set; }
        public string? TraiNghiemTiepTheo { get; set; }
        public int DanhGiaTongThe { get; set; }
        public string? YKienKhac { get; set; }
        public DateTime CreateAt { get; set; }
    }
}
