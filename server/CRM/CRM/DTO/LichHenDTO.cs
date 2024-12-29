namespace CRM.DTO
{
    public class LichHenDTO
    {
        public Guid Id { get; set; }
        public string? TieuDe { get; set; }
        public string? MoTa { get; set; }
        public DateTime? NgayBatDau { get; set; }
        public DateTime? NgayKetThuc { get; set; }
        public string? DiaDiem { get; set; }
        public Guid TrangThaiThucHienId { get; set; }
        public Guid KhachHangTiemNangId { get; set; }
        public DateTime? CreateAt { get; set; }
    }
}
