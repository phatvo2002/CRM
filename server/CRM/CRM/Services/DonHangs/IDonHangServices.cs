using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Services.DonHangs
{
    public interface IDonHangServices : IBaseServices<DonHang, DonHangModal, Guid, DonHangDTO>
    {
        Task<ResultModal> ConvertDonHang(DonHangModal modal, Guid nguoiDungId, Guid phongBanId);
        Task<DonHangDTO> GetDonHangId(Guid id);
        Task<DonHangDTO> GetDonHangById(Guid id);
        Task<List<DonHangDTO>> GetAllDonHang(DateTime tuNgay, DateTime denNgay);
        Task<List<DonHangDTO>> GetDonHangByNguoiDungId(Guid nguoiDungId, DateTime tuNgay, DateTime denNgay);
        Task<List<DonHangDTO>> GetDonHangByPhongBanId(Guid phongBanId, DateTime tuNgay, DateTime denNgay);
        Task<List<DonHangDTO>> GetDonHangByKhachHangId(string khachHangId);
        Task<ResultModal> XacNhanDonHang(XacNhanDonHangModal modal);
        Task<ResultModal> CapNhatThucThuDonHang(Guid id, decimal soTien);
        Task<List<LichSuMuaHangDTO>> GetLichSuMuaHang(string khachHangId);
    }
}
