using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Services.HangHoaQuanTams
{
    public interface IHangHoaQuanTamServices : IBaseServices<HangHoaQuanTam, HangHoaQuanTamModal, Guid, HangHoaQuanTamDTO>
    {
        Task<List<HangHoaQuanTamDTO>> GetHangHoaQuanTamByKhachHangTiemNangId(Guid id);
        Task<List<HangHoaQuanTamDTO>> GetHangHoaQuanTamByKhachHangId(string id);
        Task<List<HangHoaQuanTamDTO>> GetHangHoaQuanTamByCoHoiId(string id);
        Task<List<HangHoaQuanTamDTO>> GetHangHoaQuanTamByBaoGiaId(Guid id);
        Task<ResultModal> UpdateHangHoaQuanTam(List<HangHoaQuanTamModal> hanghoaquantam);

    }
}
