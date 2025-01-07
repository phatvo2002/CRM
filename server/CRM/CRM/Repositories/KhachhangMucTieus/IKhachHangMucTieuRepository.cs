using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.KhachhangMucTieus
{
    public interface IKhachHangMucTieuRepository : IBaseRepository<KhachHangMucTieu, KhachHangMucTieuModal, Guid, KhachHangMucTieuDTO>
    {
        Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuByNguoiDungId(Guid NguoiDungId);
        Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuByPhongBanId(Guid PhongBanId);
        Task<ResultModal> ConvertKhachHangMucTieu(ConvertKhachHangModal modal , Guid nguoiDungId , Guid phongBanId);
        Task<ResultModal> CreateKhachHangMucTieu(KhachHangMucTieuModal modal , Guid nguoiDungId, Guid phongBanId);
    }
}
