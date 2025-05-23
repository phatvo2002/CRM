namespace CRM.Entities
{
    public partial class KhachHangMucTieu : BaseNguoiDung
    {
        public string? Id { get; set; }
        public string? TenKhachHang { get; set; }
        public string? TenVietTat { get; set; }
        public string? MaSoThue { get; set; }
        public string? SoDienThoai { get; set; }
        public string? Email { get; set; }
        public DateTime? NgayThanhLap { get; set; }
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
        public int? MaPhanLoaiKhachHang { get; set; }
        public DateTime? DeleteAt { get; set; }
        public DateTime? UpdateAt { get; set; }
        public virtual PhongBanKhachHang? PhongBanKhachHang { get; set; }
        public virtual NguonGocKhachHang? NguonGocKhachHang { get; set; }
        public virtual LoaiTiemNang? LoaiTiemNang { get; set; }
        public virtual LoaiHinhNgheNghiep? LoaiHinhNgheNghiep { get; set; }
        public virtual NganhNghe? NganhNghe { get; set; }
        public virtual LinhVucNgheNghiep? LinhVucNgheNghiep { get; set; }
        public virtual DoanhThu? DoanhThu { get; set; }
        public virtual PhanLoaiKhachHang? PhanLoaiKhachHang { get; set; }
        public virtual ICollection<CuocGoi> CuocGois { get; set; } = new List<CuocGoi>();
        public virtual ICollection<LichHen> LichHens { get; set; } = new List<LichHen>();
        public virtual ICollection<NhiemVu> NhiemVus { get; set; } = new List<NhiemVu>();
        public virtual ICollection<CoHoi> CoHois { get; set; } = new List<CoHoi>();
        public virtual ICollection<BaoGia> BaoGias { get; set; } = new List<BaoGia>();
        public virtual ICollection<EmailDaGui> EmailDaGuis { get; set; } = new List<EmailDaGui>();
        public virtual ICollection<DonHang> DonHangs { get; set; } = new List<DonHang>();
    }
}
