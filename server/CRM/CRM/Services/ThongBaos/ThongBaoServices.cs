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
    }
}
