using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using Microsoft.EntityFrameworkCore;

namespace CRM.Repositories.GiaiDoans
{
    public class GiaiDoanBanHangRepository : BaseRepository<GiaiDoanBanHang, GIaiDoanBanhangModal, Guid, GiaiDoanBanHangDTO>, IGiaiDoanBanhangRepository
    {
        public GiaiDoanBanHangRepository(CrmDbContext crmDbContext, IMapper mapper) : base(crmDbContext, mapper)
        {
        }

        public async Task<List<GiaiDoanBanHangDTO>> GetAllGiaiDoanBanhang()
        {
            var db = await _crmDbContext.GiaiDoanBanHangs.OrderBy(r=> r.Stt).ToListAsync();
            return _mapper.Map<List<GiaiDoanBanHangDTO>>(db);
        }
    }
}
