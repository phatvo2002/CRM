using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.PhanLoaiDuBaos;

namespace CRM.Services.PhanLoaiDuBaos
{
    public class PhanLoaiDuBaoServices : BaseServices<PhanLoaiDuBao, ClassModal, Guid, ClassDTO>, IPhanLoaiDuBaoServices
    {
        private readonly IPhanLoaiDuBaoRepository _phanLoaiDuBaoRepository;

        public PhanLoaiDuBaoServices(IPhanLoaiDuBaoRepository repository) : base(repository)
        {
            _phanLoaiDuBaoRepository = repository;

        }
    }
}
