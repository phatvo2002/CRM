using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using Microsoft.EntityFrameworkCore;

namespace CRM.Repositories.CuocGois
{
    public class CuocGoiRepository : ICuocGoiRepository
    {
        private readonly CrmDbContext _context;
        private readonly ILogger<CuocGoiRepository> _logger;
        private readonly IMapper _mapper;

        public CuocGoiRepository(CrmDbContext context, IMapper mapper, ILogger<CuocGoiRepository> logger)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }
        public async Task<ResultModal> CreateCuocGoi(CuocGoiModal modal, Guid nguoiDungId, Guid phongBanId)
        {
            var db = _context.CuocGois.FirstOrDefault(r => r.Id == modal.Id);
            // lấy thời gian đầu tháng và cuối tháng 
            try
            {
                if (db == null)
                {
                    CuocGoi cuocGoi = new CuocGoi();
                    cuocGoi.Id = Guid.NewGuid();
                    cuocGoi.TieuDe = modal.TieuDe;
                    cuocGoi.MoTa = modal.MoTa;
                    cuocGoi.NgayBatDau = modal.NgayBatDau;
                    cuocGoi.SoPhutGoi = modal.SoPhutGoi;
                    cuocGoi.SoGiayGoi = modal.SoGiayGoi;
                    cuocGoi.IsHoanThanh = modal.IsHoanThanh;
                    cuocGoi.LoaiCuocGoiId = modal.LoaiCuocGoiId;
                    cuocGoi.KetQuaCuocGoiId = modal.KetQuaCuocGoiId;
                    cuocGoi.KhachHangTiemNangId = modal.KhachHangTiemNangId;
                    cuocGoi.KhachHangMucTieuId = modal.KhachHangMucTieuId;
                    cuocGoi.CoHoiId = modal.CoHoiId;
                    cuocGoi.IsDeleted = false;
                    cuocGoi.NguoiDungId = nguoiDungId;
                    cuocGoi.PhongBanId = phongBanId;
                    cuocGoi.CreateAt = DateTime.Now;
                    _context.CuocGois.Add(cuocGoi);

                    // cập nhật dữ liệu kpi khi cuộc gọi đã hoàn thành
                    if (cuocGoi.IsHoanThanh == true)
                    {
                        DateTime now = DateTime.Now;
                        DateTime firstDayOfMonth = new DateTime(now.Year, now.Month, 1);
                        DateTime lastDayOfMonth = new DateTime(now.Year, now.Month, DateTime.DaysInMonth(now.Year, now.Month));

                    }

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


        public async Task<List<CuocGoiDTO>> GetAllCuocGoi()
        {
            var db = await _context.CuocGois.AsNoTracking().ToListAsync();
            return _mapper.Map<List<CuocGoiDTO>>(db);
        }

        public async Task<CuocGoiDTO> GetCuocGoiById(Guid Id)
        {
            var db = await _context.CuocGois.FirstOrDefaultAsync(r => r.Id == Id);
            return _mapper.Map<CuocGoiDTO>(db);
        }

        public async Task<List<CuocGoiDTO>> GetCuocGoiByNguoiDungId(Guid NguoiDungId)
        {
            var db = await _context.CuocGois.Where(r => r.NguoiDungId == NguoiDungId).ToListAsync();
            return _mapper.Map<List<CuocGoiDTO>>(db);
        }

        public async Task<ResultModal> UpdateCuocGoi(CuocGoiModal modal, Guid nguoiDungId, Guid phongBanId)
        {
            var db = _context.CuocGois.FirstOrDefault(r => r.Id == modal.Id);
            if (db != null)
            {
                db.TieuDe = modal.TieuDe;
                db.MoTa = modal.MoTa;
                db.NgayBatDau = modal.NgayBatDau;
                db.SoPhutGoi = modal.SoPhutGoi;
                db.SoGiayGoi = modal.SoGiayGoi;
                db.LoaiCuocGoiId = modal.LoaiCuocGoiId;
                db.KetQuaCuocGoiId = modal.KetQuaCuocGoiId;
                db.KhachHangTiemNangId = modal.KhachHangTiemNangId;
                db.KhachHangMucTieuId = modal.KhachHangMucTieuId;
                db.IsHoanThanh = modal.IsHoanThanh;
                db.NguoiDungId = nguoiDungId;
                db.PhongBanId = phongBanId;
                _context.CuocGois.Update(db);
                await _context.SaveChangesAsync();
                return new ResultModal() { Status = 200, Message = "Chỉnh sửa thành công", Success = true };
            }
            return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
        }
        public async Task<ResultModal> DeleteCuocGoi(Guid Id)
        {
            var db = _context.CuocGois.FirstOrDefault(r => r.Id == Id);
            if (db != null)
            {
                _context.CuocGois.Remove(db);
                await _context.SaveChangesAsync();
                return new ResultModal() { Status = 200, Message = "Xóa dữ liệu thành công", Success = true };
            }
            return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = true };
        }

        public async Task<List<CuocGoiDTO>> GetCuocGoiByKhachHangTiemNangId(Guid Id)
        {
            var db = await _context.CuocGois.Where(r => r.KhachHangTiemNangId == Id).Include(r => r.LoaiCuocGoi).Include(r => r.KhachHangTiemNang).ToListAsync();
            return _mapper.Map<List<CuocGoiDTO>>(db);
        }

        public async Task<List<CuocGoiDTO>> GetCuocGoiByKhachHangId(string Id)
        {
            var db = await _context.CuocGois.Where(r => r.KhachHangMucTieuId == Id).Include(r => r.LoaiCuocGoi).Include(r => r.KhachHangTiemNang).ToListAsync();
            return _mapper.Map<List<CuocGoiDTO>>(db);
        }

        public async Task<List<CuocGoiDTO>> GetCuocGoiIsThucHien(string coHoiId)
        {
            var db = await _context.CuocGois.Where(r => r.CoHoiId == coHoiId && r.IsHoanThanh == true).ToListAsync();
            return _mapper.Map<List<CuocGoiDTO>>(db);
        }

        public async Task<List<CuocGoiDTO>> GetCuocGoiChuaThucHien(string coHoiId)
        {
            var db = await _context.CuocGois.Where(r => r.CoHoiId == coHoiId && r.IsHoanThanh == false).ToListAsync();
            return _mapper.Map<List<CuocGoiDTO>>(db);
        }
    }
}
