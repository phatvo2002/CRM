using CRM.Modal;
using CRM.Repositories.Interfaces;
using CRM.Services.Interfaces;

namespace CRM.Services
{
    public class ChucVuServices : IChucVuServices
    {
        private readonly IChucVuRepository _chucVuRepository;

        public ChucVuServices(IChucVuRepository chucVu )
        {
             _chucVuRepository = chucVu;
           }
        public async Task<ResultModal> CreateChucVu(ChucVuModal modal)
        {
            
           return await _chucVuRepository.CreateChucVu(modal);
        }
    }
}
