using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Services.ThongBaos
{
    public interface IThongBaoServices : IBaseServices<ThongBao, ThongBaoModal, Guid, ThongBaoDTO>
    {
        Task<List<ThongBaoDTO>> GetThongBaoByNguoiDungId(Guid nguoiDungId);
        Task<List<ThongBaoDTO>> GetThongBaoByNguoiDungIdNotRead(Guid nguoiDungId);
        Task<ResultModal> CheckThongBao();

        Task CheckDocThongBao(Guid thongBaoId);
    }
}
