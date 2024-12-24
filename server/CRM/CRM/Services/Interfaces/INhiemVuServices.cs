using CRM.DTO;
using CRM.Modal;

namespace CRM.Services.Interfaces
{
    public interface INhiemVuServices
    {
        Task<List<NhiemVuDTO>> GetAllNhiemVu();
        Task<NhiemVuDTO> GetNhiemVuById(Guid Id);
        Task<List<NhiemVuDTO>> GetNhiemVuByNguoiDungId(Guid NguoiDungId);
        Task<List<NhiemVuDTO>> GetNhiemVuByKhachHangTiemNangId(Guid id);
        Task<ResultModal> CreateNhiemVu(NhiemVuModal modal, Guid nguoiDungId, Guid phongBanId);
        Task<ResultModal> UpdateNhiemVu(NhiemVuModal modal, Guid nguoiDungId, Guid phongBanId);
        Task<ResultModal> DeleteNhiemVu(Guid Id);
    }
}
