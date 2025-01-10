using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.LoaiDuBaos
{
    public class LoaiDuBaoRepository : BaseRepository<LoaiDuBao, ClassModal, Guid, ClassDTO>, ILoaiDuBaoRepository
    {
        public LoaiDuBaoRepository(CrmDbContext crmDbContext, IMapper mapper) : base(crmDbContext, mapper)
        {
        }
    }
}
