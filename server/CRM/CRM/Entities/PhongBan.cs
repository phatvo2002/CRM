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
        public virtual ICollection<CuocGoi> CuocGois { get; set; }  = new List<CuocGoi>();
        public virtual ICollection<LichHen> LichHens { get; set; } = new List<LichHen>();
    }
}
