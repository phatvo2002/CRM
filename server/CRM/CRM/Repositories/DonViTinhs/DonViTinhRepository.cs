using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.DonViTinhs
{
    public class DonViTinhRepository : BaseRepository<DonViTinh, DonViTinhModal, Guid, DonViTinhDTO>, IDonViTinhRepository
    {
        public DonViTinhRepository(CrmDbContext crmDbContext, IMapper mapper) : base(crmDbContext, mapper)
        {
        }
    }
}
