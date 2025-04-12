namespace CRM.DTO
{
    public class MailDaGuiDTO
    {
        public Guid Id { get; set; }
        public string? TieuDe { get; set; }
        public string? DiaChiGui { get; set; }
        public string? DiaChiNhan { get; set; }
        public Guid? KhachHangTiemNangId { get; set; }
        public string? KhachHangMucTieuId { get; set; }
        public Guid? BaoGiaId { get; set; }
    }
}
