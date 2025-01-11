using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.ThongBaos;

namespace CRM.Services.ThongBaos
{
    public class ThongBaoServices : BaseServices<ThongBao, ThongBaoModal, Guid, ThongBaoDTO>, IThongBaoServices
    {
        private readonly IThongBaoRepository _thongBaoRepository;
        public ThongBaoServices(IThongBaoRepository repository) : base(repository)
        {
            _thongBaoRepository = repository;
        }

        public async Task CheckDocThongBao(Guid thongBaoId)
        {
            await _thongBaoRepository.CheckDocThongBao(thongBaoId);
        }

        public async Task<ResultModal> CheckThongBao()
        {
            return await _thongBaoRepository.CheckThongBao();
        }

        public async Task<List<ThongBaoDTO>> GetThongBaoByNguoiDungId(Guid nguoiDungId)
        {
            return await _thongBaoRepository.GetThongBaoByNguoiDungId(nguoiDungId);
        }
    }
}
