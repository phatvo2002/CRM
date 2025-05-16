namespace CRM.Modal
{
    public class NhiemVuModal
    {
        public Guid Id { get; set; }
        public string? TieuDe { get; set; }
        public string? MoTa { get; set; }
        public DateTime? HanHoanThanh { get; set; }
        public Guid? KhachHangTiemNangId { get; set; }
        public string? KhachHangId { get; set; }
        public string? CoHoiId { get; set; }
        public Guid MucDoUuTienId { get; set; }
        public Guid? TrangThaiThucHienId { get; set; }
        public Guid NguoiDungId { get; set; }
    }
}
