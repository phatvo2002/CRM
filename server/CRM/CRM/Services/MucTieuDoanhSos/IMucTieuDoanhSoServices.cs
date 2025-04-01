using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Services.MucTieuDoanhSos
{
    public interface IMucTieuDoanhSoServices : IBaseServices<MucTieuDoanhSo, MucTieuDoanhSoModal, Guid, MucTieuDoanhSoDTO>
    {
        Task<ResultModal> CreateMucTieuDoanhSo(MucTieuDoanhSoModal modal);
    }
}
