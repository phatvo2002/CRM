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
                        var hanghoa = _crmDbContext.HangHoaQuanTams.FirstOrDefault(r => r.Id == item.Id);
                        if (hanghoa != null)
                        {
                            hanghoa.CoHoiId = cohoi.Id;
                            _crmDbContext.HangHoaQuanTams.Update(hanghoa);
                        }
                        else
                        {
                            HangHoaQuanTam hangHoaQuanTam = new HangHoaQuanTam();
                            hangHoaQuanTam.Id = Guid.NewGuid();
                            hangHoaQuanTam.MaHangHoaId = item.MaHangHoaId;
                            hangHoaQuanTam.KhachHangId = modal.MaKhachHang;
                            hangHoaQuanTam.CoHoiId = modal.Id;
                            hangHoaQuanTam.SoLuong = item.SoLuong;
                            hangHoaQuanTam.ThanhTien = item.ThanhTien;
                            hangHoaQuanTam.TongTien = item.TongTien;
                            _crmDbContext.HangHoaQuanTams.Add(hangHoaQuanTam);
                        }
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
            var db = await _crmDbContext.CoHois.Where(r => r.Id == id).Include(r => r.GiaiDoanBanHang).FirstOrDefaultAsync();
            return _mapper.Map<CoHoiDTO>(db);
        }

        public async Task<List<CoHoiDTO>> GetCoHoiByNguoiDungId(Guid nguoiDungId)
        {
            var db = await _crmDbContext.CoHois.Where(r => r.NguoiDungId == nguoiDungId && r.IsDeleted == false).Include(r => r.GiaiDoanBanHang).Include(r => r.Nguoidung).ToListAsync();
            return _mapper.Map<List<CoHoiDTO>>(db);
        }

        public async Task<List<CoHoiDTO>> GetCoHoiByPhongBanId(Guid phongBanId)
        {
            var db = await _crmDbContext.CoHois.Where(r => r.PhongBanId == phongBanId && r.IsDeleted == false).Include(r => r.GiaiDoanBanHang).Include(r => r.Nguoidung).ToListAsync();
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
    }
}
