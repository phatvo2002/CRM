using CRM.Abstraction;
using CRM.DTO;
using CRM.Services.Interfaces;

namespace CRM.Services
{
    public class TinhTrangServices : ITinhTrangServices
    {
        private readonly IUnitOfWork _unitOfWork;

        public TinhTrangServices(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<List<TinhTrangDTO>> getAllTinhTrang()
        {
            return await _unitOfWork.TrangRepository.getAllTinhTrang();
        }
    }
}
