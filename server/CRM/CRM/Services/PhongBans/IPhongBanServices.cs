using CRM.DTO;
using CRM.Modal;

namespace CRM.Services.PhongBans
{
    public interface IPhongBanServices
    {

        public Task<ResultModal> CreatePhongBan(PhongBanModel model);

        public Task<List<PhongBanDTO>> GetAllPhongBan();

        public Task<PhongBanDTO> GetPhongBanById(Guid id);


        public Task<ResultModal> UpdatePhongBan(PhongBanModel model, Guid phongBanId);

        public Task<ResultModal> DeletePhongBan(Guid id);
    }
}
