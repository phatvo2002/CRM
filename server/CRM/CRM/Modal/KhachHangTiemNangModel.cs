namespace CRM.Modal
{
    public class KhachHangTiemNangModel 
    {
        public Guid? Id { get; set; }
        public string? TenKhachHang { get; set; }
        public string? SoDienThoaiDiDong { get; set; } = null;
        public string? SoDienThoaiCoQuan { get; set; } = null;
        public string? ChucDanh { get; set; } = null;
        public string? SoZalo { get; set; }
        public string? EmailCaNhan { get; set; }
        public string? EmailCoQuan { get; set; }
        public string? TenToChuc { get; set; }
        public string? MaSoThue { get; set; }
        public DateTime? NgayThanhLap { get; set; }
        public string? DiaChi { get; set; }
        public string? ThongTinMoTa { get; set; }
        public int? MaPhongbanKhachHang { get; set; }
        public int? MaNguonGocKhachHang { get; set; }
        public int? MaLoaiTiemNang { get; set; }
        public int? MaLoaiHinhNgheNghiep { get; set; }
        public int? MaNganhNghe { get; set; }
        public int? MaLinhVuc { get; set; }
        public int? MaDoanhThu { get; set; }
        public bool? IsDungChung { get; set; }
        public Guid? NguoiDungId { get; set; }
        public Guid? PhongBanId { get; set; }
        public DateTime? CreateAt { get; set; }

        public bool? IsDeleted { get; set; }
    }
}
