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

        public async Task<ResultModal> DeleteBaoGia(Guid id)
        {
            return await _baoGiaRepository.DeleteBaoGia(id);
        }

        public async Task<BaoGiaDTO> GetBaoGiaById(Guid id)
        {
            return await _baoGiaRepository.GetBaoGiaById(id);
        }

        public async Task<List<BaoGiaDTO>> GetBaoGiaByNguoiDungId(Guid nguoiDungId)
        {
            return await _baoGiaRepository.GetBaoGiaByNguoiDungId(nguoiDungId);
        }

        public async Task<List<BaoGiaDTO>> GetBaoGiaByPhongBanId(Guid phongBanId)
        {
            return await _baoGiaRepository.GetBaoGiaByPhongBanId(phongBanId);
        }

        public async Task<ResultModal> PheDuyetBaoGia(Guid baoGiaId, int trangthaiId)
        {
            return await _baoGiaRepository.PheDuyetBaoGia(baoGiaId, trangthaiId);
        }

        public async Task<ResultModal> UpdateSoTienHangHoa(Guid baoGiaId, decimal soTien)
        {
            return await _baoGiaRepository.UpdateSoTienHangHoa(baoGiaId, soTien);
        }
    }
}
