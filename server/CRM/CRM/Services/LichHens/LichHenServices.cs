using CRM.DTO;
using CRM.Modal;
using CRM.Repositories.LichHens;

namespace CRM.Services.LichHens
{
    public class LichHenServices : ILichHenServices
    {
        private readonly ILichHenRepository _lichHenRepository;
        public LichHenServices(ILichHenRepository lichHenRepository)
        {
            _lichHenRepository = lichHenRepository;
        }

        public async Task<ResultModal> CreateLichHen(LichHenModal modal, Guid nguoiDungId, Guid phongBanId)
        {
            return await _lichHenRepository.CreateLichHen(modal, nguoiDungId, phongBanId);
        }

        public async Task<ResultModal> DeleteLichHen(Guid Id)
        {
            return await _lichHenRepository.DeleteLichHen(Id);
        }

        public async Task<List<LichHenDTO>> GetAllLichHen()
        {
            return await _lichHenRepository.GetAllLichHen();
        }

        public async Task<LichHenDTO> GetLichHenById(Guid Id)
        {
            return await _lichHenRepository.GetLichHenById(Id);
        }

        public async Task<List<LichHenDTO>> GetLichHenByKhachHangId(string id)
        {
            return await _lichHenRepository.GetLichHenByKhachHangId(id);
        }

        public async Task<List<LichHenDTO>> GetLichHenByKhachHangTiemNangId(Guid id)
        {
            return await _lichHenRepository.GetLichHenByKhachHangTiemNangId(id);
        }

        public async Task<List<LichHenDTO>> GetLichHenByNguoiDungId(Guid NguoiDungId)
        {
            return await _lichHenRepository.GetLichHenByNguoiDungId(NguoiDungId);
        }

        public async Task<ResultModal> UpdateLichHen(LichHenModal modal, Guid nguoiDungId, Guid phongBanId)
        {
            return await _lichHenRepository.UpdateLichHen(modal, nguoiDungId, phongBanId);
        }
    }
}
