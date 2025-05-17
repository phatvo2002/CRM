using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.DonHangs
{
    public interface IDonHangRepository : IBaseRepository<DonHang, DonHangModal, Guid, DonHangDTO>
    {
        Task<List<DonHangDTO>> GetAllDonHang(DateTime tuNgay, DateTime denNgay);
        Task<List<DonHangDTO>> GetDonHangByNguoiDungId(Guid nguoiDungId, DateTime tuNgay, DateTime denNgay);
        Task<List<DonHangDTO>> GetDonHangByKhachHangId(string khachHangId);
        Task<List<DonHangDTO>> GetDonHangByPhongBanId(Guid phongBanId, DateTime tuNgay, DateTime denNgay);
        Task<ResultModal> ConvertDonHang(DonHangModal modal, Guid nguoiDungId, Guid phongBanId);
        Task<DonHangDTO> GetDonHangId(Guid id);
        Task<ResultModal> XacNhanDonHang(XacNhanDonHangModal modal);
        Task<ResultModal> CapNhatThucThuDonHang(Guid id, decimal soTien);
        Task<List<LichSuMuaHangDTO>> GetLichSuMuaHang(string khachHangId);
    }
}
