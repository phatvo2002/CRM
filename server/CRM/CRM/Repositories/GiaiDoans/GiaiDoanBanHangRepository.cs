using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.GiaiDoans
{
    public class GiaiDoanBanHangRepository : BaseRepository<GiaiDoanBanHang, GIaiDoanBanhangModal, Guid, GiaiDoanBanHangDTO>, IGiaiDoanBanhangRepository
    {
        public GiaiDoanBanHangRepository(CrmDbContext crmDbContext, IMapper mapper) : base(crmDbContext, mapper)
        {
        }
    }
}
