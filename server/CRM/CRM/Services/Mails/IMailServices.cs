using CRM.Modal;

namespace CRM.Services.Mails
{
    public interface IMailServices
    {
        Task SendMailAsync(MailRequest request, string Email, string Password, Guid nguoiDungId, Guid PhongBanId);
    }
}
