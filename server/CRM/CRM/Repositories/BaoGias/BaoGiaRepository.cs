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
            using var transaction = await _crmDbContext.Database.BeginTransactionAsync();
            try
            {
                var db = await _crmDbContext.BaoGias
                    .AsNoTracking()
                    .FirstOrDefaultAsync(r => r.Id == baoGiaModal.Id);

                if (db != null)
                {
                    return new ResultModal
                    {
                        Status = 202,
                        Message = "Dữ liệu đã tồn tại",
                        Success = false
                    };
                }

                var baoGia = _mapper.Map<BaoGia>(baoGiaModal);
                baoGia.Id = Guid.NewGuid();
                baoGia.NguoiDungId = nguoiDungId;
                baoGia.PhongBanId = phongBanId;
                baoGia.CreateAt = DateTime.Now;
                baoGia.IsDeleted = false;
                foreach (var item in baoGiaModal.HangHoaQuanTams)
                {
                    var dbhangHoa = await _crmDbContext.HangHoaQuanTams
                        .FirstOrDefaultAsync(r => r.Id == item.Id);

                    if (dbhangHoa != null)
                    {
                        dbhangHoa.BaoGiaId = baoGia.Id;
                        _crmDbContext.HangHoaQuanTams.Update(dbhangHoa);
                    }
                    else
                    {
                        var hangHoaQuanTam = _mapper.Map<HangHoaQuanTam>(item);
                        hangHoaQuanTam.Id = Guid.NewGuid();
                        hangHoaQuanTam.TenHangHoa = item.TenHangHoa;
                        hangHoaQuanTam.KhachHangId = baoGia.MaKhachHang;
                        hangHoaQuanTam.CoHoiId = baoGia.MaCoHoi;
                        hangHoaQuanTam.BaoGiaId = baoGia.Id;
                        hangHoaQuanTam.ChiecKhauDonHang = item.ChiecKhauDonHang;

                        await _crmDbContext.HangHoaQuanTams.AddAsync(hangHoaQuanTam);
                    }

                    // Thêm chi tiết báo giá
                    var chiTietBaoGia = new ChiTietBaoGia
                    {
                        Id = Guid.NewGuid(),
                        BaoGiaId = baoGia.Id,
                        KhachHangId = baoGia.MaKhachHang,
                        MaDonViTinh = item.MaDonViTinh,
                        MaHangHoaId = item.MaHangHoaId,
                        TenHangHoa = item.TenHangHoa,
                        SoLuong = item.SoLuong,
                        DonGia = item.DonGia,
                        ThanhTien = item.ThanhTien
                    };

                    await _crmDbContext.ChiTietBaoGias.AddAsync(chiTietBaoGia);
                }

                await _crmDbContext.BaoGias.AddAsync(baoGia);
                await _crmDbContext.SaveChangesAsync();

                await transaction.CommitAsync();

                return new ResultModal
                {
                    Status = 200,
                    Message = "Thêm báo giá thành công",
                    Success = true
                };
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                return new ResultModal
                {
                    Status = 500,
                    Message = ex.Message,
                    Success = false
                };
            }
        }


        public async Task<BaoGiaDTO> GetBaoGiaById(Guid id)
        {
            var db = await _crmDbContext.BaoGias.Where(r => r.Id == id).AsNoTracking()
                .Include(r => r.KhachHangMucTieu)
                .Include(r => r.Nguoidung)
                .Include(r => r.TinhTrangBaoGia).FirstOrDefaultAsync();
            return _mapper.Map<BaoGiaDTO>(db);
        }

        public async Task<List<BaoGiaDTO>> GetBaoGiaByNguoiDungId(Guid nguoiDungId, DateTime tuNgay, DateTime denNgay)
        {
            var db = await _crmDbContext.BaoGias.Where(r => r.NguoiDungId == nguoiDungId && r.IsDeleted == false && r.CreateAt >= tuNgay && r.CreateAt <= denNgay)
                .Include(r => r.KhachHangMucTieu)
                .Include(r => r.CoHoi).Include(r => r.TinhTrangBaoGia).Include(r => r.Nguoidung).ToListAsync();
            return _mapper.Map<List<BaoGiaDTO>>(db);
        }

        public async Task<List<BaoGiaDTO>> GetBaoGiaByPhongBanId(Guid phongBanId, DateTime tuNgay, DateTime denNgay)
        {
            var db = await _crmDbContext.BaoGias.Where(r => r.PhongBanId == phongBanId && r.IsDeleted == false && r.CreateAt >= tuNgay && r.CreateAt <= denNgay)
                .Include(r => r.KhachHangMucTieu)
                .Include(r => r.CoHoi).Include(r => r.TinhTrangBaoGia).Include(r => r.Nguoidung).ToListAsync();
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

        public async Task<ResultModal> UpdateTrangThaiBaoGia(Guid baoGiaId, int trangThaiId)
        {
            var db = _crmDbContext.BaoGias.Where(r => r.Id == baoGiaId).FirstOrDefault();
            try
            {
                if (db != null)
                {
                    db.MaTinhTrangBaoGia = trangThaiId;
                    _crmDbContext.BaoGias.Update(db);
                    await _crmDbContext.SaveChangesAsync();
                    return new ResultModal() { Success = true, Message = "Thay đổi trạng thái thành công", Status = 200 };
                }
                return new ResultModal() { Success = false, Message = "Không tìm thấy dữ liệu", Status = 202 };
            }
            catch (Exception ex)
            {
                return new ResultModal() { Success = false, Message = ex.Message, Status = 500 };
            }
        }


    }
}
