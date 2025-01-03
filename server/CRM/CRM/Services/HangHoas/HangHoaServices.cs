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

        public async Task<ResultModal> CreateHangHoa(HangHoaModal modal)
        {
            return await _hangHoaRepository.CreateHangHoa(modal);
        }

        public async Task<ResultModal> UpdateHangHoa(HangHoaModal modal)
        {
            return await _hangHoaRepository.UpdateHangHoa(modal);
        }
    }
}
