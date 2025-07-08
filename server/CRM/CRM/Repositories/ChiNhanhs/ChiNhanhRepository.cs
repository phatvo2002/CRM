using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.ChiNhanhs
{
    public class ChiNhanhRepository : BaseRepository<ChiNhanh, ChiNhanhModal, Guid, ChiNhanhDTO>, IChiNhanhRepository
    {
        public ChiNhanhRepository(CrmDbContext crmDbContext, IMapper mapper) : base(crmDbContext, mapper)
        {
        }
    }
}
