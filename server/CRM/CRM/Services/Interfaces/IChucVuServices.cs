using CRM.Modal;

namespace CRM.Services.Interfaces
{
    public interface IChucVuServices
    {
        public Task<ResultModal> CreateChucVu(ChucVuModal modal);
    }
}
