namespace CRM.Modal
{
    public class MailRequest
    {
        public string? ToMail { get; set; }
        public string? Subject { get; set; }
        public string? Body { get; set; }
        public List<IFormFile>? AttachtMent { get; set; }
    }
}
