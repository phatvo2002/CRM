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

        public async Task<ResultModal> CapNhatThucThuDonHang(Guid id, decimal soTien)
        {
            return await _donHangRepository.CapNhatThucThuDonHang(id, soTien);
        }

        public async Task<ResultModal> ConvertDonHang(DonHangModal modal, Guid nguoiDungId, Guid phongBanId)
        {
            return await _donHangRepository.ConvertDonHang(modal, nguoiDungId, phongBanId);
        }

        public async Task<List<DonHangDTO>> GetAllDonHang(DateTime tuNgay, DateTime denNgay)
        {
            return await _donHangRepository.GetAllDonHang(tuNgay, denNgay);
        }

        public Task<DonHangDTO> GetDonHangById(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<DonHangDTO>> GetDonHangByKhachHangId(string khachHangId)
        {
            return await _donHangRepository.GetDonHangByKhachHangId(khachHangId);
        }

        public async Task<List<DonHangDTO>> GetDonHangByNguoiDungId(Guid nguoiDungId, DateTime tuNgay, DateTime denNgay)
        {
            return await _donHangRepository.GetDonHangByNguoiDungId(nguoiDungId, tuNgay, denNgay);
        }

        public async Task<List<DonHangDTO>> GetDonHangByPhongBanId(Guid phongBanId, DateTime tuNgay, DateTime denNgay)
        {
            return await _donHangRepository.GetDonHangByPhongBanId(phongBanId, tuNgay, denNgay);
        }

        public async Task<DonHangDTO> GetDonHangId(Guid id)
        {
            return await _donHangRepository.GetDonHangId(id);
        }

        public async Task<ResultModal> XacNhanDonHang(XacNhanDonHangModal modal)
        {
            return await _donHangRepository.XacNhanDonHang(modal);
        }
    }
}
