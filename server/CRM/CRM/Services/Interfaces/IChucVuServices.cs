using CRM.DTO;
using CRM.Modal;

namespace CRM.Services.Interfaces
{
    public interface IChucVuServices
    {
        public Task<ResultModal> CreateChucVu(ChucVuModal modal);

        public Task<List<ChucVuDTO>> GetAllChucVu();

        public Task<ResultModal> DeleteChucVu(Guid id);
    }
}
