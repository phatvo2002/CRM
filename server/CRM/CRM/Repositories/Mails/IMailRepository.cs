using CRM.Modal;

namespace CRM.Repositories.Mails
{
    public interface IMailRepository
    {
        Task SendMailAsync(MailRequest request, string Email, string Password, Guid nguoiDungId, Guid PhongBanId);

        Task SendMailDonHangAsync(MailRequest request, string Email, string Password, Guid donHangId, Guid nguoiDungId, Guid phongBanId);

    }
}
