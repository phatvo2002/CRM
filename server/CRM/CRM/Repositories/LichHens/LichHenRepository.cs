using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using Microsoft.EntityFrameworkCore;

namespace CRM.Repositories.LichHens
{
    public class LichHenRepository : ILichHenRepository
    {
        private readonly CrmDbContext _context;
        private readonly ILogger<LichHenRepository> _logger;
        private readonly IMapper _mapper;

        public LichHenRepository(CrmDbContext context, IMapper mapper, ILogger<LichHenRepository> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }
        public async Task<ResultModal> CreateLichHen(LichHenModal modal, Guid nguoiDungId, Guid phongBanId)
        {
            var db = _context.LichHens.FirstOrDefault(r => r.Id == modal.Id);
            try
            {
                if (db == null)
                {
                    LichHen lichHen = new LichHen();
                    lichHen.Id = Guid.NewGuid();
                    lichHen.TieuDe = modal.TieuDe;
                    lichHen.MoTa = modal.MoTa;
                    lichHen.NgayBatDau = modal.NgayBatDau;
                    lichHen.NgayKetThuc = modal.NgayKetThuc;
                    lichHen.DiaDiem = modal.DiaDiem;
                    lichHen.TrangThaiThucHienId = modal.TrangThaiThucHienId;
                    lichHen.KhachHangTiemNangId = modal.KhachHangTiemNangId;
                    lichHen.KhachHangMucTieuId = modal.KhachHangMucTieuId;
                    lichHen.CoHoiId = modal.CoHoiId;
                    lichHen.IsDeleted = false;
                    lichHen.NguoiDungId = nguoiDungId;
                    lichHen.PhongBanId = phongBanId;
                    lichHen.CreateAt = DateTime.Now;
                    _context.LichHens.Add(lichHen);
                    await _context.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Thêm mới thành công", Success = true };
                }
                else
                {
                    return new ResultModal() { Status = 202, Message = "Dữ liệu đã tồn tại", Success = false };
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };

            }
        }

        public async Task<ResultModal> DeleteLichHen(Guid Id)
        {
            var db = _context.LichHens.FirstOrDefault(r => r.Id == Id);
            if (db != null)
            {
                _context.LichHens.Remove(db);
                await _context.SaveChangesAsync();
                return new ResultModal() { Status = 200, Message = "Xóa dữ liệu thành công", Success = true };
            }
            return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = true };
        }

        public async Task<List<LichHenDTO>> GetAllLichHen()
        {
            var db = await _context.LichHens.AsNoTracking().ToListAsync();
            return _mapper.Map<List<LichHenDTO>>(db);
        }

        public async Task<LichHenDTO> GetLichHenById(Guid Id)
        {
            var db = await _context.LichHens.Include(r => r.TrangThaiThucHien).FirstOrDefaultAsync(r => r.Id == Id);
            return _mapper.Map<LichHenDTO>(db);
        }

        public async Task<List<LichHenDTO>> GetLichHenByKhachHangId(string id)
        {
            var db = await _context.LichHens.Where(r => r.KhachHangMucTieuId == id).Include(r => r.TrangThaiThucHien).ToListAsync();
            return _mapper.Map<List<LichHenDTO>>(db);
        }

        public async Task<List<LichHenDTO>> GetLichHenByKhachHangTiemNangId(Guid id)
        {
            var db = await _context.LichHens.Where(r => r.KhachHangTiemNangId == id).Include(r => r.TrangThaiThucHien).ToListAsync();
            return _mapper.Map<List<LichHenDTO>>(db);
        }

        public async Task<List<LichHenDTO>> GetLichHenByNguoiDungId(Guid NguoiDungId)
        {
            var db = await _context.LichHens.Where(r => r.NguoiDungId == NguoiDungId).Include(r => r.TrangThaiThucHien).ToListAsync();
            return _mapper.Map<List<LichHenDTO>>(db);
        }

        public async Task<ResultModal> UpdateLichHen(LichHenModal modal, Guid nguoiDungId, Guid phongBanId)
        {
            var db = _context.LichHens.FirstOrDefault(r => r.Id == modal.Id);
            if (db != null)
            {
                db.TieuDe = modal.TieuDe;
                db.NgayBatDau = modal.NgayBatDau;
                db.MoTa = modal.MoTa;
                db.NgayKetThuc = modal.NgayKetThuc;
                db.DiaDiem = modal.DiaDiem;
                db.TrangThaiThucHienId = modal.TrangThaiThucHienId;
                db.KhachHangTiemNangId = modal.KhachHangTiemNangId;
                db.NguoiDungId = nguoiDungId;
                db.PhongBanId = phongBanId;
                _context.LichHens.Update(db);
                await _context.SaveChangesAsync();
                return new ResultModal() { Status = 200, Message = "Chỉnh sửa thành công", Success = true };
            }
            return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
        }
    }
}
