using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.MucTieuDoanhSos
{
    public class MucTieuDoanhSoRepository : BaseRepository<MucTieuDoanhSo, MucTieuDoanhSoModal, Guid, MucTieuDoanhSoDTO>, IMucTieuDoanhSoRepository
    {
        public MucTieuDoanhSoRepository(CrmDbContext crmDbContext, IMapper mapper) : base(crmDbContext, mapper)
        {
        }


    }
}
