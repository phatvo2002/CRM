using CRM.DTO.BaoCaoDTO;

namespace CRM.Services.BaoCaos
{
    public interface IBaoCaoServices
    {
        Task<BaoCaoDTO> GetBaoCaoTheoNguoiDung(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId);
        Task<List<BaoCaoCoHoiDTO>> BaoCaoTheoCoHoi(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId);
        Task<List<BaoCaoResultDTO>> BaoCaoBaoGia(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId);
        Task<List<BaoCaoResultDTO>> BaoCaoDonHang(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId);
        Task<BaoCaoHoatDongDTO> GetBaoCaoHoatDong(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId);
        Task<List<BaoCaoResultDTO>> BaoCaoCuocGoiTheoTrangThai(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId);
        Task<List<BaoCaoTop5KhachHangTuongTac>> BaoCaoTop5KhachHangTuongTac(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId);
        Task<BaoCaoDoanhThuDTO> BaoCaoDoanhThu(DateTime tuNgay, DateTime denNgay);
        Task<List<BaoCaoDoanhThuTheoNamDTO>> BaoCaoDoanhThuTheonam(int nam);
        Task<List<BaoCaoDoanhThuTheoPhongBanDTO>> BaoCaoDoanhThuTheoPhongBan(DateTime tuNgay, DateTime denNgay);
        Task<List<BaoCaoSoSanhMucTieuDTO>> BaoCaoSoSanhMucTieuDoanhSo(DateTime tuNgay, DateTime denNgay, int nam);
        Task<List<BaoCaoResultDTO>> BaoCaoNguonGocKhachHang(DateTime tuNgay, DateTime denNgay);
        Task<List<BaoCaoTop5NhanVienSuatSac>> BaoCaoTop5NhanVienSuatSacNhat(DateTime tuNgay, DateTime denNgay, int type);
        Task<List<BaoCaoTop5NhanVienCoDoanhThuCaoNhat>> BaoCaoTop5NhanVienCoDoanhThuCaoNhat(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId);
        Task<List<BaoCaoSoSanhDoanhThuTheoMucTieuDTO>> BaoCaoSoSanhDoanhThuNhanVien(DateTime tuNgay, DateTime denNgay, Guid phongBanId);
        Task<BaoCaoNhiemVuDTO> BaoCaoNhiemVu(DateTime tuNgay, DateTime denNgay, Guid phongBanId);
        Task<List<BaoCaoTop3NhanVienHoanThanhNhiemVuDTO>> BaoCaoTop3NhanVienHoanThanhNhiemVu(DateTime tuNgay, DateTime denNgay, Guid phongBanId);
        Task<List<BaoCaoResultDTO>> BaoCaoNhiemVuTheoTrangThai(DateTime tuNgay, DateTime denNgay, Guid phongBanId);
        Task<BaoCaoKhaoSatDTO> BaoCaoKhaoSat(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId);

    }
}
