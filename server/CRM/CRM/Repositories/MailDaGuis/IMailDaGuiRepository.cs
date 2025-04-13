using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.MailDaGuis
{
    public interface IMailDaGuiRepository : IBaseRepository<EmailDaGui, MailDaGuiModal, Guid, MailDaGuiDTO>
    {
        Task<List<MailDaGuiDTO>> GetByTiemNangid(Guid tiemNangId);
        Task<ResultModal> Delete(Guid Id);
    }
}
