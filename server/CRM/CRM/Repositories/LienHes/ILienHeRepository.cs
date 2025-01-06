using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.LienHes
{
    public interface ILienHeRepository : IBaseRepository<LienHe, LienHeModal, Guid, LienHeDTO>
    {
        Task<ResultModal> CreateLienHe(LienHeModal modal, Guid nguoiDungId, Guid phongBanId);
        Task<List<LienHeDTO>> GetLienHeByKhachHangTiemNangId(Guid id);
    }
}
