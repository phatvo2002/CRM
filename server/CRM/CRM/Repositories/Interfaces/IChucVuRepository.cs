using CRM.DTO;
using CRM.Entities.StoreProcedure;
using CRM.Modal;

namespace CRM.Repositories.Interfaces
{
    public interface IChucVuRepository
    {
        public Task<ResultModal> CreateChucVu(ChucVuModal chucVuModal);

        public Task<List<ChucVuDTO>> GetAllChucVu();

        public Task<ResultModal> DeleteChucVu(Guid Id);

        public Task<ResultModal> UpdateChucVu(ChucVuModal chucVuModal, Guid id);

        public Task<List<crm_getmenugroup_by_id>> GetMenuTroleById (Guid id);

    }
}
