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

        public async Task<List<DonHangDTO>> GetAllDonHang()
        {
            return await _donHangRepository.GetAllDonHang();
        }

        public Task<DonHangDTO> GetDonHangById(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<DonHangDTO>> GetDonHangByKhachHangId(string khachHangId)
        {
            return await _donHangRepository.GetDonHangByKhachHangId(khachHangId);
        }

        public async Task<List<DonHangDTO>> GetDonHangByNguoiDungId(Guid nguoiDungId)
        {
            return await _donHangRepository.GetDonHangByNguoiDungId(nguoiDungId);
        }

        public async Task<List<DonHangDTO>> GetDonHangByPhongBanId(Guid phongBanId)
        {
            return await _donHangRepository.GetDonHangByPhongBanId(phongBanId);
        }

        public async Task<DonHangDTO> GetDonHangId(Guid id)
        {
            return await _donHangRepository.GetDonHangId(id);
        }

        public async Task<ResultModal> XacNhanDonHang(Guid donHangId)
        {
            return await _donHangRepository.XacNhanDonHang(donHangId);
        }
    }
}
