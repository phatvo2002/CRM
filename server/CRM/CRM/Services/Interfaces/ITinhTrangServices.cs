using CRM.DTO;
using CRM.Modal;

namespace CRM.Services.Interfaces
{
    public interface ITinhTrangServices
    {
        public Task<List<TinhTrangDTO>> getAllTinhTrang();
    }
}
