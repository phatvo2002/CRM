using CRM.DTO.BaoCaoDTO;

namespace CRM.Repositories.BaoCaos
{
    public interface IBaoCaoRepository
    {
        Task<BaoCaoDTO> GetBaoCaoTheoNguoiDung(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId);
        Task<BaoCaoHoatDongDTO> GetBaoCaoHoatDong(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId);
        Task<List<BaoCaoCoHoiDTO>> BaoCaoTheoCoHoi(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId);
        Task<List<BaoCaoResultDTO>> BaoCaoBaoGia(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId);
        Task<List<BaoCaoResultDTO>> BaoCaoDonHang(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId);
        Task<List<BaoCaoResultDTO>> BaoCaoCuocGoiTheoTrangThai(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId);
        Task<List<BaoCaoTop5KhachHangTuongTac>> BaoCaoTop5KhachHangTuongTac(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId);
        Task<BaoCaoDoanhThuDTO> BaoCaoDoanhThu(DateTime tuNgay, DateTime denNgay);
    }
}
