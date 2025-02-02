using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.CoHois
{
    public interface ICoHoiRepository : IBaseRepository<CoHoi, CoHoiModal, Guid, CoHoiDTO>
    {
        Task<ResultModal> ConvertCoHoi(CoHoiModal Modal, Guid nguoiDung, Guid phongBan);
    }
}
