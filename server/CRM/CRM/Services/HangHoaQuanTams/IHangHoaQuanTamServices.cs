using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Services.HangHoaQuanTams
{
    public interface IHangHoaQuanTamServices : IBaseServices<HangHoaQuanTam, HangHoaQuanTamModal, Guid, HangHoaQuanTamDTO>
    {
        Task<List<HangHoaQuanTamDTO>> GetHangHoaQuanTamByKhachHangTiemNangId(Guid id);
    }
}
