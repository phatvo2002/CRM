using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.LoaiHangHoas;

namespace CRM.Services.LoaiHangHoas
{
    public class LoaiHangHoaServices : BaseServices<LoaiHangHoa, LoaiHangHoaModal, Guid, LoaiHangHoaDTO>, ILoaiHangHoaServices
    {
        private readonly ILoaiHangHoaRepository _loaiHangHoaRepository;
        public LoaiHangHoaServices(ILoaiHangHoaRepository repository) : base(repository)
        {
            _loaiHangHoaRepository = repository;
        }
    }
}
