using CRM.Modal;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
namespace CRM.Services.Mails
{
    public class MailServices : IMailServices
    {
        private readonly MailSettings _mailSettings;
        public MailServices(IOptions<MailSettings> mailSettings)
        {
            _mailSettings = mailSettings.Value;
        }
        public async Task SendMailAsync(MailRequest request)
        {
            var mail = new MimeMessage();
            mail.Sender = MailboxAddress.Parse(_mailSettings.Mail);
            mail.To.Add(MailboxAddress.Parse(request.ToMail));
            mail.Subject = request.Subject;
            var builder = new BodyBuilder();

            byte[] fileByte;
            if (request.AttachtMent.Count > 0)
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
                    else
                    {
                        continue;
                    }
                }
            }
            builder.HtmlBody = request.Body;
            mail.Body = builder.ToMessageBody();
            using var smtp = new MailKit.Net.Smtp.SmtpClient();
            smtp.Connect(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls);
            smtp.Authenticate(_mailSettings.Mail, _mailSettings.Password);
            await smtp.SendAsync(mail);
            smtp.Disconnect(true);
        }
    }
}
