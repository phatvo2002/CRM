using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.ThongBaos
{
    public class ThongBaoRepository : BaseRepository<ThongBao, ThongBaoModal, Guid, ThongBaoDTO>, IThongBaoRepository
    {
        public ThongBaoRepository(CrmDbContext crmDbContext, IMapper mapper) : base(crmDbContext, mapper)
        {
        }
    }
}
