using CRM.DTO;
using CRM.Entities.StoreProcedure;
using CRM.Modal;

namespace CRM.Services.ChucVus
{
    public interface IChucVuServices
    {
        public Task<ResultModal> CreateChucVu(ChucVuModal modal);

        public Task<List<ChucVuDTO>> GetAllChucVu();

        public Task<ResultModal> DeleteChucVu(Guid id);

        public Task<List<crm_getmenugroup_by_id>> GetMenuRoleById(Guid id);

        public Task<ResultModal> UpdateChucVu(ChucVuModal modal, Guid id);
    }
}
