using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.KPINhanViens
{
    public interface IKPINhanVienRepository : IBaseRepository<KPINhanVien, KPINhanVienModal, Guid, KPINhanVienDTO>
    {
    }
}
