using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.MucTieuDoanhSos
{
    public interface IMucTieuDoanhSoRepository : IBaseRepository<MucTieuDoanhSo, MucTieuDoanhSoModal, Guid, MucTieuDoanhSoDTO>
    {
        Task<List<MucTieuDoanhSoDTO>> GetAll(DateTime tuNgay, DateTime denNgay);
        Task<List<MucTieuDoanhSoDTO>> GetAllByPhongBan(DateTime tuNgay, DateTime denNgay, Guid phongBanId);
        Task<ResultModal> CreateMucTieuDoanhSo(MucTieuDoanhSoModal modal, Guid nguoiDungId);
        Task<ResultModal> UpdateMucTieuDoanhSo(MucTieuDoanhSoModal modal);
        Task<ResultModal> UpdateMucTieuDoanhSoData(Guid nguoiDungId, Guid phongBanId, DateTime tuNgay, DateTime denNgay, int type, double? doanhSo);
    }
}
