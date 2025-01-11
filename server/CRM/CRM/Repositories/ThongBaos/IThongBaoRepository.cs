using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.ThongBaos
{
    public interface IThongBaoRepository : IBaseRepository<ThongBao, ThongBaoModal, Guid, ThongBaoDTO>
    {
        Task<List<ThongBaoDTO>> GetThongBaoByNguoiDungId(Guid nguoiDungId);

        Task<ResultModal> CheckThongBao();
        Task CheckDocThongBao(Guid thongBaoId);
    }
}
