using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.PhanLoaiDuBaos
{
    public class PhanLoaiDuBaoRepository : BaseRepository<PhanLoaiDuBao, ClassModal, Guid, ClassDTO>, IPhanLoaiDuBaoRepository
    {
        public PhanLoaiDuBaoRepository(CrmDbContext crmDbContext, IMapper mapper) : base(crmDbContext, mapper)
        {
        }
    }
}
