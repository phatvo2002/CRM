using CRM.DTO;
using CRM.Modal;
using CRM.Repositories.KhachHangTiemNangs;

namespace CRM.Services.KhahHangTiemNangs
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

        public async Task<List<KhachHangTiemNangDTO>> GetAllKhachHangTiemNangAsync(DateTime tuNgay, DateTime denNgay)
        {
            return await _khachHangTiemNang.GetAllKhachHangTiemNangAsync(tuNgay, denNgay);
        }

        public async Task<KhachHangTiemNangDTO> GetKhachHangTiemNangByIdAsync(Guid id)
        {
            return await _khachHangTiemNang.GetKhachHangTiemNangByIdAsync(id);
        }

        public async Task<List<KhachHangTiemNangDTO>> GetKhachHangTiemNangByNguoiDungIdAsync(Guid nguoiDungId, DateTime tuNgay, DateTime denNgay)
        {
            return await _khachHangTiemNang.GetKhachHangTiemNangByNguoiDungIdAsync(nguoiDungId, tuNgay, denNgay);
        }

        public async Task<List<KhachHangTiemNangDTO>> GetKhachHangTiemNangByPhongBanIdAsync(Guid phongBanId, DateTime tuNgay, DateTime denNgay)
        {
            return await _khachHangTiemNang.GetKhachHangTiemNangByPhongBanIdAsync(phongBanId, tuNgay, denNgay);
        }


        public async Task<List<KhachHangTiemNangDTO>> GetKhachHangTiemNangDaXoaAsync(Guid nguoiDungId)
        {
            return await _khachHangTiemNang.GetKhachHangTiemNangDaXoaAsync(nguoiDungId);
        }

        public async Task<List<KhachHangTiemNangDTO>> GetKhachHangTiemNangDaXoaByPhongBanAsync(Guid phongbanId)
        {
            return await _khachHangTiemNang.GetKhachHangTiemNangDaXoaByPhongBanAsync(phongbanId);
        }

        public async Task<ResultModal> PhucHoiLoatKhTiemNangAsync(List<KhachHangTiemNangModel> models)
        {
            return await _khachHangTiemNang.PhucHoiLoatKhTiemNangAsync(models);
        }

        public async Task<ResultModal> ThemMoiKhachHangTiemNangAsync(KhachHangTiemNangModel model, Guid nguoiDungId, Guid phongBanId)
        {
            return await _khachHangTiemNang.ThemMoiKhachHangTiemNangAsync(model, nguoiDungId, phongBanId);
        }

        public async Task<ResultModal> XoaHangLoatKhTiemNangAssync(List<KhachHangTiemNangModel> models)
        {
            return await _khachHangTiemNang.XoaHangLoatKhTiemNangAssync(models);
        }

        public async Task<ResultModal> XoaKhachHangTiemNangAsync(Guid id)
        {
            return await _khachHangTiemNang.XoaKhachHangTiemNangAsync(id);
        }
    }
}
