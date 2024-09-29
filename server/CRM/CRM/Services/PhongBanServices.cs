using CRM.Abstraction;
using CRM.DTO;
using CRM.Modal;
using CRM.Services.Interfaces;

namespace CRM.Services
{
    public class PhongBanServices : IPhongBanServices
    {
        public readonly IUnitOfWork _unitOfWork;
        public PhongBanServices(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ResultModal> CreatePhongBan(PhongBanModel model)
        {
           return await _unitOfWork.PhongBanRepository.CreatePhongBan(model);
        }

        public async Task<ResultModal> DeletePhongBan(Guid id)
        {
           return await _unitOfWork.PhongBanRepository.DeletePhongBan(id);
        }

        public async Task<List<PhongBanDTO>> GetAllPhongBan()
        {
            return await _unitOfWork.PhongBanRepository.GetAllPhongBan();
        }

        public async Task<PhongBanDTO> GetPhongBanById(Guid id)
        {
            return await  _unitOfWork.PhongBanRepository.GetPhongBanById(id);
        }

        public async  Task<ResultModal> UpdatePhongBan(PhongBanModel model, Guid phongBanId)
        {
            return await _unitOfWork.PhongBanRepository.UpdatePhongBan(model, phongBanId);
        }
    }
}
