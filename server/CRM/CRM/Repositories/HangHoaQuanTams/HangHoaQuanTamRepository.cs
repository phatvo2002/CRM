using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using Microsoft.EntityFrameworkCore;

namespace CRM.Repositories.HangHoaQuanTams
{
    public class HangHoaQuanTamRepository : BaseRepository<HangHoaQuanTam, HangHoaQuanTamModal, Guid, HangHoaQuanTamDTO>, IHangHoaQuanTamRepository
    {
        public HangHoaQuanTamRepository(CrmDbContext crmDbContext, IMapper mapper) : base(crmDbContext, mapper)
        {
        }

        public async Task<List<HangHoaQuanTamDTO>> GetHangHoaQuanTamByKhachHangTiemNangId(Guid id)
        {
            var db = await _crmDbContext.HangHoaQuanTams.Where(r => r.KhachHangTiemNangId == id).ToListAsync();
            return _mapper.Map<List<HangHoaQuanTamDTO>>(db);
        }
    }
}
