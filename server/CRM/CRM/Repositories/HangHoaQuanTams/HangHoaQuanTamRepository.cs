using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using Microsoft.EntityFrameworkCore;

namespace CRM.Repositories.HangHoaQuanTams
{
    public class HangHoaQuanTamRepository : BaseRepository<HangHoaQuanTam, HangHoaQuanTamModal, Guid, HangHoaQuanTamDTO>, IHangHoaQuanTamRepository
    {
        public HangHoaQuanTamRepository(CrmDbContext crmDbContext, IMapper mapper) : base(crmDbContext, mapper)
        {
        }



        public async Task<List<HangHoaQuanTamDTO>> GetHangHoaQuanTamByCoHoiId(string id)
        {
            var db = await _crmDbContext.HangHoaQuanTams.Where(r => r.CoHoiId == id && r.BaoGiaId == null).Include(r => r.DonViTinh).ToListAsync();
            return _mapper.Map<List<HangHoaQuanTamDTO>>(db);
        }

        public async Task<List<HangHoaQuanTamDTO>> GetHangHoaQuanTamByKhachHangId(string id)
        {
            var db = await _crmDbContext.HangHoaQuanTams.Where(r => r.KhachHangId == id && r.CoHoiId == null).Include(r => r.DonViTinh).ToListAsync();
            return _mapper.Map<List<HangHoaQuanTamDTO>>(db);
        }
        public async Task<List<HangHoaQuanTamDTO>> GetHangHoaQuanTamByBaoGiaId(Guid id)
        {
            var db = await _crmDbContext.HangHoaQuanTams.Where(r => r.BaoGiaId == id).Include(r => r.DonViTinh).ToListAsync();
            return _mapper.Map<List<HangHoaQuanTamDTO>>(db);
        }
        public async Task<List<HangHoaQuanTamDTO>> GetHangHoaQuanTamByKhachHangTiemNangId(Guid id)
        {
            var db = await _crmDbContext.HangHoaQuanTams.Where(r => r.KhachHangTiemNangId == id).Include(r => r.DonViTinh).ToListAsync();
            return _mapper.Map<List<HangHoaQuanTamDTO>>(db);
        }

        public async Task<ResultModal> UpdateHangHoaQuanTam(List<HangHoaQuanTamModal> hanghoaquantam)
        {
            try
            {
                foreach (var item in hanghoaquantam)
                {
                    var db = _crmDbContext.HangHoaQuanTams.FirstOrDefault(r => r.Id == item.Id);
                    if (db != null)
                    {
                        db.MaHangHoaId = item.MaHangHoaId;
                        db.TenHangHoa = item.TenHangHoa;
                        db.KhachHangId = item.KhachHangId;
                        db.CoHoiId = item.CoHoiId;
                        db.BaoGiaId = item.BaoGiaId;
                        db.DonGia = item.DonGia;
                        db.SoLuong = item.SoLuong;
                        db.ThueSuat = item.ThueSuat;
                        db.TienThue = item.TienThue;
                        db.ThanhTien = item.ThanhTien;
                        db.TongTien = item.TongTien;
                        db.MaDonViTinh = item.MaDonViTinh;
                        db.ChiecKhauDonHang = item.ChiecKhauDonHang;
                        _crmDbContext.HangHoaQuanTams.Update(db);
                    }
                    else
                    {
                        HangHoaQuanTam hangHoaQuanTamNew = new HangHoaQuanTam();
                        hangHoaQuanTamNew.Id = Guid.NewGuid();
                        hangHoaQuanTamNew.MaHangHoaId = item.MaHangHoaId;
                        hangHoaQuanTamNew.KhachHangId = item.KhachHangId;
                        hangHoaQuanTamNew.TenHangHoa = item.TenHangHoa;
                        hangHoaQuanTamNew.CoHoiId = item.CoHoiId;
                        hangHoaQuanTamNew.BaoGiaId = item.BaoGiaId;
                        hangHoaQuanTamNew.DonGia = item.DonGia;
                        hangHoaQuanTamNew.SoLuong = item.SoLuong;
                        hangHoaQuanTamNew.ThueSuat = item.ThueSuat;
                        hangHoaQuanTamNew.TienThue = item.TienThue;
                        hangHoaQuanTamNew.ThanhTien = item.ThanhTien;
                        hangHoaQuanTamNew.TongTien = item.TongTien;
                        hangHoaQuanTamNew.ChiecKhauDonHang = item.ChiecKhauDonHang;
                        hangHoaQuanTamNew.MaDonViTinh = item.MaDonViTinh;
                        _crmDbContext.HangHoaQuanTams.Add(hangHoaQuanTamNew);

                    }
                }
                await _crmDbContext.SaveChangesAsync();
                return new ResultModal() { Status = 200, Message = "Cập nhật hàng hóa thành công", Success = true };
            }
            catch (Exception ex)
            {
                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };
            }
        }

        public async Task<List<HangHoaQuanTamDTO>> GetHangHoaQuanTamByDonHangid(Guid id)
        {
            var db = await _crmDbContext.HangHoaQuanTams.Where(r => r.HoaDonId == id).Include(r => r.DonViTinh).ToListAsync();
            return _mapper.Map<List<HangHoaQuanTamDTO>>(db);
        }

        public async Task<ResultModal> CreateHangHoaQuanTam(HangHoaQuanTamModal modal)
        {
            var db = _crmDbContext.HangHoaQuanTams.FirstOrDefault(r => r.Id == modal.Id);
            try
            {
                if (db == null)
                {
                    HangHoaQuanTam hangHoaQuanTam = new HangHoaQuanTam();
                    hangHoaQuanTam.Id = modal.Id;
                    hangHoaQuanTam.MaHangHoaId = modal.MaHangHoaId;
                    hangHoaQuanTam.TenHangHoa = modal.TenHangHoa;
                    hangHoaQuanTam.MaDonViTinh = modal.MaDonViTinh;
                    hangHoaQuanTam.KhachHangTiemNangId = modal.KhachHangTiemNangId;
                    hangHoaQuanTam.KhachHangId = modal.KhachHangId;
                    hangHoaQuanTam.BaoGiaId = modal.BaoGiaId;
                    hangHoaQuanTam.CoHoiId = modal.CoHoiId;
                    hangHoaQuanTam.HoaDonId = modal.HoaDonId;
                    hangHoaQuanTam.SoLuong = modal.SoLuong;
                    hangHoaQuanTam.DonGia = modal.DonGia;
                    hangHoaQuanTam.ThueSuat = modal.ThueSuat;
                    hangHoaQuanTam.TienThue = modal.TienThue;
                    hangHoaQuanTam.ChiecKhauDonHang = modal.ChiecKhauDonHang;
                    hangHoaQuanTam.ThanhTien = modal.ThanhTien;
                    hangHoaQuanTam.TongTien = modal.TongTien;
                    hangHoaQuanTam.MaDonViTinh = modal.MaDonViTinh;

                    _crmDbContext.HangHoaQuanTams.Add(hangHoaQuanTam);
                    await _crmDbContext.SaveChangesAsync();

                    return new ResultModal() { Status = 200, Message = "Thêm mới thành công", Success = true };

                }
                return new ResultModal() { Status = 202, Message = "Dữ liệu đã tồn tại trong hệ thống", Success = false };

            }
            catch (Exception ex)
            {
                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };
            }
        }
    }
}
