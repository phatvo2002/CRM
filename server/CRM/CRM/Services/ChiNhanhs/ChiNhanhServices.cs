using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.ChiNhanhs;

namespace CRM.Services.ChiNhanhs
{
    public class ChiNhanhServices : BaseServices<ChiNhanh , ChiNhanhModal , Guid , ChiNhanhDTO> , IChiNhanhServices
    {
        private readonly IChiNhanhRepository _repository;
        public ChiNhanhServices(IChiNhanhRepository repository) : base(repository) { 
           _repository = repository;
        }
    }
}
