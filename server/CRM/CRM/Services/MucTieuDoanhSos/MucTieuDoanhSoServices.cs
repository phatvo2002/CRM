using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.MucTieuDoanhSos;

namespace CRM.Services.MucTieuDoanhSos
{
    public class MucTieuDoanhSoServices : BaseServices<MucTieuDoanhSo, MucTieuDoanhSoModal, Guid, MucTieuDoanhSoDTO>, IMucTieuDoanhSoServices
    {
        private readonly IMucTieuDoanhSoRepository _repository;
        public MucTieuDoanhSoServices(IMucTieuDoanhSoRepository repository) : base(repository)
        {
            _repository = repository;
        }

        public async Task<ResultModal> CreateMucTieuDoanhSo(MucTieuDoanhSoModal modal)
        {
            return await _repository.CreateMucTieuDoanhSo(modal);
        }
    }
}
