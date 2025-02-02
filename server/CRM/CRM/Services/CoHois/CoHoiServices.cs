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
    }
}
