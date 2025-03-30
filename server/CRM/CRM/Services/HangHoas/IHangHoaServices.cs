using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Services.HangHoas
{
    public interface IHangHoaServices : IBaseServices<HangHoa, HangHoaModal, Guid, HangHoaDTO>
    {
        Task<ResultModal> CreateHangHoa(HangHoaModal modal);

        Task<ResultModal> UpdateHangHoa(HangHoaModal modal);
        Task<List<HangHoaDTO>> GetAllHangHoa();
    }
}
