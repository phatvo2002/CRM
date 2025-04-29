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
        public async Task<BaoCaoDTO> GetBaoCaoTheoNguoiDung(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId)
        {
            return await _baoCaoRepository.GetBaoCaoTheoNguoiDung(tuNgay, denNgay, nguoiDungId);
        }
    }
}
