using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.KPINhanViens;

namespace CRM.Services.KPINhanViens
{
    public class KPINhanVienServices : BaseServices<KPINhanVien, KPINhanVienModal, Guid, KPINhanVienDTO>, IKPIServices
    {
        private readonly IKPINhanVienRepository _kPINhanVienRepository;

        public KPINhanVienServices(IKPINhanVienRepository kPINhanVienRepository) : base(kPINhanVienRepository)
        {
            _kPINhanVienRepository = kPINhanVienRepository;
        }

        public async Task<ResultModal> CreateKPINhanVien(KPINhanVienModal modal, Guid phongBanId)
        {
            return await _kPINhanVienRepository.CreateKPINhanVien(modal, phongBanId);
        }

        public async Task<KPINhanVienDTO> GetByNhanVienId(Guid id, DateTime tuNgay, DateTime denNgay)
        {
            return await _kPINhanVienRepository.GetByNhanVienId(id, tuNgay, denNgay);
        }

        public async Task<ResultModal> UpdateKPINhanVien(KPINhanVienModal modal)
        {
            return await _kPINhanVienRepository.UpdateKPINhanVien(modal);
        }
    }
}
