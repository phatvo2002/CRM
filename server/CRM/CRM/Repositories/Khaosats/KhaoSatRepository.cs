using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.Khaosats
{
    public class KhaoSatRepository : BaseRepository<KhaoSat, KhaoSatModal, Guid, KhaoSatDTO>, IKhaoSatRepository
    {
        public KhaoSatRepository(CrmDbContext crmDbContext, IMapper mapper) : base(crmDbContext, mapper)
        {
        }
    }
}
