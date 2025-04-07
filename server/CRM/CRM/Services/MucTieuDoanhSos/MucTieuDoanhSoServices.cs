using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.MucTieuDoanhSos;

namespace CRM.Services.MucTieuDoanhSos
{
    public class MucTieuDoanhSoServices : BaseServices<MucTieuDoanhSo, MucTieuDoanhSoModal, Guid, MucTieuDoanhSoDTO>, IMucTieuDoanhSoServices
    {
        private readonly IMucTieuDoanhSoRepository _mucTieuDoanhSoRepository;
        public MucTieuDoanhSoServices(IMucTieuDoanhSoRepository repository) : base(repository)
        {
            _mucTieuDoanhSoRepository = repository;
        }

        public async Task<ResultModal> CreateMucTieuDoanhSo(MucTieuDoanhSoModal modal, Guid nguoiDungId)
        {
            return await _mucTieuDoanhSoRepository.CreateMucTieuDoanhSo(modal, nguoiDungId);
        }

        public async Task<List<MucTieuDoanhSoDTO>> GetAll(DateTime tuNgay, DateTime denNgay)
        {
            return await _mucTieuDoanhSoRepository.GetAll(tuNgay, denNgay);
        }

        public async Task<List<MucTieuDoanhSoDTO>> GetAllByPhongBan(DateTime tuNgay, DateTime denNgay, Guid phongBanId)
        {
            return await _mucTieuDoanhSoRepository.GetAllByPhongBan(tuNgay, denNgay, phongBanId);
        }

        public async Task<ResultModal> UpdateMucTieuDoanhSo(MucTieuDoanhSoModal modal)
        {
            return await _mucTieuDoanhSoRepository.UpdateMucTieuDoanhSo(modal);
        }
    }
}
