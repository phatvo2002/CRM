using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.BaoGias;

namespace CRM.Services.BaoGias
{
    public class BaoGiaServices : BaseServices<BaoGia, BaoGiaModal, Guid, BaoGiaDTO>, IBaoGiaServices
    {
        private readonly IBaoGiaRepository _baoGiaRepository;
        public BaoGiaServices(IBaoGiaRepository repository) : base(repository)
        {
            _baoGiaRepository = repository;
        }

        public async Task<ResultModal> ConvertBaoGia(BaoGiaModal baoGiaModal, Guid nguoiDungId, Guid phongBanId)
        {
            return await _baoGiaRepository.ConvertBaoGia(baoGiaModal, nguoiDungId, phongBanId);
        }
    }
}
