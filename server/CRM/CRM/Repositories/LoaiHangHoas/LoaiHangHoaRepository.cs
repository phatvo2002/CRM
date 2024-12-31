using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.LoaiHangHoas
{
    public class LoaiHangHoaRepository : BaseRepository<LoaiHangHoa, LoaiHangHoaModal, Guid, LoaiHangHoaDTO>, ILoaiHangHoaRepository
    {
        public LoaiHangHoaRepository(CrmDbContext context, IMapper mapper) : base(context, mapper) { }

    }
}
