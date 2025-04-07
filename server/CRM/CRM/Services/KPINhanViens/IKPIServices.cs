using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Services.KPINhanViens
{
    public interface IKPIServices : IBaseServices<KPINhanVien, KPINhanVienModal, Guid, KPINhanVienDTO>
    {
        Task<ResultModal> CreateKPINhanVien(KPINhanVienModal modal, Guid phongBanId);
        Task<ResultModal> UpdateKPINhanVien(KPINhanVienModal modal);
    }
}
