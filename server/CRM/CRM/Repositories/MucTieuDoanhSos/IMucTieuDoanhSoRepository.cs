using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.MucTieuDoanhSos
{
    public interface IMucTieuDoanhSoRepository : IBaseRepository<MucTieuDoanhSo, MucTieuDoanhSoModal, Guid, MucTieuDoanhSoDTO>
    {
        Task<ResultModal> CreateMucTieuDoanhSo(MucTieuDoanhSoModal modal);
    }
}
