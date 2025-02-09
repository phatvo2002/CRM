using CRM.DTO;
using CRM.Modal;
using CRM.Repositories.CuocGois;

namespace CRM.Services.CuocGois
{
    public class CuocGoiServices : ICuocGoiServices
    {
        private readonly ICuocGoiRepository _cuocGoiRepository;
        public CuocGoiServices(ICuocGoiRepository cuocGoiRepository)
        {
            _cuocGoiRepository = cuocGoiRepository;
        }
        public async Task<ResultModal> CreateCuocGoi(CuocGoiModal modal, Guid nguoiDungId, Guid phongBanId)
        {
            return await _cuocGoiRepository.CreateCuocGoi(modal, nguoiDungId, phongBanId);
        }

        public async Task<ResultModal> DeleteCuocGoi(Guid Id)
        {
            return await _cuocGoiRepository.DeleteCuocGoi(Id);
        }

        public async Task<List<CuocGoiDTO>> GetAllCuocGoi()
        {
            return await _cuocGoiRepository.GetAllCuocGoi();
        }

        public async Task<CuocGoiDTO> GetCuocGoiById(Guid Id)
        {
            return await _cuocGoiRepository.GetCuocGoiById(Id);
        }

        public async Task<List<CuocGoiDTO>> GetCuocGoiByKhachHangId(string Id)
        {
            return await _cuocGoiRepository.GetCuocGoiByKhachHangId(Id);
        }

        public async Task<List<CuocGoiDTO>> GetCuocGoiByKhachHangTiemNangId(Guid Id)
        {
            return await _cuocGoiRepository.GetCuocGoiByKhachHangTiemNangId(Id);
        }

        public async Task<List<CuocGoiDTO>> GetCuocGoiByNguoiDungId(Guid NguoiDungId)
        {
            return await _cuocGoiRepository.GetCuocGoiByNguoiDungId(NguoiDungId);
        }

        public async Task<List<CuocGoiDTO>> GetCuocGoiChuaThucHien(string coHoiId)
        {
            return await _cuocGoiRepository.GetCuocGoiChuaThucHien(coHoiId);
        }

        public async Task<List<CuocGoiDTO>> GetCuocGoiIsThucHien(string coHoiId)
        {
            return await _cuocGoiRepository.GetCuocGoiIsThucHien(coHoiId);
        }

        public async Task<ResultModal> UpdateCuocGoi(CuocGoiModal modal, Guid nguoiDungId, Guid phongBanId)
        {
            return await _cuocGoiRepository.UpdateCuocGoi(modal, nguoiDungId, phongBanId);
        }
    }
}
