using CRM.DTO;
using CRM.Modal;

namespace CRM.Services.TinhTrangs
{
    public interface ITinhTrangServices
    {
        public Task<List<TinhTrangDTO>> getAllTinhTrang();
    }
}
