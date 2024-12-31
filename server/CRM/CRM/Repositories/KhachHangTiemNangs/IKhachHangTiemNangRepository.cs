using CRM.DTO;
using CRM.Modal;

namespace CRM.Repositories.KhachHangTiemNangs
{
    public interface IKhachHangTiemNangRepository
    {
        Task<List<KhachHangTiemNangDTO>> GetAllKhachHangTiemNangAsync();
        Task<KhachHangTiemNangDTO> GetKhachHangTiemNangByIdAsync(Guid id);
        Task<List<KhachHangTiemNangDTO>> GetKhachHangTiemNangByNguoiDungIdAsync(Guid nguoiDungId);
        Task<List<KhachHangTiemNangDTO>> GetKhachHangTiemNangByPhongBanIdAsync(Guid phongBanId);
        Task<ResultModal> ThemMoiKhachHangTiemNangAsync(KhachHangTiemNangModel model, Guid nguoiDungId, Guid phongBanId);
        Task<ResultModal> ChinhSuaKhachHangTiemNangAsync(KhachHangTiemNangModel model);
        Task<ResultModal> XoaKhachHangTiemNangAsync(Guid id);
        Task<ResultModal> BanGiaoKhachHangTiemNang(Guid id, Guid userId);


    }
}
