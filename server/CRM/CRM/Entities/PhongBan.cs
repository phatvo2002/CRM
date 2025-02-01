namespace CRM.Entities
{
    public partial class PhongBan
    {
        public Guid Id { get; set; }
        public int SoThuTu { get; set; }

        public string? MaQuanLy { get; set; }

        public string? TenPhongBan { get; set; }
        public string? MoTa { get; set; }

        public bool? IsActive { get; set; }

        public virtual ICollection<Nguoidung> Nguoidung { get; set;} = new List<Nguoidung>();

        public virtual ICollection<KhachHangTiemNang> KhachHangTiemNangs { get; set; } = new List<KhachHangTiemNang>();
        public virtual ICollection<KhachHangMucTieu> KhachHangMucTieus { get; set; } = new List<KhachHangMucTieu>();
        public virtual ICollection<CoHoi> CoHois { get; set; } = new List<CoHoi>();
        public virtual ICollection<BaoGia> BaoGias { get; set; } = new List<BaoGia>();
        public virtual ICollection<LienHe> LienHes { get; set; } = new List<LienHe>();
        public virtual ICollection<CuocGoi> CuocGois { get; set; }  = new List<CuocGoi>();
        public virtual ICollection<LichHen> LichHens { get; set; } = new List<LichHen>();
        public virtual ICollection<NhiemVu> NhiemVus { get; set; } = new List<NhiemVu>();
    }
}
