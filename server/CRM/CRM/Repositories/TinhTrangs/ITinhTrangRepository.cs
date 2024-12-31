using CRM.DTO;
using CRM.Modal;

namespace CRM.Repositories.TinhTrangs
{
    public interface ITinhTrangRepository
    {
        public Task<List<TinhTrangDTO>> getAllTinhTrang();
    }
}
