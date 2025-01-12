using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using Microsoft.EntityFrameworkCore;

namespace CRM.Repositories.NhiemVus
{
    public class NhiemVuRepository : INhiemVuRepository
    {
        private readonly CrmDbContext _context;
        private readonly ILogger<NhiemVuRepository> _logger;
        private readonly IMapper _mapper;

        public NhiemVuRepository(CrmDbContext context, IMapper mapper, ILogger<NhiemVuRepository> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }
        public async Task<ResultModal> CreateNhiemVu(NhiemVuModal modal, Guid nguoiDungId, Guid phongBanId)
        {
            var db = _context.NhiemVus.FirstOrDefault(r => r.Id == modal.Id);
            try
            {
                if (db == null)
                {
                    NhiemVu nhiemVu = new NhiemVu();
                    nhiemVu.Id = Guid.NewGuid();
                    nhiemVu.TieuDe = modal.TieuDe;
                    nhiemVu.MoTa = modal.MoTa;
                    nhiemVu.HanHoanThanh = modal.HanHoanThanh;
                    nhiemVu.KhachHangTiemNangId = modal.KhachHangTiemNangId;
                    nhiemVu.MucDoUuTienId = modal.MucDoUuTienId;
                    nhiemVu.TrangThaiThucHienId = modal.TrangThaiThucHienId;
                    nhiemVu.IsThongBao = false;
                    nhiemVu.IsDeleted = false;
                    nhiemVu.NguoiDungId = nguoiDungId;
                    nhiemVu.PhongBanId = phongBanId;
                    nhiemVu.IsThongBao = false;
                    nhiemVu.CreateAt = DateTime.Now;
                    _context.NhiemVus.Add(nhiemVu);
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

        public async Task<ResultModal> DeleteNhiemVu(Guid Id)
        {
            var db = _context.NhiemVus.FirstOrDefault(r => r.Id == Id);
            if (db != null)
            {
                _context.NhiemVus.Remove(db);
                await _context.SaveChangesAsync();
                return new ResultModal() { Status = 200, Message = "Xóa dữ liệu thành công", Success = true };
            }
            return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = true };
        }

        public async Task<List<NhiemVuDTO>> GetAllNhiemVu()
        {
            var db = await _context.NhiemVus.AsNoTracking().ToListAsync();
            return _mapper.Map<List<NhiemVuDTO>>(db);
        }

        public async Task<NhiemVuDTO> GetNhiemVuById(Guid Id)
        {
            var db = await _context.NhiemVus.FirstOrDefaultAsync(r => r.Id == Id);
            return _mapper.Map<NhiemVuDTO>(db);
        }

        public async Task<List<NhiemVuDTO>> GetNhiemVuByKhachHangTiemNangId(Guid id)
        {
            var db = await _context.NhiemVus.Where(r => r.KhachHangTiemNangId == id).Include(r => r.MucDoUuTien).Include(r => r.TrangThaiThucHien).ToListAsync();
            return _mapper.Map<List<NhiemVuDTO>>(db);
        }

        public async Task<List<NhiemVuDTO>> GetNhiemVuByNguoiDungId(Guid NguoiDungId)
        {
            var db = await _context.NhiemVus.Where(r => r.NguoiDungId == NguoiDungId).ToListAsync();
            return _mapper.Map<List<NhiemVuDTO>>(db);
        }

        public async Task<ResultModal> UpdateNhiemVu(NhiemVuModal modal, Guid nguoiDungId, Guid phongBanId)
        {
            var db = _context.NhiemVus.FirstOrDefault(r => r.Id == modal.Id);
            if (db != null)
            {
                db.TieuDe = modal.TieuDe;
                db.MoTa = modal.MoTa;
                db.HanHoanThanh = modal.HanHoanThanh;
                db.MucDoUuTienId = modal.MucDoUuTienId;
                db.TrangThaiThucHienId = modal.TrangThaiThucHienId;
                db.NguoiDungId = nguoiDungId;
                db.PhongBanId = phongBanId;
                _context.NhiemVus.Update(db);
                await _context.SaveChangesAsync();
                return new ResultModal() { Status = 200, Message = "Chỉnh sửa thành công", Success = true };
            }
            return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
        }
    }
}
