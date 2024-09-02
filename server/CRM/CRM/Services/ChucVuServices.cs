using CRM.Abstraction;
using CRM.DTO;
using CRM.Modal;
using CRM.Repositories.Interfaces;
using CRM.Services.Interfaces;

namespace CRM.Services
{
    public class ChucVuServices : IChucVuServices
    {
        private readonly IChucVuRepository _chucVuRepository;
        private readonly IUnitOfWork _unitOfWork;

        public ChucVuServices(IChucVuRepository chucVu , IUnitOfWork unitOfWork )
        {
            _unitOfWork = unitOfWork;
           }
        public async Task<ResultModal> CreateChucVu(ChucVuModal modal)
        {
            
           return await _unitOfWork.ChucVuRepository.CreateChucVu(modal);
        }

        public async Task<ResultModal> DeleteChucVu(Guid id)
        {
            return await _unitOfWork.ChucVuRepository.DeleteChucVu(id);
        }

        public async Task<List<ChucVuDTO>> GetAllChucVu()
        {
            return await _unitOfWork.ChucVuRepository.GetAllChucVu();
        }
    }
}
