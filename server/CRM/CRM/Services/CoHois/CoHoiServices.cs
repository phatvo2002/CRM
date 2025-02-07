using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.CoHois;

namespace CRM.Services.CoHois
{
    public class CoHoiServices : BaseServices<CoHoi, CoHoiModal, Guid, CoHoiDTO>, ICoHoiServices
    {
        private readonly ICoHoiRepository _coHoiRepository;
        public CoHoiServices(ICoHoiRepository repository) : base(repository)
        {
            _coHoiRepository = repository;
        }

        public async Task<ResultModal> ConvertCoHoi(CoHoiModal modal, Guid nguoiDung, Guid phongBan)
        {
            return await _coHoiRepository.ConvertCoHoi(modal, nguoiDung, phongBan);
        }

        public async Task<CoHoiDTO> GetCoHoiById(string id)
        {
            return await _coHoiRepository.GetCoHoiById(id);
        }

        public async Task<List<CoHoiDTO>> GetCoHoiByNguoiDungId(Guid nguoiDungId)
        {
            return await _coHoiRepository.GetCoHoiByNguoiDungId(nguoiDungId);
        }

        public async Task<List<CoHoiDTO>> GetCoHoiByPhongBanId(Guid phongBanId)
        {
            return await _coHoiRepository.GetCoHoiByPhongBanId(phongBanId);
        }

        public async Task<ResultModal> UpdateGiaiDoan(string cohoiId, Guid giaiDoanId)
        {
            return await _coHoiRepository.UpdateGiaiDoan(cohoiId, giaiDoanId);
        }
    }
}
