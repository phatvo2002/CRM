using CRM.DTO;
using CRM.Modal;

namespace CRM.Services.LichHens
{
    public interface ILichHenServices
    {
        Task<List<LichHenDTO>> GetAllLichHen();
        Task<LichHenDTO> GetLichHenById(Guid Id);
        Task<List<LichHenDTO>> GetLichHenByNguoiDungId(Guid NguoiDungId);
        Task<List<LichHenDTO>> GetLichHenByKhachHangTiemNangId(Guid id);
        Task<List<LichHenDTO>> GetLichHenByKhachHangId(string id);
        Task<ResultModal> CreateLichHen(LichHenModal modal, Guid nguoiDungId, Guid phongBanId);
        Task<ResultModal> UpdateLichHen(LichHenModal modal, Guid nguoiDungId, Guid phongBanId);
        Task<ResultModal> DeleteLichHen(Guid Id);
    }
}
