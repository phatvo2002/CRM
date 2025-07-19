using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using Microsoft.EntityFrameworkCore;
namespace CRM.Repositories.KhachHangTiemNangs
{
    public class KhachHangTiemNangRepository : BaseRepository<KhachHangTiemNang , KhachHangTiemNangModel , Guid , KhachHangTiemNangDTO> , IKhachHangTiemNangRepository 
    {
        private readonly CrmDbContext _context;
        private readonly IMapper _mapper;
        private readonly ILogger<KhachHangTiemNangRepository> _logger;
        public KhachHangTiemNangRepository(CrmDbContext context, IMapper mapper, ILogger<KhachHangTiemNangRepository> logger) : base(context , mapper)
        {
            _context = context;
            _mapper = mapper;
            _logger = logger;
        }
        public async Task<List<KhachHangTiemNangDTO>> GetAllKhachHangTiemNangAsync(DateTime tuNgay, DateTime denNgay)
        {

            var db = await _context.KhachHangTiemNangs.AsNoTracking().Where(r => r.IsDeleted == false &&
                                                                            r.CreateAt >= Helper.Helper.ConvertDate(tuNgay) &&
                                                                            r.CreateAt <= Helper.Helper.ConvertDate(denNgay))
                                                                    .Include(r => r.Nguoidung).ToListAsync();
            return _mapper.Map<List<KhachHangTiemNangDTO>>(db);
        }

