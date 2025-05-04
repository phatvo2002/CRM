using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.Khaosats
{
    public interface IKhaoSatRepository : IBaseRepository<KhaoSat, KhaoSatModal, Guid, KhaoSatDTO>
    {
    }
}
