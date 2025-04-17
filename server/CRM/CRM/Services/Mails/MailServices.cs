using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.Mails;
using Microsoft.Extensions.Options;
namespace CRM.Services.Mails
{
    public class MailServices : IMailServices
    {
        private readonly MailSettings _mailSettings;
        private readonly CrmDbContext _context;
        private readonly IMailRepository _mailRepository;
        public MailServices(IOptions<MailSettings> mailSettings, CrmDbContext context, IMailRepository mailRepository)
        {
            _mailSettings = mailSettings.Value;
            _context = context;
            _mailRepository = mailRepository;
        }
        public async Task SendMailAsync(MailRequest request, string Email, string Password, Guid nguoiDungId, Guid PhongBanId)
        { await _mailRepository.SendMailAsync(request, Email, Password, nguoiDungId, PhongBanId); }

        public async Task SendMailBaoGiaAsync(MailRequest request, string Email, string Password, Guid baoGiaId, Guid nguoiDungId, Guid phongBanId)
        {
            await _mailRepository.SendMailBaoGiaAsync(request, Email, Password, baoGiaId, nguoiDungId, phongBanId);
        }

        public async Task SendMailDonHangAsync(MailRequest request, string Email, string Password, Guid donHangId, Guid nguoiDungId, Guid phongBanId)
        { await _mailRepository.SendMailDonHangAsync(request, Email, Password, donHangId, nguoiDungId, phongBanId); }
    }
}
