namespace CRM.Modal
{
    public class KhachHangMucTieuModal : BaseModel
    {
        public string? Id { get; set; }
        public string? TenKhachHang { get; set; }
        public string? TenVietTat { get; set; }
        public string? MaSoThue { get; set; }
        public string? SoDienThoai { get; set; }
        public string? Email { get; set; }
        public string? TaiKhoanNganHang { get; set; }
        public string? Website { get; set; }
        public string? MoTa { get; set; }
        public bool? IsDungChung { get; set; }
        public bool? IsKhachHangCaNhan { get; set; }
        public bool? IsNhaPhanPhoi { get; set; }
        public string? ThongTinHoaDon { get; set; }
        public string? ThongTinGiaoHang { get; set; }
        public int? MaPhongbanKhachHang { get; set; }
        public int? MaNguonGocKhachHang { get; set; }
        public int? MaLoaiTiemNang { get; set; }
        public int? MaLoaiHinhNgheNghiep { get; set; }
        public int? MaNganhNghe { get; set; }
        public int? MaLinhVuc { get; set; }
        public int? MaDoanhThu { get; set; }
    }
}
