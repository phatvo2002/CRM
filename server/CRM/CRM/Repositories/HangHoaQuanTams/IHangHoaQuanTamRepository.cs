using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.HangHoaQuanTams
{
    public interface IHangHoaQuanTamRepository : IBaseRepository<HangHoaQuanTam, HangHoaQuanTamModal, Guid, HangHoaQuanTamDTO>
    {
        Task<List<HangHoaQuanTamDTO>> GetHangHoaQuanTamByKhachHangTiemNangId(Guid id);
        Task<List<HangHoaQuanTamDTO>> GetHangHoaQuanTamByKhachHangId(string id);
        Task<List<HangHoaQuanTamDTO>> GetHangHoaQuanTamByCoHoiId(string id);
    }
}
