using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Services.MailDaGuis
{
    public interface IMailDaGuiServices : IBaseServices<EmailDaGui, MailDaGuiModal, Guid, MailDaGuiDTO>
    {
        Task<List<MailDaGuiDTO>> GetByTiemNangid(Guid tiemNangId);
        Task<ResultModal> Delete(Guid Id);
    }
}
