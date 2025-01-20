namespace CRM.Entities
{
    public class LichHen : BaseNguoiDung
    {
        public Guid Id { get; set; }
        public string? TieuDe { get; set; }
        public string? MoTa { get; set; }
        public DateTime? NgayBatDau { get; set; }
        public DateTime? NgayKetThuc { get; set; }
        public string? DiaDiem { get; set; }
        public Guid? TrangThaiThucHienId { get; set; }
        public Guid? KhachHangTiemNangId { get; set; }
        public string? KhachHangMucTieuId { get; set; }
        public virtual TrangThaiThucHien? TrangThaiThucHien { get; set; }
        public virtual KhachHangTiemNang? KhachHangTiemNang { get; set; }
        public virtual KhachHangMucTieu? KhachHangMucTieu { get; set; }

    }
}
