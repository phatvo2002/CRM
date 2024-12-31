using CRM.DTO;
using CRM.Repositories.GetDatas;

namespace CRM.Services.GetDatas
{
    public class GetDataServices : IGetDataServices
    {
        private readonly IGetDataRepository _getDataRepository;

        public GetDataServices(IGetDataRepository getDataRepository)
        {
            _getDataRepository = getDataRepository;
        }

        public async Task<List<DoanhThuDTO>> GetAllDoanhThu()
        {
            return await _getDataRepository.GetAllDoanhThu();
        }

        public async Task<List<KetQuaCuocGoiDTO>> GetAllKetQuaCuocGoi()
        {
            return await _getDataRepository.GetAllKetQuaCuocGoi();
        }

        public async Task<List<LinhVucNgheNghiepDTO>> GetAllLinhVucNgheNghiep()
        {
            return await _getDataRepository.GetAllLinhVucNgheNghiep();
        }

        public async Task<List<LoaiCuocGoiDTO>> GetAllLoaiCuocGoi()
        {
            return await _getDataRepository.GetAllLoaiCuocGoi();
        }

        public async Task<List<LoaiHinhNgheNghiepDTO>> GetAllLoaiHinhNgheNghiep()
        {
            return await _getDataRepository.GetAllLoaiHinhNgheNghiep();
        }

        public async Task<List<LoaiTiemNangDTO>> GetAllLoaiTiemNang()
        {
            return await _getDataRepository.GetAllLoaiTiemNang();
        }

        public async Task<List<MucDoUuTienDTO>> GetAllMucDoUuTien()
        {
            return await _getDataRepository.GetAllMucDoUuTien();
        }

        public async Task<List<NganhNgheDTO>> GetAllNganhNgheByLinhVucId(int maLinhVuc)
        {
            return await _getDataRepository.GetAllNganhNgheByLinhVucId(maLinhVuc);
        }

        public async Task<List<NguonGocKhachHangDTO>> GetAllNguonGocKhachHang()
        {
            return await _getDataRepository.GetAllNguonGocKhachHang();
        }

        public async Task<List<PhongBanKhachHangDTO>> GetAllPhongBanKhachHang()
        {
            return await _getDataRepository.GetAllPhongBanKhachHang();
        }

        public async Task<List<TrangThaiThucHienDTO>> GetAllTrangThaiThucHien()
        {
            return await _getDataRepository.GetAllTrangThaiThucHien();
        }
    }
}
