using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Services.BaoGias
{
    public interface IBaoGiaServices : IBaseServices<BaoGia, BaoGiaModal, Guid, BaoGiaDTO>
    {
        Task<ResultModal> ConvertBaoGia(BaoGiaModal baoGiaModal, Guid nguoiDungId, Guid phongBanId);

    }
}
