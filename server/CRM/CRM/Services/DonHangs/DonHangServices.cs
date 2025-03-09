using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.DonHangs;

namespace CRM.Services.DonHangs
{
    public class DonHangServices : BaseServices<DonHang, DonHangModal, Guid, DonHangDTO>, IDonHangServices
    {
        private readonly IDonHangRepository _donHangRepository;
        public DonHangServices(IDonHangRepository donHangRepository) : base(donHangRepository)
        {
            _donHangRepository = donHangRepository;
        }

        public async Task<ResultModal> ConvertDonHang(DonHangModal modal, Guid nguoiDungId, Guid phongBanId)
        {
            return await _donHangRepository.ConvertDonHang(modal, nguoiDungId, phongBanId);
        }
    }
}
