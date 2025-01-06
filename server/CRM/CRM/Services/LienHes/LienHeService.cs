using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.LienHes;

namespace CRM.Services.LienHes
{
    public class LienHeService : BaseServices<LienHe, LienHeModal, Guid, LienHeDTO>, ILienHeServices
    {
        private readonly ILienHeRepository _lienHeRepository;
        public LienHeService(ILienHeRepository repository) : base(repository)
        {
            _lienHeRepository = repository;
        }

        public async Task<ResultModal> CreateLienHe(LienHeModal modal, Guid nguoiDungId, Guid phongBanId)
        {
            return await _lienHeRepository.CreateLienHe(modal, nguoiDungId, phongBanId);
        }

        public async Task<List<LienHeDTO>> GetLienHeByKhachHangTiemNangId(Guid id)
        {
            return await _lienHeRepository.GetLienHeByKhachHangTiemNangId(id);
        }
    }
}
