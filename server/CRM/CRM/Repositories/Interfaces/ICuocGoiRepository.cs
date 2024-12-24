using CRM.DTO;
using CRM.Modal;

namespace CRM.Repositories.Interfaces
{
    public interface ICuocGoiRepository
    {
        Task<List<CuocGoiDTO>> GetAllCuocGoi();
        Task<CuocGoiDTO> GetCuocGoiById(Guid Id);
        Task<List<CuocGoiDTO>> GetCuocGoiByKhachHangTiemNangId(Guid Id);
        Task<List<CuocGoiDTO>> GetCuocGoiByNguoiDungId(Guid NguoiDungId);
        Task<ResultModal> CreateCuocGoi(CuocGoiModal modal,Guid nguoiDungId , Guid  phongBanId);
        Task<ResultModal> UpdateCuocGoi(CuocGoiModal modal, Guid nguoiDungId, Guid phongBanId);
        Task<ResultModal> DeleteCuocGoi(Guid Id);
    }
}
