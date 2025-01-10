using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.PhanLoaiDuBaos
{
    public interface IPhanLoaiDuBaoRepository : IBaseRepository<PhanLoaiDuBao, ClassModal, Guid, ClassDTO>
    {
    }
}
