using CRM.DTO.BaoCaoDTO;

namespace CRM.Repositories.BaoCaos
{
    public interface IBaoCaoRepository
    {
        public Task<BaoCaoDTO> GetBaoCaoTheoNguoiDung(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId);
        public Task<List<BaoCaoCoHoiDTO>> BaoCaoTheoCoHoi(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId);
    }
}
