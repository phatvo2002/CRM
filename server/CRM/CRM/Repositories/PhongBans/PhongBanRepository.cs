using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using Microsoft.EntityFrameworkCore;

namespace CRM.Repositories.PhongBans
{
    public class PhongBanRepository : IPhongBanRepository
    {
        private readonly CrmDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<PhongBanRepository> _logger;


        public PhongBanRepository(CrmDbContext context, IMapper mapper, ILogger<PhongBanRepository> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<ResultModal> CreatePhongBan(PhongBanModel model)
        {
            try
            {
                PhongBan phongBan = new PhongBan();
                phongBan.Id = Guid.NewGuid();
                phongBan.SoThuTu = model.Stt;
                phongBan.MoTa = model.MoTa;
                phongBan.TenPhongBan = model.TenPhongban;
                phongBan.MaQuanLy = model.MaQuanLy;
                phongBan.IsActive = model.IsAcTive;
                _context.PhongBans.Add(phongBan);
                await _context.SaveChangesAsync();
                return new ResultModal() { Status = 200, Message = "Thêm mới thành công", Success = true };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };
            }

        }

        public async Task<ResultModal> DeletePhongBan(Guid id)
        {
            var db = _context.PhongBans.FirstOrDefault(b => b.Id == id);
            if (db != null)
            {
                _context.PhongBans.Remove(db);
                await _context.SaveChangesAsync();
                return new ResultModal() { Status = 200, Message = "Xóa phòng ban thành công", Success = true };
            }
            else
            {
                return new ResultModal() { Status = 202, Message = "Đã có lỗi xảy ra", Success = false };
            }
        }

        public async Task<List<PhongBanDTO>> GetAllPhongBan()
        {
            var db = await _context.PhongBans.Include(e => e.Nguoidung).ThenInclude(r => r.ChucVu).OrderBy(r => r.SoThuTu).ToListAsync();
            return _mapper.Map<List<PhongBanDTO>>(db);
        }

        public async Task<PhongBanDTO> GetPhongBanById(Guid id)
        {

            var db = await _context.PhongBans.Where(r => r.Id == id).AsNoTracking().FirstOrDefaultAsync();
            return _mapper.Map<PhongBanDTO>(db);
        }

        public async Task<ResultModal> UpdatePhongBan(PhongBanModel model, Guid phongBanId)
        {
            var db = _context.PhongBans.FirstOrDefault(r => r.Id == phongBanId);
            try
            {
                if (db != null)
                {
                    db.MaQuanLy = model.MaQuanLy;
                    db.MoTa = model.MoTa;
                    db.SoThuTu = model.Stt;
                    db.TenPhongBan = model.TenPhongban;
                    db.IsActive = model.IsAcTive;
                    _context.PhongBans.Update(db);
                    await _context.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Cập nhật thành công", Success = false };
                }
                return new ResultModal() { Status = 202, Message = "Đã có lỗi xảy ra", Success = false };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };
            }

        }
    }
}
