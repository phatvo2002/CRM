using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Services.KhaoSats
{
    public interface IKhaoSatServices : IBaseServices<KhaoSat, KhaoSatModal, Guid, KhaoSatDTO>
    {
    }
}
