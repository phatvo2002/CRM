namespace CRM.Entities
{
    public class KPINhanVien : BaseNguoiDung
    {
        public Guid Id { get; set; }
        public string? TenNhanVien { get; set; }
        public DateTime NgayBatDau { get; set; }
        public DateTime NgayKetThuc { get; set; }
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
        public string? GhiChu { get; set; }
        public Guid? MaMucTieuDoanhSo { get; set; }
        public decimal? TongTiLeThucTe { get; set; }
        public virtual TinhTrangKPI? TinhTrangKPI { get; set; }
        public virtual MucTieuDoanhSo? MucTieuDoanhSo { get; set; }

    }
}
