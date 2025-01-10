using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.GiaiDoans
{
    public interface IGiaiDoanBanhangRepository :IBaseRepository<GiaiDoanBanHang , GIaiDoanBanhangModal , Guid, GiaiDoanBanHangDTO>
    {
    }
}
