using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Services.DonHangs
{
    public interface IDonHangServices : IBaseServices<DonHang, DonHangModal, Guid, DonHangDTO>
    {
        Task<ResultModal> ConvertDonHang(DonHangModal modal, Guid nguoiDungId, Guid phongBanId);
        Task<DonHangDTO> GetDonHangId(Guid id);
        Task<List<DonHangDTO>> GetAllDonHang();
        Task<List<DonHangDTO>> GetDonHangByNguoiDungId(Guid nguoiDungId);
        Task<List<DonHangDTO>> GetDonHangByPhongBanId(Guid phongBanId);
    }
}
