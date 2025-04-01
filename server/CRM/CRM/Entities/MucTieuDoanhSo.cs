using System.ComponentModel.DataAnnotations.Schema;

namespace CRM.Entities
{
    public class MucTieuDoanhSo : BaseNguoiDung
    {
        public Guid Id { get; set; }
        public string? TenKPI { get; set; }
        public string? MaQuanLy { get; set; }
        public string? TenPhongBan { get; set; }
        public DateTime? NgayBatDau { get; set; }
        public DateTime? NgayKetThuc { get; set; }
        public int? SoCuocGoi { get; set; }
        public int? SoCuocGoiThucTe { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public decimal? TileCuocGoiThucTe { get; private set; }
        public int? SoLichHen { get; set; }
        public int? SoLichHenThucTe { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public decimal? TileLichHenThucTe { get; private set; }
        public int? SoEmailTuongTacKhachHang { get; set; }
        public int? SoEmailTruongTacKhachHangThucTe { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public decimal? TileEmailTuongTacThucTe { get; private set; }
        public int? SoEmailBaoGia { get; set; }
        public int? SoEmailBaoGiaThucTe { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public decimal? TiLeEmailBaoGiaThucTe { get; private set; }
        public int? SoKhachHangTiemNangDaChuyenDoi { get; set; }
        public int? SoKhachHangTiemNangDaChuyenDoiThucTe { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public decimal? TiLeSoKhachHangTiemNangDaChuyenDoiThucTe { get; private set; }
        public double? DoanhSo { get; set; }
        public double? DoanhSoThucTe { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public decimal? TiLeDoanhSoThucTe { get; set; }
        public bool? IsDatMucTieu { get; set; }
        public int? MaTrangThaiKPI { get; set; }
        public decimal? TongTiLeThucTe { get; set; }
        public virtual TinhTrangKPI? TinhTrangKPI { get; set; }
        public ICollection<KPINhanVien> KPINhanViens { get; set; } = new List<KPINhanVien>();
    }
}
