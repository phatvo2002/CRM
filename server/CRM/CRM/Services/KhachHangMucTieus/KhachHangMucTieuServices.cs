using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.HangHoas;
using CRM.Repositories.KhachhangMucTieus;

namespace CRM.Services.KhachHangMucTieus
{
    public class KhachHangMucTieuServices : BaseServices<KhachHangMucTieu , KhachHangMucTieuModal ,Guid , KhachHangMucTieuDTO> , IKhacHangMucTieuServices
    {
        private readonly IKhachHangMucTieuRepository _khachHangMucTieuRepository;
        public KhachHangMucTieuServices(IKhachHangMucTieuRepository repository) : base(repository)
        {
            _khachHangMucTieuRepository = repository;
        }

        public async Task<ResultModal> ConvertKhachHangMucTieu(ConvertKhachHangModal modal, Guid nguoiDungId, Guid phongBanId)
        {
            return await _khachHangMucTieuRepository.ConvertKhachHangMucTieu(modal , nguoiDungId , phongBanId);
        }

        public async Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuByNguoiDungId(Guid NguoiDungId)
        {
            return await _khachHangMucTieuRepository.GetKhachHangMucTieuByNguoiDungId(NguoiDungId);
        }

        public async Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuByPhongBanId(Guid PhongBanId)
        {
            return await _khachHangMucTieuRepository.GetKhachHangMucTieuByPhongBanId(PhongBanId);
        }
    }
}
