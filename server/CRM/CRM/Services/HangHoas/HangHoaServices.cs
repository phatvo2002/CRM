using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.HangHoas;

namespace CRM.Services.HangHoas
{
    public class HangHoaServices : BaseServices<HangHoa, HangHoaModal, Guid, HangHoaDTO>, IHangHoaServices
    {
        private readonly IHangHoaRepository _hangHoaRepository;
        public HangHoaServices(IHangHoaRepository repository) : base(repository)
        {
            _hangHoaRepository = repository;
        }
    }
}
