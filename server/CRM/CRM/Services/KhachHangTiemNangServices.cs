using CRM.DTO;
using CRM.Modal;
using CRM.Repositories.Interfaces;
using CRM.Services.Interfaces;

namespace CRM.Services
{
    public class KhachHangTiemNangServices : IKhachHangTiemNangServices
    {
        private readonly IKhachHangTiemNangRepository _khachHangTiemNang;
        public KhachHangTiemNangServices(IKhachHangTiemNangRepository khachHangTiemNang)
        {
            _khachHangTiemNang = khachHangTiemNang;
        }

        public async Task<ResultModal> BanGiaoKhachHangTiemNang(Guid id, Guid userId)
        {
            return await _khachHangTiemNang.BanGiaoKhachHangTiemNang(id, userId);
        }

        public async Task<ResultModal> ChinhSuaKhachHangTiemNangAsync(KhachHangTiemNangModel model)
        {
            return await _khachHangTiemNang.ChinhSuaKhachHangTiemNangAsync(model);
        }

        public async Task<List<KhachHangTiemNangDTO>> GetAllKhachHangTiemNangAsync()
        {
            return await _khachHangTiemNang.GetAllKhachHangTiemNangAsync();
        }

        public async Task<KhachHangTiemNangDTO> GetKhachHangTiemNangByIdAsync(Guid id)
        {
            return await _khachHangTiemNang.GetKhachHangTiemNangByIdAsync(id);
        }

        public async Task<List<KhachHangTiemNangDTO>> GetKhachHangTiemNangByNguoiDungIdAsync(Guid nguoiDungId)
        {
            return await _khachHangTiemNang.GetKhachHangTiemNangByNguoiDungIdAsync(nguoiDungId);
        }

        public async Task<List<KhachHangTiemNangDTO>> GetKhachHangTiemNangByPhongBanIdAsync(Guid phongBanId)
        {
            return await _khachHangTiemNang.GetKhachHangTiemNangByPhongBanIdAsync(phongBanId);
        }

        public async Task<ResultModal> ThemMoiKhachHangTiemNangAsync(KhachHangTiemNangModel model)
        {
            return await _khachHangTiemNang.ThemMoiKhachHangTiemNangAsync(model);
        }

        public async Task<ResultModal> XoaKhachHangTiemNangAsync(Guid id)
        {
            return await _khachHangTiemNang.XoaKhachHangTiemNangAsync(id);
        }
    }
}
