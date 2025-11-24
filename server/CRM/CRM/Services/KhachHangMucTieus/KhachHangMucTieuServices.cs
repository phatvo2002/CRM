using CRM.DTO;
using CRM.Entities;
using CRM.Entities.StoreProcedure;
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

        public async Task<ResultModal> BanGiaoKhachHangMucTieu(BanGiaoModal modal)
        {
            return await _khachHangMucTieuRepository.BanGiaoKhachHangMucTieu(modal);
        }

        public async Task<ResultModal> ConvertKhachHangMucTieu(ConvertKhachHangModal modal, Guid nguoiDungId, Guid phongBanId)
        {
            return await _khachHangMucTieuRepository.ConvertKhachHangMucTieu(modal, nguoiDungId, phongBanId);
        }

        public async Task<ResultModal> CreateKhachHangMucTieu(KhachHangMucTieuModal modal, Guid nguoiDungId, Guid phongBanId)
        {
            return await _khachHangMucTieuRepository.CreateKhachHangMucTieu(modal, nguoiDungId, phongBanId);
        }

        public async Task<List<sp_CRM_DanhSachKhachHangMucTieu>> GetAllByQuery(int pageNumber, int pageSize, DateTime tuNgay, DateTime denNgay, Guid nguoiDungId, Guid phongBanId, Guid chucVuId, Guid chiNhanhId)
        {
            return await _khachHangMucTieuRepository.GetAllByQuery(pageNumber, pageSize, tuNgay, denNgay, nguoiDungId, phongBanId, chucVuId, chiNhanhId);
        }

        public async Task<KhachHangMucTieuDTO> GetKhachHangMucTieuById(string khachHangId)
        {
            return await _khachHangMucTieuRepository.GetKhachHangMucTieuById(khachHangId);
        }

        public async Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuDaXoaByNguoiDungId(Guid NguoiDungId)
        {
            return await _khachHangMucTieuRepository.GetKhachHangMucTieuDaXoaByNguoiDungId(NguoiDungId);
        }

        public async Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuDaXoaByPhongBanId(Guid PhongBanId)
        {
            return await _khachHangMucTieuRepository.GetKhachHangMucTieuDaXoaByPhongBanId(PhongBanId);
        }

        public async Task<ResultModal> KhoiPhucKhachHang(List<KhachHangMucTieuModal> modal)
        {
            return await _khachHangMucTieuRepository.KhoiPhucKhachHang(modal);
        }

        public async Task<ResultModal> UpdateKhachHangMucTieu(KhachHangMucTieuModal modal, Guid nguoiDungId, Guid phongBanId)
        {
            return await _khachHangMucTieuRepository.UpdateKhachHangMucTieu(modal, nguoiDungId, phongBanId);
        }
    }
}
