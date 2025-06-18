using CRM.DTO;
using CRM.Modal;

namespace CRM.Services.KhahHangTiemNangs
{
    public interface IKhachHangTiemNangServices
    {
        Task<List<KhachHangTiemNangDTO>> GetAllKhachHangTiemNangAsync(DateTime tuNgay, DateTime denNgay);
        Task<KhachHangTiemNangDTO> GetKhachHangTiemNangByIdAsync(Guid id);
        Task<List<KhachHangTiemNangDTO>> GetKhachHangTiemNangDaXoaAsync(Guid nguoiDungId);
        Task<List<KhachHangTiemNangDTO>> GetKhachHangTiemNangDaXoaByPhongBanAsync(Guid phongbanId);
        Task<List<KhachHangTiemNangDTO>> GetKhachHangTiemNangByNguoiDungIdAsync(Guid nguoiDungId, DateTime tuNgay, DateTime denNgay);
        Task<List<KhachHangTiemNangDTO>> GetKhachHangTiemNangByPhongBanIdAsync(Guid phongBanId, DateTime tuNgay, DateTime denNgay);
        Task<ResultModal> ThemMoiKhachHangTiemNangAsync(KhachHangTiemNangModel model, Guid nguoiDungId, Guid phongBanId);
        Task<ResultModal> ChinhSuaKhachHangTiemNangAsync(KhachHangTiemNangModel model);
        Task<ResultModal> XoaKhachHangTiemNangAsync(Guid id);
        Task<ResultModal> BanGiaoKhachHangTiemNang(Guid id, Guid userId);
        Task<ResultModal> XoaHangLoatKhTiemNangAssync(List<KhachHangTiemNangModel> models);
        Task<ResultModal> PhucHoiLoatKhTiemNangAsync(List<KhachHangTiemNangModel> models);
        Task<ResultModal> BanGiaoHangLoat(List<BanGiaoList> models, Guid userId);

    }
}
