using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.KPINhanViens
{
    public class KPINhanVienRepository : BaseRepository<KPINhanVien, KPINhanVienModal, Guid, KPINhanVienDTO>, IKPINhanVienRepository
    {
        public KPINhanVienRepository(CrmDbContext crmDbContext, IMapper mapper) : base(crmDbContext, mapper)
        {
        }
    }
}
