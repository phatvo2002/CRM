using CRM.Modal;

namespace CRM.Services.Mails
{
    public interface IMailServices
    {
        Task SendMailAsync(MailRequest request, string Email, string Password, Guid nguoiDungId, Guid PhongBanId);
        Task SendMailDonHangAsync(MailRequest request, string Email, string Password, Guid donHangId, Guid nguoiDungId, Guid phongBanId);
        Task SendMailBaoGiaAsync(MailRequest request, string Email, string Password, Guid baoGiaId, Guid nguoiDungId, Guid phongBanId);
    }
}
