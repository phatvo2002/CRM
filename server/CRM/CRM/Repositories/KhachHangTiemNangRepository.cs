using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CRM.Repositories
{
    public class KhachHangTiemNangRepository : IKhachHangTiemNangRepository
    {
        private readonly CrmDbContext _context;
        private readonly IMapper _mapper;
        public KhachHangTiemNangRepository(CrmDbContext context , IMapper mapper) {
            _context=context;
            _mapper=mapper;
        }
        public async Task<List<KhachHangTiemNangDTO>> GetAllKhachHangTiemNangAsync()
        {
            var db = await _context.KhachHangTiemNangs.AsNoTracking().Where(r => r.IsDeleted != false).ToListAsync();
            return _mapper.Map<List<KhachHangTiemNangDTO>>(db);
        }

        public async Task<KhachHangTiemNangDTO> GetKhachHangTiemNangByIdAsync(Guid id)
        { 
            var db = await _context.KhachHangTiemNangs.Where(r=> r.Id == id).FirstOrDefaultAsync();
            return _mapper.Map<KhachHangTiemNangDTO>(db);
        }

        public async Task<List<KhachHangTiemNangDTO>> GetKhachHangTiemNangByNguoiDungIdAsync(Guid nguoiDungId)
        {
            var db = await _context.KhachHangTiemNangs.Where(r => r.NguoiDungId == nguoiDungId).ToListAsync();
            return _mapper.Map<List<KhachHangTiemNangDTO>>(db);
        }

        public async Task<List<KhachHangTiemNangDTO>> GetKhachHangTiemNangByPhongBanIdAsync(Guid phongBanId)
        {
            var db = await _context.KhachHangTiemNangs.Where(r=> r.PhongBanId == phongBanId).ToListAsync();
            return _mapper.Map<List<KhachHangTiemNangDTO>>(db);
        }
      
        public async Task<ResultModal> ThemMoiKhachHangTiemNangAsync(KhachHangTiemNangModel model)
        {
            var db = _context.KhachHangTiemNangs.FirstOrDefault( r=> r.Id == model.Id);
            try
            {
                if (db == null)
                {
                    KhachHangTiemNang khachHangTiemNang = new KhachHangTiemNang();
                    khachHangTiemNang.Id = Guid.NewGuid();
                    khachHangTiemNang.TenKhachHang = model.TenKhachHang;
                    khachHangTiemNang.SoDienThoaiDiDong = model.SoDienThoaiDiDong;
                    khachHangTiemNang.SoDienThoaiCoQuan = model.SoDienThoaiCoQuan;
                    khachHangTiemNang.ChucDanh = model.ChucDanh;
                    khachHangTiemNang.SoZalo = model.SoZalo;
                    khachHangTiemNang.EmailCaNhan = model.EmailCaNhan;
                    khachHangTiemNang.EmailCoQuan = model.EmailCoQuan;
                    khachHangTiemNang.TenToChuc = model.TenToChuc;
                    khachHangTiemNang.MaSoThue = model.MaSoThue;
                    khachHangTiemNang.NgayThanhLap = model.NgayThanhLap;
                    khachHangTiemNang.DiaChi = model.DiaChi;
                    khachHangTiemNang.ThongTinMoTa = model.ThongTinMoTa;
                    khachHangTiemNang.MaPhongbanKhachHang = model.MaPhongbanKhachHang;
                    khachHangTiemNang.MaNguonGocKhachHang = model.MaNguonGocKhachHang;
                    khachHangTiemNang.MaLoaiTiemNang = model.MaLoaiTiemNang;
                    khachHangTiemNang.MaLoaiHinhNgheNghiep = model.MaLoaiHinhNgheNghiep;
                    khachHangTiemNang.MaNganhNghe = model.MaNganhNghe;
                    khachHangTiemNang.MaLinhVuc = model.MaLinhVuc;
                    khachHangTiemNang.MaDoanhThu = model.MaDoanhThu;
                    khachHangTiemNang.IsDungChung = model.IsDungChung;
                    khachHangTiemNang.IsDeleted = false;
                    khachHangTiemNang.CreateAt = DateTime.Now;
                    khachHangTiemNang.NguoiDungId = model.NguoiDungId;
                    khachHangTiemNang.PhongBanId = model.PhongBanId;
                    _context.KhachHangTiemNangs.Add(khachHangTiemNang);
                    await _context.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Thêm mới thành công", Success = true };
                }
                else
                {
                    return new ResultModal() { Status = 202, Message = "Thêm mới thành công", Success = false };
                }    
            }
            catch (Exception ex) {
                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };
            }
              
        }
        public Task<ResultModal> ChinhSuaKhachHangTiemNangAsync(KhachHangTiemNangModel model)
        {
            throw new NotImplementedException();
        }
        public async Task<ResultModal> XoaKhachHangTiemNangAsync(Guid id)
        {
            var db =  _context.KhachHangTiemNangs.Where(r=> r.Id == id).FirstOrDefault();
            if (db != null)
            {
                db.IsDeleted = false;
                await _context.SaveChangesAsync();
                return new ResultModal() { Status = 200, Message = "Xóa khách hàng thành công", Success = true };
            }
            return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = true };
        }
    }
}
