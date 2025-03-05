using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.BaoGias
{
    public interface IBaoGiaRepository : IBaseRepository<BaoGia, BaoGiaModal, Guid, BaoGiaDTO>
    {
        Task<ResultModal> ConvertBaoGia(BaoGiaModal baoGiaModal, Guid nguoiDungId, Guid phongBanId);
        Task<BaoGiaDTO> GetBaoGiaById(Guid id);
        Task<List<BaoGiaDTO>> GetBaoGiaByNguoiDungId(Guid nguoiDungId);
        Task<List<BaoGiaDTO>> GetBaoGiaByPhongBanId(Guid phongBanId);
        Task<ResultModal> PheDuyetBaoGia(Guid baoGiaId, int trangthaiId);
        Task<ResultModal> UpdateSoTienHangHoa(Guid baoGiaId, decimal soTien);
        Task<ResultModal> UpdateTrangThaiBaoGia(Guid baoGiaId, int trangThaiId);
        Task<ResultModal> DeleteBaoGia(Guid id);
    }
}
