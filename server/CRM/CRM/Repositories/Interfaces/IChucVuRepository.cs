using CRM.Modal;

namespace CRM.Repositories.Interfaces
{
    public interface IChucVuRepository
    {
        public Task<ResultModal> CreateChucVu(ChucVuModal chucVuModal);

    }
}
