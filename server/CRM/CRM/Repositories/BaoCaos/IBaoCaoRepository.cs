using CRM.DTO.BaoCaoDTO;

namespace CRM.Repositories.BaoCaos
{
    public interface IBaoCaoRepository
    {
        public Task<BaoCaoDTO> GetBaoCaoTheoNguoiDung(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId, Guid phongBanId);
    }
}
