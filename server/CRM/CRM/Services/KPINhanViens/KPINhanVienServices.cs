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
    }
}
