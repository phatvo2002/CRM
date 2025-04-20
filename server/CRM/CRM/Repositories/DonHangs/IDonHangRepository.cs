using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.DonHangs
{
    public interface IDonHangRepository : IBaseRepository<DonHang, DonHangModal, Guid, DonHangDTO>
    {
        Task<List<DonHangDTO>> GetAllDonHang();
        Task<List<DonHangDTO>> GetDonHangByNguoiDungId(Guid nguoiDungId);
        Task<List<DonHangDTO>> GetDonHangByKhachHangId(string khachHangId);
        Task<List<DonHangDTO>> GetDonHangByPhongBanId(Guid phongBanId);
        Task<ResultModal> ConvertDonHang(DonHangModal modal, Guid nguoiDungId, Guid phongBanId);
        Task<DonHangDTO> GetDonHangId(Guid id);
        Task<ResultModal> XacNhanDonHang(Guid donHangId);

    }
}
