using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.KhachhangMucTieus;

namespace CRM.Services.KhachHangMucTieus
{
    public class KhachHangMucTieuServices : BaseServices<KhachHangMucTieu, KhachHangMucTieuModal, Guid, KhachHangMucTieuDTO>, IKhacHangMucTieuServices
    {
        private readonly IKhachHangMucTieuRepository _khachHangMucTieuRepository;
        public KhachHangMucTieuServices(IKhachHangMucTieuRepository repository) : base(repository)
        {
            _khachHangMucTieuRepository = repository;
        }

        public async Task<ResultModal> ConvertKhachHangMucTieu(ConvertKhachHangModal modal, Guid nguoiDungId, Guid phongBanId)
        {
            return await _khachHangMucTieuRepository.ConvertKhachHangMucTieu(modal, nguoiDungId, phongBanId);
        }

        public async Task<ResultModal> CreateKhachHangMucTieu(KhachHangMucTieuModal modal, Guid nguoiDungId, Guid phongBanId)
        {
            return await _khachHangMucTieuRepository.CreateKhachHangMucTieu(modal, nguoiDungId, phongBanId);
        }

        public async Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuByNguoiDungId(Guid NguoiDungId)
        {
            return await _khachHangMucTieuRepository.GetKhachHangMucTieuByNguoiDungId(NguoiDungId);
        }

        public async Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuByNguoiDungIdQuery(Guid NguoiDungId)
        {
            return await _khachHangMucTieuRepository.GetKhachHangMucTieuByNguoiDungIdQuery(NguoiDungId);
        }

        public async Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuByPhongBanId(Guid PhongBanId)
        {
            return await _khachHangMucTieuRepository.GetKhachHangMucTieuByPhongBanId(PhongBanId);
        }

        public async Task<ResultModal> UpdateKhachHangMucTieu(KhachHangMucTieuModal modal, Guid nguoiDungId, Guid phongBanId)
        {
            return await _khachHangMucTieuRepository.UpdateKhachHangMucTieu(modal, nguoiDungId, phongBanId);
        }
    }
}
