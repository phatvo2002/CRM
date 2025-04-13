namespace CRM.DTO
{
    public class MucTieuDoanhSoDTO
    {
        public Guid? Id { get; set; }
        public string? TenKPI { get; set; }
        public string? MaQuanLy { get; set; }
        public string? TenPhongBan { get; set; }
        public DateTime? NgayBatDau { get; set; }
        public DateTime? NgayKetThuc { get; set; }
        public int? SoCuocGoi { get; set; }
        public int? SoCuocGoiThucTe { get; set; }
        public decimal? TileCuocGoiThucTe { get; set; }
        public int? SoLichHen { get; set; }
        public int? SoLichHenThucTe { get; set; }
        public decimal? TileLichHenThucTe { get; set; }
        public int? SoEmailTuongTacKhachHang { get; set; }
        public int? SoEmailTruongTacKhachHangThucTe { get; set; }
        public decimal? TileEmailTuongTacThucTe { get; set; }
        public int? SoEmailBaoGia { get; set; }
        public int? SoEmailBaoGiaThucTe { get; set; }
        public decimal? TiLeEmailBaoGiaThucTe { get; set; }
        public int? SoKhachHangTiemNangDaChuyenDoi { get; set; }
        public int? SoKhachHangTiemNangDaChuyenDoiThucTe { get; set; }
        public decimal? TiLeSoKhachHangTiemNangDaChuyenDoiThucTe { get; set; }
        public double? DoanhSo { get; set; }
        public double? DoanhSoThucTe { get; set; }
        public decimal? TiLeDoanhSoThucTe { get; set; }
        public bool? IsDatMucTieu { get; set; }
        public int? MaTrangThaiKPI { get; set; }
        public decimal? TongTiLeThucTe { get; set; }
        public string? XepLoai { get; set; }
        public string? Color { get; set; }
        public List<KPINhanVienDTO>? KPINhanViens { get; set; }
        public NguoiDungDTO? NguoiDung { get; set; }
        public PhongBanDTO? PhongBan { get; set; }
    }
}
