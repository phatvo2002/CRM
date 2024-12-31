using CRM.DTO;
using CRM.Entities.StoreProcedure;
using CRM.Modal;
using CRM.Repositories.ChucVus;

namespace CRM.Services.ChucVus
{
    public class ChucVuServices : IChucVuServices
    {

        private readonly IChucVuRepository _chucVuRepository;

        public ChucVuServices(IChucVuRepository chucVu)
        {
            _chucVuRepository = chucVu;
        }
        public async Task<ResultModal> CreateChucVu(ChucVuModal modal)
        {

            return await _chucVuRepository.CreateChucVu(modal);
        }

        public async Task<ResultModal> DeleteChucVu(Guid id)
        {
            return await _chucVuRepository.DeleteChucVu(id);
        }

        public async Task<List<ChucVuDTO>> GetAllChucVu()
        {
            return await _chucVuRepository.GetAllChucVu();
        }

        public async Task<List<crm_getmenugroup_by_id>> GetMenuRoleById(Guid id)
        {
            return await _chucVuRepository.GetMenuTroleById(id);
        }

        public async Task<ResultModal> UpdateChucVu(ChucVuModal modal, Guid id)
        {
            return await _chucVuRepository.UpdateChucVu(modal, id);
        }
    }
}
