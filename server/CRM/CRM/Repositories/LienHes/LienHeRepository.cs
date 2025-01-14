using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using Microsoft.EntityFrameworkCore;

namespace CRM.Repositories.LienHes
{
    public class LienHeRepository : BaseRepository<LienHe, LienHeModal, Guid, LienHeDTO>, ILienHeRepository
    {
        public LienHeRepository(CrmDbContext crmDbContext, IMapper mapper) : base(crmDbContext, mapper)
        {
        }

        public async Task<ResultModal> CreateLienHe(LienHeModal modal, Guid nguoiDungId, Guid phongBanId)
        {
            var db = _crmDbContext.LienHes.FirstOrDefault(r => r.Id == modal.Id);
            try
            {
                if (db == null)
                {
                    LienHe lienHe = new LienHe();
                    lienHe.Id = modal.Id;
                    lienHe.TenLienHe = modal.TenLienHe;
                    lienHe.XungHo = modal.XungHo;
                    lienHe.Email = modal.Email;
                    lienHe.SoDienThoai = modal.SoDienThoai;
                    lienHe.KhachHangTiemNangId = modal.KhachHangTiemNangId;
                    lienHe.KhachHangId = modal.KhachHangId;
                    lienHe.IsDeleted = false;
                    lienHe.CreateAt = DateTime.Now;
                    lienHe.PhongBanId = phongBanId;
                    lienHe.NguoiDungId = nguoiDungId;
                    _crmDbContext.LienHes.Add(lienHe);
                    await _crmDbContext.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Thêm mới liên hệ thành công", Success = true };
                }
                return new ResultModal() { Status = 202, Message = "Dữ liệu đã tồn tại trong hệ thống", Success = false };
            }
            catch (Exception ex)
            {
                return new ResultModal() { Status = 500, Message = ex.Message, Success = true };
            }
        }

        public async Task<List<LienHeDTO>> GetLienHeByKhachHangMucTieuId(string id)
        {
            var db = await _crmDbContext.LienHes.Where(r=> r.KhachHangId == id).ToListAsync();
            return _mapper.Map<List<LienHeDTO>>(db);
        }

        public async Task<List<LienHeDTO>> GetLienHeByKhachHangTiemNangId(Guid id)
        {
            var db = await _crmDbContext.LienHes.Where(r => r.KhachHangTiemNangId == id).ToListAsync();
            return _mapper.Map<List<LienHeDTO>>(db);
        }
    }
}
