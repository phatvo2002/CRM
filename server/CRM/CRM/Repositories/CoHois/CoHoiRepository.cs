using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using Microsoft.EntityFrameworkCore;

namespace CRM.Repositories.CoHois
{
    public class CoHoiRepository : BaseRepository<CoHoi, CoHoiModal, Guid, CoHoiDTO>, ICoHoiRepository
    {
        public CoHoiRepository(CrmDbContext crmDbContext, IMapper mapper) : base(crmDbContext, mapper)
        {
        }

        public async Task<ResultModal> ConvertCoHoi(CoHoiModal modal, Guid nguoiDung, Guid phongBan)
        {
            var db = _crmDbContext.CoHois.FirstOrDefault(r => r.Id == modal.Id);
            try
            {
                if (db == null)
                {
                    CoHoi cohoi = new CoHoi();
                    cohoi.Id = modal.Id;
                    cohoi.TenCoHoi = modal.TenCoHoi;
                    cohoi.SoTien = modal.SoTien;
                    cohoi.TiLeThanhCong = modal.TiLeThanhCong;
                    cohoi.DoanhSoKyVong = modal.DoanhSoKyVong;
                    cohoi.NgayKyVongKetThuc = modal.NgayKyVongKetThuc;
                    cohoi.MaKhachHang = modal.MaKhachHang;
                    cohoi.MaLienHe = modal.MaLienHe;
                    cohoi.MaLoaiHangHoa = modal.MaLoaiHangHoa;
                    cohoi.MaLoaiCoHoi = modal.MaLoaiCoHoi;
                    cohoi.MaGiaiDoanBanHang = modal.MaGiaiDoanBanHang;
                    cohoi.MaNguonGocKhachHang = modal.MaNguonGocKhachHang;
                    cohoi.DiaChi = modal.DiaChi;
                    cohoi.CreateAt = DateTime.Now;
                    cohoi.IsDeleted = false;
                    cohoi.NguoiDungId = nguoiDung;
                    cohoi.PhongBanId = phongBan;


                    foreach (var item in modal.HangHoaQuanTams)
                    {

                        HangHoaQuanTam hangHoaQuanTam = new HangHoaQuanTam();
                        hangHoaQuanTam.Id = Guid.NewGuid();
                        hangHoaQuanTam.MaHangHoaId = item.MaHangHoaId;
                        hangHoaQuanTam.KhachHangId = modal.MaKhachHang;
                        hangHoaQuanTam.CoHoiId = modal.Id;
                        hangHoaQuanTam.SoLuong = item.SoLuong;
                        hangHoaQuanTam.TienThue = item.TienThue;
                        hangHoaQuanTam.TenHangHoa = item.TenHangHoa;
                        hangHoaQuanTam.MaDonViTinh = item.MaDonViTinh;
                        hangHoaQuanTam.ThanhTien = item.ThanhTien;
                        hangHoaQuanTam.TongTien = item.TongTien;
                        _crmDbContext.HangHoaQuanTams.Add(hangHoaQuanTam);
                    }
                    _crmDbContext.CoHois.Add(cohoi);
                    await _crmDbContext.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Chuyển đổi thành công", Success = true };
                }
                else return new ResultModal() { Status = 202, Message = "Dữ liệu đã tồn tại trong hệ thống", Success = false };
            }
            catch (Exception ex)
            {
                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };
            }
        }

        public async Task<CoHoiDTO> GetCoHoiById(string id)
        {
            var db = await _crmDbContext.CoHois.Where(r => r.Id == id).Include(r => r.GiaiDoanBanHang).Include(r => r.KhachHangMucTieu).FirstOrDefaultAsync();
            return _mapper.Map<CoHoiDTO>(db);
        }

        public async Task<List<CoHoiDTO>> GetCoHoiByNguoiDungId(Guid nguoiDungId)
        {
            var db = await _crmDbContext.CoHois.Where(r => r.NguoiDungId == nguoiDungId && r.IsDeleted == false).Include(r => r.GiaiDoanBanHang)
                .Include(r => r.Nguoidung).Include(r => r.KhachHangMucTieu).ToListAsync();
            return _mapper.Map<List<CoHoiDTO>>(db);
        }

