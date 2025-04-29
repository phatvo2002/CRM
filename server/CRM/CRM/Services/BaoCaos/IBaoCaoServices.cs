using CRM.DTO.BaoCaoDTO;

namespace CRM.Services.BaoCaos
{
    public interface IBaoCaoServices
    {
        Task<BaoCaoDTO> GetBaoCaoTheoNguoiDung(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId);
    }
}
