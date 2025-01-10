using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.GiaiDoans;

namespace CRM.Services.GIaiDoans
{
    public class GiaiDoanBanHangServices : BaseServices<GiaiDoanBanHang, GIaiDoanBanhangModal , Guid , GiaiDoanBanHangDTO> , IGiaiDoanBanHangServices
    {
        public readonly IGiaiDoanBanhangRepository _giaiDoanBanHangRepository;
        public GiaiDoanBanHangServices(IGiaiDoanBanhangRepository repository) : base(repository) 
        {
            _giaiDoanBanHangRepository = repository;
        }
    }
}
