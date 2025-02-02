namespace CRM.Modal
{
    public class MailRequest
    {
        public string? ToMail { get; set; }
        public string? Subject { get; set; }
        public string? Body { get; set; }
        public Guid? KhachHangTiemNangId { get; set; }
        public string? KhachHangMucTieuId { get; set; }
        public List<IFormFile>? AttachtMent { get; set; }
    }
}
