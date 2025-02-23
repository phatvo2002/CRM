using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using Microsoft.EntityFrameworkCore;

namespace CRM.Repositories.BaoGias
{
    public class BaoGiaRepository : BaseRepository<BaoGia, BaoGiaModal, Guid, BaoGiaDTO>, IBaoGiaRepository
    {
        public BaoGiaRepository(CrmDbContext crmDbContext, IMapper mapper) : base(crmDbContext, mapper)
        {
        }

        public async Task<ResultModal> ConvertBaoGia(BaoGiaModal baoGiaModal, Guid nguoiDungId, Guid phongBanId)
        {
            try
            {
                var db = _crmDbContext.BaoGias.FirstOrDefault(r => r.Id == baoGiaModal.Id);
                if (db == null)
                {
                    BaoGia baoGia = new BaoGia();
                    baoGia.Id = Guid.NewGuid();
                    baoGia.TenBaoGia = baoGiaModal.TenBaoGia;
                    baoGia.NgayBaoGia = baoGiaModal.NgayBaoGia;
                    baoGia.NgayHetHan = baoGiaModal.NgayHetHan;
                    baoGia.DiaChi = baoGiaModal.DiaChi;
                    baoGia.MoTa = baoGiaModal.MoTa;
                    baoGia.MaSoThue = baoGiaModal.MaSoThue;
                    baoGia.TongTien = baoGiaModal.TongTien;
                    baoGia.MaTinhTrangBaoGia = baoGiaModal.MaTinhTrangBaoGia;
                    baoGia.MaKhachHang = baoGiaModal.MaKhachHang;
                    baoGia.MaCoHoi = baoGiaModal.MaCoHoi;
                    baoGia.NguoiDungId = nguoiDungId;
                    baoGia.PhongBanId = phongBanId;
                    baoGia.CreateAt = DateTime.Now;
                    baoGia.IsDeleted = false;


                    foreach (var item in baoGiaModal.HangHoaQuanTams)
                    {
                        HangHoaQuanTam hangHoaQuanTam = new HangHoaQuanTam();
                        hangHoaQuanTam.Id = Guid.NewGuid();
                        hangHoaQuanTam.MaHangHoaId = item.MaHangHoaId;
                        hangHoaQuanTam.KhachHangId = null;
                        hangHoaQuanTam.CoHoiId = baoGiaModal.MaCoHoi;
                        hangHoaQuanTam.BaoGiaId = baoGia.Id;
                        hangHoaQuanTam.DonGia = item.DonGia;
                        hangHoaQuanTam.SoLuong = item.SoLuong;
                        hangHoaQuanTam.ThueSuat = item.ThueSuat;
                        hangHoaQuanTam.TienThue = item.TienThue;
                        hangHoaQuanTam.ThanhTien = item.ThanhTien;
                        hangHoaQuanTam.TongTien = item.TongTien;
                        hangHoaQuanTam.ChiecKhauDonHang = item.ChiecKhauDonHang;
                        _crmDbContext.HangHoaQuanTams.Add(hangHoaQuanTam);
                    }
                    _crmDbContext.BaoGias.Add(baoGia);
                    await _crmDbContext.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Thêm báo giá thành công", Success = true };
                }
                return new ResultModal() { Status = 202, Message = "Dữ liệu đã tồn tại", Success = false };
            }
            catch (Exception ex)
            {
                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };
            }

        }

        public async Task<BaoGiaDTO> GetBaoGiaById(Guid id)
        {
            var db = await _crmDbContext.BaoGias.Where(r => r.Id == id).AsNoTracking().Include(r => r.KhachHangMucTieu).Include(r => r.Nguoidung).FirstOrDefaultAsync();
            return _mapper.Map<BaoGiaDTO>(db);
        }

        public async Task<List<BaoGiaDTO>> GetBaoGiaByNguoiDungId(Guid nguoiDungId)
        {
            var db = await _crmDbContext.BaoGias.Where(r => r.NguoiDungId == nguoiDungId && r.IsDeleted == false)
                .Include(r => r.KhachHangMucTieu)
                .Include(r => r.CoHoi).Include(r => r.TinhTrangBaoGia).ToListAsync();
            return _mapper.Map<List<BaoGiaDTO>>(db);
        }

        public async Task<List<BaoGiaDTO>> GetBaoGiaByPhongBanId(Guid phongBanId)
        {
            var db = await _crmDbContext.BaoGias.Where(r => r.PhongBanId == phongBanId && r.IsDeleted == false)
                .Include(r => r.KhachHangMucTieu)
                .Include(r => r.CoHoi).Include(r => r.TinhTrangBaoGia).ToListAsync();
            return _mapper.Map<List<BaoGiaDTO>>(db);
        }


        public async Task<ResultModal> UpdateSoTienHangHoa(Guid baoGiaId, decimal soTien)
        {
            var db = _crmDbContext.BaoGias.Where(r => r.Id == baoGiaId).FirstOrDefault();
            try
            {
                if (db != null)
                {
                    db.TongTien = soTien;
                    _crmDbContext.BaoGias.Update(db);
                    await _crmDbContext.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Chỉnh sửa đơn hàng thành công", Success = true };
                }
                return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
            }
            catch (Exception ex)
            {
                return new ResultModal() { Status = 200, Message = ex.Message, Success = false };

            }
        }
        public async Task<ResultModal> DeleteBaoGia(Guid id)
        {
            var db = _crmDbContext.BaoGias.Where(r => r.Id == id).Include(r => r.TinhTrangBaoGia).FirstOrDefault();
            try
            {
                if (db != null)
                {
                    if (db.MaTinhTrangBaoGia != 2 || db.MaTinhTrangBaoGia != 3 || db.MaTinhTrangBaoGia != 7 || db.MaTinhTrangBaoGia != 8)
                    {
                        return new ResultModal() { Status = 200, Message = $"Báo giá đang ở trạng thái {db.TinhTrangBaoGia.Name} nên không thể xóa", Success = false };
                    }
                    else
                    {
                        db.IsDeleted = true;
                        _crmDbContext.Update(db);
                        await _crmDbContext.SaveChangesAsync();
                        return new ResultModal() { Status = 200, Message = "Xóa báo giá thành công", Success = true };
                    }
                }
                return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
            }
            catch (Exception ex)
            {
                return new ResultModal() { Status = 202, Message = ex.Message, Success = false };
            }
        }

        public async Task<ResultModal> PheDuyetBaoGia(Guid baoGiaId, int trangthaiId)
        {
            var db = _crmDbContext.BaoGias.Where(r => r.Id == baoGiaId).FirstOrDefault();
            try
            {
                if (db != null)
                {
                    db.MaTinhTrangBaoGia = trangthaiId;
                    _crmDbContext.BaoGias.Update(db);
                    await _crmDbContext.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Cập nhật trạng thái thành công", Success = true };
                }
                return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
            }
            catch (Exception ex)
            {
                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };
            }
        }
    }
}
