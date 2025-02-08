using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.CoHois
{
    public interface ICoHoiRepository : IBaseRepository<CoHoi, CoHoiModal, Guid, CoHoiDTO>
    {
        Task<ResultModal> ConvertCoHoi(CoHoiModal Modal, Guid nguoiDung, Guid phongBan);
        Task<CoHoiDTO> GetCoHoiById(string id);
        Task<List<CoHoiDTO>> GetCoHoiByNguoiDungId(Guid nguoiDungId);
        Task<List<CoHoiDTO>> GetCoHoiByPhongBanId(Guid phongBanId);
        Task<ResultModal> UpdateGiaiDoan(string cohoiId, Guid giaiDoanId);
        Task<ResultModal> UpdateCoHoiGiaTien(string CoHoiId, decimal giaTien);
    }
}
