using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.KhachhangMucTieus
{
    public interface IKhachHangMucTieuRepository : IBaseRepository<KhachHangMucTieu, KhachHangMucTieuModal, Guid, KhachHangMucTieuDTO>
    {
        Task<KhachHangMucTieuDTO> GetKhachHangMucTieuById(string khachHangId);
        Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuDaXoaByNguoiDungId(Guid NguoiDungId);
        Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuDaXoaByPhongBanId(Guid PhongBanId);
        Task<ResultModal> KhoiPhucKhachHang(List<KhachHangMucTieuModal> modal);
        Task<ResultModal> BanGiaoKhachHangMucTieu(BanGiaoModal modal);
        Task<ResultModal> ConvertKhachHangMucTieu(ConvertKhachHangModal modal, Guid nguoiDungId, Guid phongBanId);
        Task<ResultModal> CreateKhachHangMucTieu(KhachHangMucTieuModal modal, Guid nguoiDungId, Guid phongBanId);
        Task<ResultModal> UpdateKhachHangMucTieu(KhachHangMucTieuModal modal, Guid nguoiDungId, Guid phongBanId);
    }
}
