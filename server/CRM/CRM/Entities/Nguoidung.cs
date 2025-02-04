namespace CRM.Entities
{
    public partial class Nguoidung
    {
        public Guid Id { get; set; }
        public string? HoVaDem { get; set; }
        public string? Ten { get; set; }
        public string? DiaChi { get; set; }
        public string? SoDienThoai { get; set; }
        public string? Email { get; set; }
        public string? DisplayName { get; set; } // mới
        public string? Password { get; set; } // mới
        public decimal? DoanhSoDuKien { get; set; }
        public decimal? DoanhSoThucTe { get; set; }
        public DateTime? NgayThuViec { get; set; }
        public DateTime? NgayBatDauLamViec { get; set; }
        public string? TaiKhoan { get; set; }
        public string? MatKhau { get; set; }
        public bool IsActive { get; set; }
        public bool CheckIsTruongPhong { get; set; }
        public byte[]? HinhAnh { get; set; } // mới
        public bool CheckIsGiamDoc { get; set; }
        public Guid? MaChucVu { get; set; }
        public virtual ChucVu? ChucVu { get; set; }
        public Guid? MaPhongBan { get; set; }
        public virtual PhongBan? PhongBan { get; set; }
        public int? MaTinhTrang { get; set; }
        public virtual TinhTrang? TinhTrang { get; set; }
        public virtual ICollection<KhachHangTiemNang> KhachHangTiemNangs { get; set; } = new List<KhachHangTiemNang>();
        public virtual ICollection<KhachHangMucTieu> KhachHangMucTieus { get; set; } = new List<KhachHangMucTieu>();
        public virtual ICollection<CoHoi> CoHois { get; set; } = new List<CoHoi>();
        public virtual ICollection<BaoGia> BaoGias { get; set; } = new List<BaoGia>();
        public virtual ICollection<CuocGoi> CuocGois { get; set; } = new List<CuocGoi>();
        public virtual ICollection<LichHen> LichHens { get; set; } = new List<LichHen>();
        public virtual ICollection<NhiemVu> NhiemVus { get; set; } = new List<NhiemVu>();
        public virtual ICollection<LienHe> LienHes { get; set; } = new List<LienHe>();
        public virtual ICollection<EmailDaGui> EmailDaGuis { get; set; } = new List<EmailDaGui>();
        public virtual ICollection<DonHang> DonHangs { get; set; } = new List<DonHang>();
    }
}
