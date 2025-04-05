using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Services.MucTieuDoanhSos
{
    public interface IMucTieuDoanhSoServices : IBaseServices<MucTieuDoanhSo, MucTieuDoanhSoModal, Guid, MucTieuDoanhSoDTO>
    {
        Task<List<MucTieuDoanhSoDTO>> GetAll(DateTime tuNgay, DateTime denNgay);
        Task<List<MucTieuDoanhSoDTO>> GetAllByPhongBan(DateTime tuNgay, DateTime denNgay, Guid phongBanId);
        Task<ResultModal> CreateMucTieuDoanhSo(MucTieuDoanhSoModal modal, Guid nguoiDungId);
    }
}
