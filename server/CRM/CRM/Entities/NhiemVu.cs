namespace CRM.Entities
{
    public partial class NhiemVu : BaseNguoiDung
    {
        public Guid Id { get; set; }
        public string? TieuDe { get; set; }
        public string? MoTa { get; set; }
        public bool? IsThongBao { get; set; }
        public DateTime? HanHoanThanh { get; set; }
        public Guid KhachHangTiemNangId { get; set; }
        public Guid? MucDoUuTienId { get; set; }
        public Guid? TrangThaiThucHienId { get; set; }
        public string? KhachHangMucTieuId { get; set; }
        public virtual KhachHangTiemNang? KhachHangTiemNang { get; set; }
        public virtual KhachHangMucTieu? KhachHangMucTieu { get; set; }
        public virtual MucDoUuTien? MucDoUuTien { get; set; }
        public virtual TrangThaiThucHien? TrangThaiThucHien { get; set; }
    }
}