        public async Task<List<CoHoiDTO>> GetCoHoiByPhongBanId(Guid phongBanId)
        {
            var db = await _crmDbContext.CoHois.Where(r => r.PhongBanId == phongBanId && r.IsDeleted == false).Include(r => r.GiaiDoanBanHang)
                .Include(r => r.Nguoidung).Include(r => r.KhachHangMucTieu).ToListAsync();
            return _mapper.Map<List<CoHoiDTO>>(db);
        }

        public async Task<ResultModal> UpdateGiaiDoan(string cohoiId, Guid giaiDoanId)
        {
            var db = _crmDbContext.CoHois.Where(r => r.Id == cohoiId).FirstOrDefault();
            try
            {
                if (db != null)
                {
                    var dataGiaiDoan = _crmDbContext.GiaiDoanBanHangs.Where(r => r.Id == giaiDoanId).FirstOrDefault();
                    db.MaGiaiDoanBanHang = giaiDoanId;
                    db.TiLeThanhCong = int.Parse(dataGiaiDoan.TiLeThanhCong);
                    db.DoanhSoKyVong = (db.SoTien * Decimal.Parse(dataGiaiDoan.TiLeThanhCong)) / 100;
                    _crmDbContext.CoHois.Update(db);
                    await _crmDbContext.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Chuyển đổi giai đoạn thành công", Success = true };
                }
                else return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
            }
            catch (Exception ex)
            {
                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };
            }
        }
        public async Task<ResultModal> UpdateCoHoiGiaTien(string CoHoiId, decimal giaTien)
        {
            var db = _crmDbContext.CoHois.Where(r => r.Id == CoHoiId).FirstOrDefault();
            try
            {
                if (db != null)
                {
                    db.SoTien = giaTien;
                    db.DoanhSoKyVong = (giaTien * db.TiLeThanhCong) / 100;
                    _crmDbContext.CoHois.Update(db);
                    await _crmDbContext.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Cập nhật thành công", Success = true };
                }
                else return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
            }
            catch (Exception ex)
            {
                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };
            }
        }

        public async Task<ResultModal> UpdateNgayKyVong(string coHoiId, DateTime? ngayKyVong)
        {
            var db = _crmDbContext.CoHois.Where(r => r.Id == coHoiId).FirstOrDefault();
            try
            {
                if (db != null)
                {
                    db.NgayKyVongKetThuc = ngayKyVong;
                    _crmDbContext.CoHois.Update(db);
                    await _crmDbContext.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Cập nhật thành công", Success = true };
                }
                else return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
            }
            catch (Exception ex)
            {
                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };
            }
        }

        public async Task<List<CoHoiDTO>> GetAllData(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId)
        {
            var dataNguoiDung = _crmDbContext.Nguoidungs.Where(r => r.Id == nguoiDungId).FirstOrDefault();
            if (dataNguoiDung != null)
            {
                if (dataNguoiDung.CheckIsGiamDoc == false)
                {
                    if (dataNguoiDung.CheckIsTruongPhong == false)
                    {
                        var dataCoHoi = await _crmDbContext.CoHois.Where(r => r.NguoiDungId == nguoiDungId &&
                                                                             (r.CreateAt >= tuNgay && r.CreateAt <= denNgay) &&
                                                                             r.IsDeleted == false)
                                                                 .Include(r => r.GiaiDoanBanHang)
                                                                 .Include(r => r.Nguoidung).ToListAsync();
                        return _mapper.Map<List<CoHoiDTO>>(dataCoHoi);
                    }
                    else
                    {
                        var dataCoHoi = await _crmDbContext.CoHois.Where(r => r.PhongBanId == dataNguoiDung.MaPhongBan &&
                                                                             (r.CreateAt >= tuNgay && r.CreateAt <= denNgay) &&
                                                                             r.IsDeleted == false)
                                                                  .Include(r => r.GiaiDoanBanHang)
                                                                  .Include(r => r.Nguoidung).ToListAsync();
                        return _mapper.Map<List<CoHoiDTO>>(dataCoHoi);
                    }
                }
                else
                {
                    var dataCoHoi = await _crmDbContext.CoHois.Where(r => (r.CreateAt >= tuNgay && r.CreateAt <= denNgay) && r.IsDeleted == false).Include(r => r.GiaiDoanBanHang).Include(r => r.Nguoidung).ToListAsync();
                    return _mapper.Map<List<CoHoiDTO>>(dataCoHoi);
                }
            }
            return new List<CoHoiDTO>();
        }
    }
}
