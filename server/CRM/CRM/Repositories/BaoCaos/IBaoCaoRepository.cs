using CRM.DTO.BaoCaoDTO;

namespace CRM.Repositories.BaoCaos
{
    public interface IBaoCaoRepository
    {
        Task<BaoCaoDTO> GetBaoCaoTheoNguoiDung(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId);
        Task<BaoCaoHoatDongDTO> GetBaoCaoHoatDong(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId);
        Task<List<BaoCaoCoHoiDTO>> BaoCaoTheoCoHoi(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId);
        Task<List<BaoCaoBaoGiaDTO>> BaoCaoBaoGia(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId);
        Task<List<BaoCaoDonHangDTO>> BaoCaoDonHang(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId);
    }
}
