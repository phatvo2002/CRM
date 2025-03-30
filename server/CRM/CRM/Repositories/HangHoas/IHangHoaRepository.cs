using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.HangHoas
{
    public interface IHangHoaRepository : IBaseRepository<HangHoa, HangHoaModal, Guid, HangHoaDTO>
    {
        Task<List<HangHoaDTO>> GetAllHangHoa();
        Task<ResultModal> CreateHangHoa(HangHoaModal modal);
        Task<ResultModal> UpdateHangHoa(HangHoaModal modal);
    }
}
