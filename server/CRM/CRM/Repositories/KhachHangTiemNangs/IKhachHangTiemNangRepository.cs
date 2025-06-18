using CRM.DTO;
using CRM.Modal;

namespace CRM.Repositories.KhachHangTiemNangs
{
    public interface IKhachHangTiemNangRepository
    {
        Task<List<KhachHangTiemNangDTO>> GetAllKhachHangTiemNangAsync(DateTime tuNgay, DateTime denNgay);
        Task<KhachHangTiemNangDTO> GetKhachHangTiemNangByIdAsync(Guid id);
        Task<List<KhachHangTiemNangDTO>> GetKhachHangTiemNangByNguoiDungIdAsync(Guid nguoiDungId, DateTime tuNgay, DateTime denNgay);
        Task<List<KhachHangTiemNangDTO>> GetKhachHangTiemNangByPhongBanIdAsync(Guid phongBanId, DateTime tuNgay, DateTime denNgay);
        Task<List<KhachHangTiemNangDTO>> GetKhachHangTiemNangDaXoaAsync(Guid nguoiDungId);
        Task<List<KhachHangTiemNangDTO>> GetKhachHangTiemNangDaXoaByPhongBanAsync(Guid phongbanId);
        Task<ResultModal> ThemMoiKhachHangTiemNangAsync(KhachHangTiemNangModel model, Guid nguoiDungId, Guid phongBanId);
        Task<ResultModal> ChinhSuaKhachHangTiemNangAsync(KhachHangTiemNangModel model);
        Task<ResultModal> XoaKhachHangTiemNangAsync(Guid id);
        Task<ResultModal> XoaHangLoatKhTiemNangAssync(List<KhachHangTiemNangModel> models);
        Task<ResultModal> PhucHoiLoatKhTiemNangAsync(List<KhachHangTiemNangModel> models);
        Task<ResultModal> BanGiaoKhachHangTiemNang(Guid id, Guid userId);
        Task<ResultModal> BanGiaoHangLoat(List<BanGiaoList> models, Guid userId);


    }
}
