using CRM.DTO;
using CRM.Modal;

namespace CRM.Repositories.Interfaces
{
    public interface ITinhTrangRepository
    {
        public Task<List<TinhTrangDTO>> getAllTinhTrang();
    }
}
