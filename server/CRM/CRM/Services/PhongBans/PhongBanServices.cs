using CRM.DTO;
using CRM.Modal;
using CRM.Repositories.PhongBans;

namespace CRM.Services.PhongBans
{
    public class PhongBanServices : IPhongBanServices
    {
        private readonly IPhongBanRepository _phongBanRepository;

        public PhongBanServices(IPhongBanRepository phongBanRepository)
        {
            _phongBanRepository = phongBanRepository;
        }

        public async Task<ResultModal> CreatePhongBan(PhongBanModel model)
        {
            return await _phongBanRepository.CreatePhongBan(model);
        }

        public async Task<ResultModal> DeletePhongBan(Guid id)
        {
            return await _phongBanRepository.DeletePhongBan(id);
        }

        public async Task<List<PhongBanDTO>> GetAllPhongBan()
        {
            return await _phongBanRepository.GetAllPhongBan();
        }

        public async Task<PhongBanDTO> GetPhongBanById(Guid id)
        {
            return await _phongBanRepository.GetPhongBanById(id);
        }

        public async Task<ResultModal> UpdatePhongBan(PhongBanModel model, Guid phongBanId)
        {
            return await _phongBanRepository.UpdatePhongBan(model, phongBanId);
        }
    }
}
