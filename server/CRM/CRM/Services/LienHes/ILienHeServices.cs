using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Services.LienHes
{
    public interface ILienHeServices : IBaseServices<LienHe, LienHeModal, Guid, LienHeDTO>
    {
        Task<List<LienHeDTO>> GetLienHeByKhachHangTiemNangId(Guid id);
        Task<ResultModal> CreateLienHe(LienHeModal modal, Guid nguoiDungId, Guid phongBanId);
    }
}
