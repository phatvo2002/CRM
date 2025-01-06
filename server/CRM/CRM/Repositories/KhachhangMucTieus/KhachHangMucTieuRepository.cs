using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.KhachhangMucTieus
{
    public class KhachHangMucTieuRepository : BaseRepository<KhachHangMucTieu, KhachHangMucTieuModal, Guid, KhachHangMucTieuDTO>, IKhachHangMucTieuRepository
    {
        public KhachHangMucTieuRepository(CrmDbContext crmDbContext, IMapper mapper) : base(crmDbContext, mapper)
        {
        }
    }
}
