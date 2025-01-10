using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.LoaiDuBaos;

namespace CRM.Services.LoaiDuBaos
{
    public class LoaiDuBaoServices : BaseServices<LoaiDuBao, ClassModal, Guid, ClassDTO>, ILoaiDuBaoServices
    {
        private readonly ILoaiDuBaoRepository _loaiDuBaoRepository;
        public LoaiDuBaoServices(ILoaiDuBaoRepository repository) : base(repository)
        {
            _loaiDuBaoRepository = repository;
        }
    }
}
