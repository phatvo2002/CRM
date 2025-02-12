using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.HangHoaQuanTams;

namespace CRM.Services.HangHoaQuanTams
{
    public class HangHoaQuanTamServices : BaseServices<HangHoaQuanTam, HangHoaQuanTamModal, Guid, HangHoaQuanTamDTO>, IHangHoaQuanTamServices
    {
        private readonly IHangHoaQuanTamRepository _hangHoaQuanTamRepository;
        public HangHoaQuanTamServices(IHangHoaQuanTamRepository repository) : base(repository)
        {
            _hangHoaQuanTamRepository = repository;
        }

        public async Task<List<HangHoaQuanTamDTO>> GetHangHoaQuanTamByCoHoiId(string id)
        {
            return await _hangHoaQuanTamRepository.GetHangHoaQuanTamByCoHoiId(id);
        }

        public async Task<List<HangHoaQuanTamDTO>> GetHangHoaQuanTamByKhachHangId(string id)
        {
            return await _hangHoaQuanTamRepository.GetHangHoaQuanTamByKhachHangId(id);
        }

        public async Task<List<HangHoaQuanTamDTO>> GetHangHoaQuanTamByKhachHangTiemNangId(Guid id)
        {
            return await _hangHoaQuanTamRepository.GetHangHoaQuanTamByKhachHangTiemNangId(id);
        }
    }
}
