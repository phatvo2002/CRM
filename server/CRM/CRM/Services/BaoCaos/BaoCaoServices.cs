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
        public async Task<BaoCaoDoanhThuDTO> BaoCaoDoanhThu(DateTime tuNgay, DateTime denNgay)
        {
            return await _baoCaoRepository.BaoCaoDoanhThu(tuNgay, denNgay);
        }

        public async Task<List<BaoCaoDoanhThuTheoNamDTO>> BaoCaoDoanhThuTheonam(int nam)
        {
            return await _baoCaoRepository.BaoCaoDoanhThuTheonam(nam);
        }

        public async Task<List<BaoCaoDoanhThuTheoPhongBanDTO>> BaoCaoDoanhThuTheoPhongBan(DateTime tuNgay, DateTime denNgay)
        {
            return await _baoCaoRepository.BaoCaoDoanhThuTheoPhongBan(tuNgay, denNgay);
        }

        public async Task<List<BaoCaoSoSanhMucTieuDTO>> BaoCaoSoSanhMucTieuDoanhSo(DateTime tuNgay, DateTime denNgay, int nam)
        {
            return await _baoCaoRepository.BaoCaoSoSanhMucTieuDoanhSo(tuNgay, denNgay, nam);
        }

        public async Task<List<BaoCaoResultDTO>> BaoCaoNguonGocKhachHang(DateTime tuNgay, DateTime denNgay)
        {
            return await _baoCaoRepository.BaoCaoNguonGocKhachHang(tuNgay, denNgay);
        }

        public async Task<List<BaoCaoTop5NhanVienSuatSac>> BaoCaoTop5NhanVienSuatSacNhat(DateTime tuNgay, DateTime denNgay, int type)
        {
            return await _baoCaoRepository.BaoCaoTop5NhanVienSuatSacNhat(tuNgay, denNgay, type);
        }

        public async Task<List<BaoCaoTop5NhanVienCoDoanhThuCaoNhat>> BaoCaoTop5NhanVienCoDoanhThuCaoNhat(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId)
        {
            return await _baoCaoRepository.BaoCaoTop5NhanVienCoDoanhThuCaoNhat(tuNgay, denNgay, nguoiDungId);
        }

        public async Task<List<BaoCaoSoSanhDoanhThuTheoMucTieuDTO>> BaoCaoSoSanhDoanhThuNhanVien(DateTime tuNgay, DateTime denNgay, Guid phongBanId)
        {
            return await _baoCaoRepository.BaoCaoSoSanhDoanhThuNhanVien(tuNgay, denNgay, phongBanId);
        }
    }
}
