using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.Khaosats;

namespace CRM.Services.KhaoSats
{
    public class KhaoSatServices : BaseServices<KhaoSat, KhaoSatModal, Guid, KhaoSatDTO>, IKhaoSatServices
    {
        private readonly IKhaoSatRepository _khaoSatRepository;
        public KhaoSatServices(IKhaoSatRepository khaoSatRepository) : base(khaoSatRepository)
        {
            _khaoSatRepository = khaoSatRepository;
        }
    }
}
