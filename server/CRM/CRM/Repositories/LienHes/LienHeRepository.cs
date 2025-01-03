using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using Microsoft.EntityFrameworkCore;

namespace CRM.Repositories.LienHes
{
    public class LienHeRepository : BaseRepository<LienHe, LienHeModal, Guid, LienHeDTO>, ILienHeRepository
    {
        public LienHeRepository(CrmDbContext crmDbContext, IMapper mapper) : base(crmDbContext, mapper)
        {
        }

        public async Task<List<LienHeDTO>> GetLienHeByKhachHangTiemNangId(Guid id)
        {
            var db = await _crmDbContext.LienHes.Where(r => r.KhachHangTiemNangId == id).ToListAsync();
            return _mapper.Map<List<LienHeDTO>>(db);
        }
    }
}
