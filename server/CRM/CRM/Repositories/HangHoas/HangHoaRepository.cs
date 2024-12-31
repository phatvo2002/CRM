using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.HangHoas
{
    public class HangHoaRepository : BaseRepository<HangHoa, HangHoaModal, Guid, HangHoaDTO>, IHangHoaRepository
    {
        public HangHoaRepository(CrmDbContext crmDbContext, IMapper mapper) : base(crmDbContext, mapper)
        {
        }
    }
}
