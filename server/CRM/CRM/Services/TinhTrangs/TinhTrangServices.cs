using CRM.DTO;
using CRM.Repositories;
using CRM.Repositories.TinhTrangs;

namespace CRM.Services.TinhTrangs
{
    public class TinhTrangServices : ITinhTrangServices
    {

        private readonly ITinhTrangRepository _tinhTrangRepository;

        public TinhTrangServices(ITinhTrangRepository tinhTrangRepository)
        {
            _tinhTrangRepository = tinhTrangRepository;
        }
        public async Task<List<TinhTrangDTO>> getAllTinhTrang()
        {
            return await _tinhTrangRepository.getAllTinhTrang();
        }
    }
}
