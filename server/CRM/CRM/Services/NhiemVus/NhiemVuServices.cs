using CRM.DTO;
using CRM.Modal;
using CRM.Repositories.NhiemVus;

namespace CRM.Services.NhiemVus
{
    public class NhiemVuServices : INhiemVuServices
    {
        private readonly INhiemVuRepository _nhiemVuRepository;
        public NhiemVuServices(INhiemVuRepository nhiemVuRepository)
        {
            _nhiemVuRepository = nhiemVuRepository;
        }

        public async Task<ResultModal> CreateNhiemVu(NhiemVuModal modal, Guid phongBanId)
        {
            return await _nhiemVuRepository.CreateNhiemVu(modal, phongBanId);
        }

        public async Task<ResultModal> DeleteNhiemVu(Guid Id)
        {
            return await _nhiemVuRepository.DeleteNhiemVu(Id);
        }

        public async Task<List<NhiemVuDTO>> GetAllNhiemVu()
        {
            return await _nhiemVuRepository.GetAllNhiemVu();
        }

        public async Task<NhiemVuDTO> GetNhiemVuById(Guid Id)
        {
            return await _nhiemVuRepository.GetNhiemVuById(Id);
        }

        public async Task<List<NhiemVuDTO>> GetNhiemVuByKhachHangId(string id)
        {
            return await _nhiemVuRepository.GetNhiemVuByKhachHangId(id);
        }

        public async Task<List<NhiemVuDTO>> GetNhiemVuByKhachHangTiemNangId(Guid id)
        {
            return await _nhiemVuRepository.GetNhiemVuByKhachHangTiemNangId(id);
        }

        public async Task<List<NhiemVuDTO>> GetNhiemVuByNguoiDungId(Guid NguoiDungId)
        {
            return await _nhiemVuRepository.GetNhiemVuByNguoiDungId(NguoiDungId);
        }

        public async Task<List<NhiemVuDTO>> GetNhiemVuByPhongBanId(Guid phongBan)
        {
            return await _nhiemVuRepository.GetNhiemVuByPhongBanId(phongBan);
        }

        public async Task<ResultModal> UpdateNhiemVu(NhiemVuModal modal, Guid nguoiDungId, Guid phongBanId)
        {
            return await _nhiemVuRepository.UpdateNhiemVu(modal, nguoiDungId, phongBanId);
        }
    }
}
