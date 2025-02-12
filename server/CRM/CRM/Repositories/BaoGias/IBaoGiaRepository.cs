using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.BaoGias
{
    public interface IBaoGiaRepository : IBaseRepository<BaoGia, BaoGiaModal, Guid, BaoGiaDTO>
    {
        Task<ResultModal> ConvertBaoGia(BaoGiaModal baoGiaModal, Guid nguoiDungId, Guid phongBanId);

    }
}
