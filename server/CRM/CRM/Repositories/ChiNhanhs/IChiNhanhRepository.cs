using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.ChiNhanhs
{
    public interface IChiNhanhRepository : IBaseRepository<ChiNhanh , ChiNhanhModal , Guid , ChiNhanhDTO>
    {
    }
}
