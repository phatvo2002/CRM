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

        public async Task<ResultModal> Delete(Guid Id)
        {
            var db = _crmDbContext.EmailDaGuis.FirstOrDefault(x => x.Id == Id);
            if (db != null)
            {
                _crmDbContext.EmailDaGuis.Remove(db);
                await _crmDbContext.SaveChangesAsync();
                return new ResultModal() { Status = 200, Message = "Xóa thành công", Success = true };
            }
            else return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = true };
        }

        public async Task<List<MailDaGuiDTO>> GetByTiemNangid(Guid tiemNangId)
        {
            var db = await _crmDbContext.EmailDaGuis.Where(r => r.KhachHangTiemNangId == tiemNangId).ToListAsync();
            return _mapper.Map<List<MailDaGuiDTO>>(db);
        }
    }
}
