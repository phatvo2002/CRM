using CRM.DTO;
using CRM.Modal;

namespace CRM.Repositories.Interfaces
{
    public interface IKhachHangTiemNangRepository
    {
       Task<List<KhachHangTiemNangDTO>> GetAllKhachHangTiemNangAsync();
       Task<KhachHangTiemNangDTO> GetKhachHangTiemNangByIdAsync(Guid id);
       Task<List<KhachHangTiemNangDTO>> GetKhachHangTiemNangByNguoiDungIdAsync(Guid nguoiDungId);
       Task<List<KhachHangTiemNangDTO>> GetKhachHangTiemNangByPhongBanIdAsync(Guid phongBanId);
       Task<ResultModal> ThemMoiKhachHangTiemNangAsync(KhachHangTiemNangModel model);
       Task<ResultModal> ChinhSuaKhachHangTiemNangAsync(KhachHangTiemNangModel model);
       Task<ResultModal> XoaKhachHangTiemNangAsync(Guid id);
      
      
    }
}
