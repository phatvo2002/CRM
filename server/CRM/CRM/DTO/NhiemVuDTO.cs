namespace CRM.DTO
{
    public class NhiemVuDTO
    {
        public Guid Id { get; set; }
        public string? TieuDe { get; set; }
        public string? MoTa { get; set; }
        public DateTime? CreateAt { get; set; }
        public DateTime? HanHoanThanh { get; set; }
        public Guid KhachHangTiemNangId { get; set; }
        public Guid MucDoUuTienId { get; set; }
        public Guid TrangThaiThucHienId { get; set; }
        public string? KhachHangMucTieuId { get; set; }
        public MucDoUuTienDTO? MucDoUuTien { get; set; }
        public TrangThaiThucHienDTO? TrangThaiThucHien { get; set; }
        public NguoiDungDTO? NguoiDung { get; set; }
    }
}
