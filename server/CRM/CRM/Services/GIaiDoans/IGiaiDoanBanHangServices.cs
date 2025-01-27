using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Services.GIaiDoans
{
    public interface IGiaiDoanBanHangServices : IBaseServices<GiaiDoanBanHang , GIaiDoanBanhangModal , Guid , GiaiDoanBanHangDTO>
    {
        Task<List<GiaiDoanBanHangDTO>> GetAllGiaiDoanBanhang();
    }
}
