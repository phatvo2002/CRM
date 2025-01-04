using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.DonViTinhs;

namespace CRM.Services.DonViTinhs
{
    public class DonViTinhServices : BaseServices<DonViTinh, DonViTinhModal, Guid, DonViTinhDTO>, IDonViTinhServices
    {
        private readonly IDonViTinhRepository _donViTinhRepository;
        public DonViTinhServices(IDonViTinhRepository repository) : base(repository)
        {
            _donViTinhRepository = repository;
        }
    }
}
