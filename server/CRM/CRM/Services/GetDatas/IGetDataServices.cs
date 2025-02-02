using CRM.DTO;

namespace CRM.Services.GetDatas
{
    public interface IGetDataServices
    {
        Task<List<PhongBanKhachHangDTO>> GetAllPhongBanKhachHang();
        Task<List<NguonGocKhachHangDTO>> GetAllNguonGocKhachHang();
        Task<List<LoaiTiemNangDTO>> GetAllLoaiTiemNang();
        Task<List<LoaiHinhNgheNghiepDTO>> GetAllLoaiHinhNgheNghiep();
        Task<List<NganhNgheDTO>> GetAllNganhNgheByLinhVucId(int maLinhVuc);
        Task<List<LinhVucNgheNghiepDTO>> GetAllLinhVucNgheNghiep();
        Task<List<DoanhThuDTO>> GetAllDoanhThu();
        Task<List<TrangThaiThucHienDTO>> GetAllTrangThaiThucHien();
        Task<List<MucDoUuTienDTO>> GetAllMucDoUuTien();
        Task<List<LoaiCuocGoiDTO>> GetAllLoaiCuocGoi();
        Task<List<KetQuaCuocGoiDTO>> GetAllKetQuaCuocGoi();
        Task<List<ClassDTO>> GetAllPhanLoaiDuBao();
        Task<List<ClassDTO>> GetAllLoaiDuBao();
        Task<List<ClassDTO>> GetAllLoaiCoHoi();
    }
}
