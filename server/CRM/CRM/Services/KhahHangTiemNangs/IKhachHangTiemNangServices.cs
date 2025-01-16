using CRM.DTO;
using CRM.Modal;

namespace CRM.Services.KhahHangTiemNangs
{
    public interface IKhachHangTiemNangServices
    {
        Task<List<KhachHangTiemNangDTO>> GetAllKhachHangTiemNangAsync();
        Task<KhachHangTiemNangDTO> GetKhachHangTiemNangByIdAsync(Guid id);
        Task<List<KhachHangTiemNangDTO>> GetKhachHangTiemNangDaXoaAsync(Guid nguoiDungId);
        Task<List<KhachHangTiemNangDTO>> GetKhachHangTiemNangByNguoiDungIdAsync(Guid nguoiDungId);
        Task<List<KhachHangTiemNangDTO>> GetKhachHangTiemNangByPhongBanIdAsync(Guid phongBanId);
        Task<ResultModal> ThemMoiKhachHangTiemNangAsync(KhachHangTiemNangModel model, Guid nguoiDungId, Guid phongBanId);
        Task<ResultModal> ChinhSuaKhachHangTiemNangAsync(KhachHangTiemNangModel model);
        Task<ResultModal> XoaKhachHangTiemNangAsync(Guid id);
        Task<ResultModal> BanGiaoKhachHangTiemNang(Guid id, Guid userId);
        Task<ResultModal> XoaHangLoatKhTiemNangAssync(List<KhachHangTiemNangModel> models);

    }
}
