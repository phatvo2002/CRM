using CRM.DTO;
using CRM.Modal;

namespace CRM.Repositories.NhiemVus
{
    public interface INhiemVuRepository
    {
        Task<List<NhiemVuDTO>> GetAllNhiemVu();
        Task<NhiemVuDTO> GetNhiemVuById(Guid Id);
        Task<List<NhiemVuDTO>> GetNhiemVuByNguoiDungId(Guid NguoiDungId);
        Task<List<NhiemVuDTO>> GetNhiemVuByKhachHangTiemNangId(Guid id);
        Task<ResultModal> CreateNhiemVu(NhiemVuModal modal, Guid phongBanId);
        Task<ResultModal> UpdateNhiemVu(NhiemVuModal modal, Guid nguoiDungId, Guid phongBanId);
        Task<ResultModal> DeleteNhiemVu(Guid Id);
    }
}
