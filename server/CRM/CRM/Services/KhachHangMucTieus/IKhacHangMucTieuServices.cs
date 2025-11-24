using CRM.DTO;
using CRM.Entities;
using CRM.Entities.StoreProcedure;
using CRM.Modal;

namespace CRM.Services.KhachHangMucTieus
{
    public interface IKhacHangMucTieuServices : IBaseServices<KhachHangMucTieu, KhachHangMucTieuModal, Guid, KhachHangMucTieuDTO>
    {
        Task<List<sp_CRM_DanhSachKhachHangMucTieu>> GetAllByQuery(int pageNumber, int pageSize, DateTime tuNgay, DateTime denNgay, Guid nguoiDungId, Guid phongBanId, Guid chucVuId, Guid chiNhanhId);
        Task<KhachHangMucTieuDTO> GetKhachHangMucTieuById(string khachHangId);
        Task<ResultModal> BanGiaoKhachHangMucTieu(BanGiaoModal modal);
        Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuDaXoaByNguoiDungId(Guid NguoiDungId);
        Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuDaXoaByPhongBanId(Guid PhongBanId);
        Task<ResultModal> KhoiPhucKhachHang(List<KhachHangMucTieuModal> modal);
        Task<ResultModal> ConvertKhachHangMucTieu(ConvertKhachHangModal modal, Guid nguoiDungId, Guid phongBanId);
        Task<ResultModal> CreateKhachHangMucTieu(KhachHangMucTieuModal modal, Guid nguoiDungId, Guid phongBanId);
        Task<ResultModal> UpdateKhachHangMucTieu(KhachHangMucTieuModal modal, Guid nguoiDungId, Guid phongBanId);
    }
}
