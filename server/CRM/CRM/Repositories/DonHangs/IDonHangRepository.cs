using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.DonHangs
{
    public interface IDonHangRepository : IBaseRepository<DonHang, DonHangModal, Guid, DonHangDTO>
    {
        Task<ResultModal> ConvertDonHang(DonHangModal modal, Guid nguoiDungId, Guid phongBanId);
        Task<DonHangDTO> GetDonHangId(Guid id);

    }
}