        public async Task<KhachHangTiemNangDTO> GetKhachHangTiemNangByIdAsync(Guid id)
        {
            var db = await _context.KhachHangTiemNangs.Where(r => r.Id == id).FirstOrDefaultAsync();
            return _mapper.Map<KhachHangTiemNangDTO>(db);
        }
        public async Task<ResultModal> ThemMoiKhachHangTiemNangAsync(KhachHangTiemNangModel model, Guid nguoiDungId, Guid phongBanId)
        {
            var db = _context.KhachHangTiemNangs.FirstOrDefault(r => r.Id == model.Id);
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
                    khachHangTiemNang.NguoiDungId = nguoiDungId;
                    khachHangTiemNang.PhongBanId = phongBanId;
                    khachHangTiemNang.IsChuyenDoi = false;
                    _context.KhachHangTiemNangs.Add(khachHangTiemNang);
                    await _context.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Thêm mới thành công", Success = true };
                }
                else
                {

                    return new ResultModal() { Status = 202, Message = "Dữ liệu đã tồn tại trong hệ thống", Success = false };
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };
            }

        }
        public async Task<ResultModal> ChinhSuaKhachHangTiemNangAsync(KhachHangTiemNangModel model)
        {
            var db = _context.KhachHangTiemNangs.Where(r => r.Id == model.Id).FirstOrDefault();
            if (db != null)
            {
                db.TenKhachHang = model.TenKhachHang;
                db.SoDienThoaiDiDong = model.SoDienThoaiDiDong;
                db.SoDienThoaiCoQuan = model.SoDienThoaiCoQuan;
                db.ChucDanh = model.ChucDanh;
                db.SoZalo = model.SoZalo;
                db.EmailCaNhan = model.EmailCaNhan;
                db.EmailCoQuan = model.EmailCoQuan;
                db.TenToChuc = model.TenToChuc;
                db.MaSoThue = model.MaSoThue;
                db.NgayThanhLap = null;
                db.DiaChi = model.DiaChi;
                db.ThongTinMoTa = model.ThongTinMoTa;
                db.MaPhongbanKhachHang = model.MaPhongbanKhachHang;
                db.MaNguonGocKhachHang = model.MaNguonGocKhachHang;
                db.MaLoaiTiemNang = model.MaLoaiTiemNang;
                db.MaLoaiHinhNgheNghiep = model.MaLoaiHinhNgheNghiep;
                db.MaNganhNghe = model.MaNganhNghe;
                db.MaLinhVuc = model.MaLinhVuc;
                db.MaDoanhThu = model.MaDoanhThu;
                db.IsDungChung = model.IsDungChung;
                _context.KhachHangTiemNangs.Update(db);
                await _context.SaveChangesAsync();
                return new ResultModal() { Status = 200, Message = "Chỉnh sửa khách hàng thành công", Success = true };
            }
            return new ResultModal() { Status = 202, Message = "Không tìm thấy khách hàng", Success = false };
        }
        public async Task<ResultModal> XoaKhachHangTiemNangAsync(Guid id)
        {
            var db = _context.KhachHangTiemNangs.Where(r => r.Id == id).FirstOrDefault();
            if (db != null)
            {
                db.IsDeleted = true;
                _context.KhachHangTiemNangs.Update(db);
                await _context.SaveChangesAsync();
                return new ResultModal() { Status = 200, Message = "Xóa khách hàng thành công", Success = true };
            }
            return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = true };
        }

        public async Task<ResultModal> BanGiaoKhachHangTiemNang(Guid id, Guid userId)
        {
            var db = _context.KhachHangTiemNangs.Where(r => r.Id == id).FirstOrDefault();
            if (db != null)
            {
                db.NguoiDungId = userId;
                _context.KhachHangTiemNangs.Update(db);
                await _context.SaveChangesAsync();
                return new ResultModal() { Status = 200, Message = "Bàn giao khách hàng thành công", Success = true };
            }
            else
            {
                return new ResultModal() { Status = 202, Message = "Không tìm thấy khách hàng", Success = false };
            }
        }
        public async Task<List<KhachHangTiemNangDTO>> GetKhachHangTiemNangDaXoaAsync(Guid nguoiDungId)
        {
            var db = await _context.KhachHangTiemNangs.Where(r => r.NguoiDungId == nguoiDungId && r.IsDeleted == true).Include(r => r.Nguoidung).ToListAsync();
            return _mapper.Map<List<KhachHangTiemNangDTO>>(db);
        }
        public async Task<List<KhachHangTiemNangDTO>> GetKhachHangTiemNangDaXoaByPhongBanAsync(Guid phongbanId)
        {
            var db = await _context.KhachHangTiemNangs.Where(r => r.PhongBanId == phongbanId && r.IsDeleted == true).Include(r => r.Nguoidung).ToListAsync();
            return _mapper.Map<List<KhachHangTiemNangDTO>>(db);
        }
        public async Task<ResultModal> XoaHangLoatKhTiemNangAssync(List<KhachHangTiemNangModel> models)
        {
            try
            {
                foreach (var item in models)
                {
                    var db = _context.KhachHangTiemNangs.Where(r => r.Id == item.Id).FirstOrDefault();
                    if (db != null)
                    {
                        db.IsDeleted = true;
                        _context.KhachHangTiemNangs.Update(db);
                    }
                    else continue;
                }
                await _context.SaveChangesAsync();
                return new ResultModal() { Status = 200, Message = "Xóa thành công", Success = true };
            }
            catch (Exception ex)
            {
                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };
            }
        }

        public async Task<ResultModal> PhucHoiLoatKhTiemNangAsync(List<KhachHangTiemNangModel> models)
        {
            try
            {
                foreach (var item in models)
                {
                    var db = _context.KhachHangTiemNangs.FirstOrDefault(r => r.Id == item.Id && r.IsDeleted == true);
                    if (db != null)
                    {
                        db.IsDeleted = false;
                        _context.KhachHangTiemNangs.Update(db);
                    }
                    else continue;
                }
                await _context.SaveChangesAsync();
                return new ResultModal() { Status = 200, Message = "Phục hồi thành công", Success = true };
            }
            catch (Exception ex)
            {
                return new ResultModal() { Status = 500, Message = ex.Message, Success = true };
            }
        }

        public async Task<ResultModal> BanGiaoHangLoat(List<BanGiaoList> models, Guid userId)
        {
            try
            {
                foreach (var item in models)
                {
                    var db = await _context.KhachHangTiemNangs.Where(r => r.Id == item.Id).FirstOrDefaultAsync();
                    if (db != null)
                    {
                        if (db.IsChuyenDoi == false)
                        {
                            db.NguoiDungId = userId;
                            _context.KhachHangTiemNangs.Update(db);
                        }
                        else continue;
                    }

                }
                await _context.SaveChangesAsync();
                return new ResultModal() { Message = "Bàn giao thành công", Status = 200, Success = true };
            }
            catch (Exception ex)
            {
                return new ResultModal() { Message = ex.Message, Status = 500, Success = false };
            }
        }
    }
}
