using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.LoaiDuBaos
{
    public interface ILoaiDuBaoRepository : IBaseRepository<LoaiDuBao, ClassModal, Guid, ClassDTO>
    {
    }
}
