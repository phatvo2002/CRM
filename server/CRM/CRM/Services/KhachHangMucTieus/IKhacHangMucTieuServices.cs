using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Services.KhachHangMucTieus
{
    public interface IKhacHangMucTieuServices : IBaseServices<KhachHangMucTieu, KhachHangMucTieuModal, Guid, KhachHangMucTieuDTO>
    {
        Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuByNguoiDungId(Guid NguoiDungId);
        Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuByPhongBanId(Guid PhongBanId);
        Task<ResultModal> BanGiaoKhachHangMucTieu(BanGiaoModal modal);
        Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuByNguoiDungIdQuery(Guid NguoiDungId);
        Task<ResultModal> ConvertKhachHangMucTieu(ConvertKhachHangModal modal, Guid nguoiDungId, Guid phongBanId);
        Task<ResultModal> CreateKhachHangMucTieu(KhachHangMucTieuModal modal, Guid nguoiDungId, Guid phongBanId);
        Task<ResultModal> UpdateKhachHangMucTieu(KhachHangMucTieuModal modal, Guid nguoiDungId, Guid phongBanId);
    }
}
