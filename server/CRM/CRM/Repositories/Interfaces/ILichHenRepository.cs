using CRM.DTO;
using CRM.Modal;

namespace CRM.Repositories.Interfaces
{
    public interface ILichHenRepository
    {
        Task<List<LichHenDTO>> GetAllLichHen();
        Task<LichHenDTO> GetLichHenById(Guid Id);
        Task<List<LichHenDTO>> GetLichHenByNguoiDungId(Guid NguoiDungId);
        Task<List<LichHenDTO>> GetLichHenByKhachHangTiemNangId (Guid id);
        Task<ResultModal> CreateLichHen(LichHenModal modal, Guid nguoiDungId, Guid phongBanId);
        Task<ResultModal> UpdateLichHen(LichHenModal modal, Guid nguoiDungId, Guid phongBanId);
        Task<ResultModal> DeleteLichHen(Guid Id);
    }
}
