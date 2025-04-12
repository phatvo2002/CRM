using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using Microsoft.EntityFrameworkCore;

namespace CRM.Repositories.MailDaGuis
{
    public class MailDaGuiRepository : BaseRepository<EmailDaGui, MailDaGuiModal, Guid, MailDaGuiDTO>, IMailDaGuiRepository
    {
        public MailDaGuiRepository(CrmDbContext crmDbContext, IMapper mapper) : base(crmDbContext, mapper)
        {
        }

        public async Task<List<MailDaGuiDTO>> GetByTiemNangid(Guid tiemNangId)
        {
            var db = await _crmDbContext.EmailDaGuis.Where(r => r.KhachHangTiemNangId == tiemNangId).ToListAsync();
            return _mapper.Map<List<MailDaGuiDTO>>(db);
        }
    }
}
