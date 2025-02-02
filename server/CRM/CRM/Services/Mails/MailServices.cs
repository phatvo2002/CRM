using CRM.Entities;
using CRM.Modal;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
namespace CRM.Services.Mails
{
    public class MailServices : IMailServices
    {
        private readonly MailSettings _mailSettings;
        private readonly CrmDbContext _context;
        public MailServices(IOptions<MailSettings> mailSettings, CrmDbContext context)
        {
            _mailSettings = mailSettings.Value;
            _context = context;
        }
        public async Task SendMailAsync(MailRequest request, string Email, string Password, Guid nguoiDungId, Guid PhongBanId)
        {
            var mail = new MimeMessage();
            mail.Sender = MailboxAddress.Parse(Email);
            mail.To.Add(MailboxAddress.Parse(request.ToMail));
            mail.Subject = request.Subject;
            var builder = new BodyBuilder();

            byte[] fileByte;
            if (request.AttachtMent != null && request.AttachtMent.Count > 0)
            {
                foreach (var file in request.AttachtMent)
                {
                    if (file.Length > 0)
                    {
                        using (var ms = new MemoryStream())
                        {
                            file.CopyTo(ms);
                            fileByte = ms.ToArray();
                        }
                        builder.Attachments.Add(file.Name, fileByte, ContentType.Parse(file.ContentType));
                    }
                }
            }
            builder.HtmlBody = request.Body;
            mail.Body = builder.ToMessageBody();
            using var smtp = new MailKit.Net.Smtp.SmtpClient();
            smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(Email, Password);
            await smtp.SendAsync(mail);
            smtp.Disconnect(true);

            EmailDaGui emailDaGui = new EmailDaGui();
            emailDaGui.Id = Guid.NewGuid();
            emailDaGui.TieuDe = request.Subject;
            emailDaGui.DiaChiGui = Email;
            emailDaGui.DiaChiNhan = request.ToMail;
            emailDaGui.KhachHangTiemNangId = request.KhachHangTiemNangId;
            emailDaGui.KhachHangMucTieuId = request.KhachHangMucTieuId;
            emailDaGui.CreateAt = DateTime.Now;
            emailDaGui.NguoiDungId = nguoiDungId;
            emailDaGui.PhongBanId = PhongBanId;
            _context.EmailDaGuis.Add(emailDaGui);
            await _context.SaveChangesAsync();
        }
    }
}
