using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.MailDaGuis;

namespace CRM.Services.MailDaGuis
{
    public class MailDaGuiServices : BaseServices<EmailDaGui, MailDaGuiModal, Guid, MailDaGuiDTO>, IMailDaGuiServices
    {
        private readonly IMailDaGuiRepository _mailDaGuiRepository;
        public MailDaGuiServices(IMailDaGuiRepository mailDaGuiRepository) : base(mailDaGuiRepository)
        {
            _mailDaGuiRepository = mailDaGuiRepository;
        }

        public async Task<ResultModal> Delete(Guid Id)
        {
            return await _mailDaGuiRepository.Delete(Id);
        }

        public async Task<List<MailDaGuiDTO>> GetByTiemNangid(Guid tiemNangId)
        {
            return await _mailDaGuiRepository.GetByTiemNangid(tiemNangId);
        }
    }
}
