using CRM.DTO;
using CRM.Modal;

namespace CRM.Repositories.Interfaces
{
    public interface IPhongBanRepository
    {
         Task<ResultModal> CreatePhongBan(PhongBanModel model);

         Task<List<PhongBanDTO>> GetAllPhongBan();
         Task<PhongBanDTO> GetPhongBanById(Guid id);

         Task<ResultModal> UpdatePhongBan(PhongBanModel model , Guid phongBanId);

         Task<ResultModal> DeletePhongBan(Guid id);
    }
}
