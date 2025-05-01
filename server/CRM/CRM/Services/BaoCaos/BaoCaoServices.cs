using CRM.DTO.BaoCaoDTO;
using CRM.Repositories.BaoCaos;

namespace CRM.Services.BaoCaos
{
    public class BaoCaoServices : IBaoCaoServices
    {
        private readonly IBaoCaoRepository _baoCaoRepository;
        public BaoCaoServices(IBaoCaoRepository baoCaoRepository)
        {
            _baoCaoRepository = baoCaoRepository;
        }

        public async Task<List<BaoCaoResultDTO>> BaoCaoBaoGia(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId)
        {
            return await _baoCaoRepository.BaoCaoBaoGia(tuNgay, denNgay, nguoiDungId);
        }

        public async Task<List<BaoCaoResultDTO>> BaoCaoCuocGoiTheoTrangThai(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId)
        {
            return await _baoCaoRepository.BaoCaoCuocGoiTheoTrangThai(tuNgay, denNgay, nguoiDungId);
        }

        public async Task<List<BaoCaoResultDTO>> BaoCaoDonHang(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId)
        {
            return await _baoCaoRepository.BaoCaoDonHang(tuNgay, denNgay, nguoiDungId);
        }

        public async Task<List<BaoCaoCoHoiDTO>> BaoCaoTheoCoHoi(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId)
        {
            return await _baoCaoRepository.BaoCaoTheoCoHoi(tuNgay, denNgay, nguoiDungId);
        }

        public async Task<List<BaoCaoTop5KhachHangTuongTac>> BaoCaoTop5KhachHangTuongTac(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId)
        {
            return await _baoCaoRepository.BaoCaoTop5KhachHangTuongTac(tuNgay, denNgay, nguoiDungId);
        }

        public async Task<BaoCaoHoatDongDTO> GetBaoCaoHoatDong(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId)
        {
            return await _baoCaoRepository.GetBaoCaoHoatDong(tuNgay, denNgay, nguoiDungId);
        }

        public async Task<BaoCaoDTO> GetBaoCaoTheoNguoiDung(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId)
        {
            return await _baoCaoRepository.GetBaoCaoTheoNguoiDung(tuNgay, denNgay, nguoiDungId);
        }
    }
}
