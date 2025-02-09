using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Services.CoHois
{
    public interface ICoHoiServices : IBaseServices<CoHoi, CoHoiModal, Guid, CoHoiDTO>
    {
        Task<ResultModal> ConvertCoHoi(CoHoiModal modal, Guid nguoiDung, Guid phongBan);
        Task<CoHoiDTO> GetCoHoiById(string id);
        Task<List<CoHoiDTO>> GetCoHoiByNguoiDungId(Guid nguoiDungId);
        Task<List<CoHoiDTO>> GetCoHoiByPhongBanId(Guid phongBanId);
        Task<ResultModal> UpdateGiaiDoan(string cohoiId, Guid giaiDoanId);
        Task<ResultModal> UpdateCoHoiGiaTien(string CoHoiId, decimal giaTien);
        Task<ResultModal> UpdateNgayKyVong(string coHoiId, DateTime? ngayKyVong);

    }
}
