using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Services.KhachHangMucTieus
{
    public interface IKhacHangMucTieuServices : IBaseServices<KhachHangMucTieu, KhachHangMucTieuModal, Guid, KhachHangMucTieuDTO>
    {
        Task<KhachHangMucTieuDTO> GetKhachHangMucTieuById(string khachHangId);
        Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuByNguoiDungId(Guid NguoiDungId, DateTime tuNgay, DateTime denNgay);
        Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuByPhongBanId(Guid PhongBanId, DateTime tuNgay, DateTime denNgay);
        Task<ResultModal> BanGiaoKhachHangMucTieu(BanGiaoModal modal);
        Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuByNguoiDungIdQuery(Guid NguoiDungId);
        Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuDaXoaByNguoiDungId(Guid NguoiDungId);
        Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuDaXoaByPhongBanId(Guid PhongBanId);
        Task<ResultModal> KhoiPhucKhachHang(List<KhachHangMucTieuModal> modal);
        Task<ResultModal> ConvertKhachHangMucTieu(ConvertKhachHangModal modal, Guid nguoiDungId, Guid phongBanId);
        Task<ResultModal> CreateKhachHangMucTieu(KhachHangMucTieuModal modal, Guid nguoiDungId, Guid phongBanId);
        Task<ResultModal> UpdateKhachHangMucTieu(KhachHangMucTieuModal modal, Guid nguoiDungId, Guid phongBanId);
    }
}
