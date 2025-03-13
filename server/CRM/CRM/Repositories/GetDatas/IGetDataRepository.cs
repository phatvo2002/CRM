using CRM.DTO;

namespace CRM.Repositories.GetDatas
{
    public interface IGetDataRepository
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
        Task<List<ClassDTO>> GetAllTinhTrangBaoGia();
        Task<List<ClassDTO>> GetAllTinhTrangDonHang();
        Task<List<ClassDTO>> GetAllLoaiDoanhang();
        Task<List<ClassDTO>> GetAllTinhTrangGhiDoanhSo();
    }
}
