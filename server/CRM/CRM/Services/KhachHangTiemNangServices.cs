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

        public Task<ResultModal> ChinhSuaKhachHangTiemNangAsync(KhachHangTiemNangModel model)
        {
            throw new NotImplementedException();
        }

        public Task<List<KhachHangTiemNangDTO>> GetAllKhachHangTiemNangAsync()
        {
            throw new NotImplementedException();
        }

        public Task<KhachHangTiemNangDTO> GetKhachHangTiemNangByIdAsync(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<List<KhachHangTiemNangDTO>> GetKhachHangTiemNangByNguoiDungIdAsync(Guid nguoiDungId)
        {
            throw new NotImplementedException();
        }

        public Task<List<KhachHangTiemNangDTO>> GetKhachHangTiemNangByPhongBanIdAsync(Guid phongBanId)
        {
            throw new NotImplementedException();
        }

        public Task<ResultModal> ThemMoiKhachHangTiemNangAsync(KhachHangTiemNangModel model)
        {
            throw new NotImplementedException();
        }

        public Task<ResultModal> XoaKhachHangTiemNangAsync(Guid id)
        {
            throw new NotImplementedException();
        }
    }
}
