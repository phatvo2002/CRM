namespace CRM.Entities
{
    public class KhachHangTiemNang : BaseNguoiDung
    {
        public Guid Id { get; set; }
        public string? TenKhachHang { get; set; }
        public string? SoDienThoaiDiDong {  get; set; }
        public string? SoDienThoaiCoQuan { get; set; }
        public string? ChucDanh {  get; set; }
        public string? SoZalo {  get; set; }
        public string? EmailCaNhan { get; set; }
        public string? EmailCoQuan { get; set; }
        public string? TenToChuc { get; set; }
        public string? MaSoThue { get; set; }
        public DateTime? NgayThanhLap { get; set; }
        public string? DiaChi {  get; set; }
        public string? ThongTinMoTa { get; set; }
        public int? MaPhongbanKhachHang { get; set; }
        public int? MaNguonGocKhachHang { get; set; }
        public int? MaLoaiTiemNang {  get; set; }
        public int? MaLoaiHinhNgheNghiep { get; set; }
        public int? MaNganhNghe {  get; set; }
        public int? MaLinhVuc {  get; set; }
        public int? MaDoanhThu {  get; set; }
        public bool? IsDungChung { get; set; }
        public bool? IsChuyenDoi { get; set; }
        public DateTime? DeleteAt { get; set; }
        public virtual PhongBanKhachHang? PhongBanKhachHang {get; set;}
        public virtual NguonGocKhachHang? NguonGocKhachHang{get; set;}
        public virtual LoaiTiemNang? LoaiTiemNang{get;set;}
        public virtual LoaiHinhNgheNghiep? LoaiHinhNgheNghiep{get; set;}
        public virtual NganhNghe? NganhNghe{get; set;}
        public virtual LinhVucNgheNghiep? LinhVucNgheNghiep { get; set;}
        public virtual DoanhThu? DoanhThu {get; set; }
        public virtual ICollection<CuocGoi> CuocGois { get; set;} = new List<CuocGoi>();
        public virtual ICollection<LichHen> LichHens { get; set;} = new List<LichHen>();
        public virtual ICollection<NhiemVu> NhiemVus { get; set; } = new List<NhiemVu>();
        public virtual ICollection<EmailDaGui> EmailDaGuis { get; set; } = new List<EmailDaGui>();
    }
}
