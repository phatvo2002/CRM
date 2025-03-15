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
            var db = await _crmDbContext.HangHoaQuanTams.Where(r => r.CoHoiId == id && r.BaoGiaId == null).ToListAsync();
            return _mapper.Map<List<HangHoaQuanTamDTO>>(db);
        }

        public async Task<List<HangHoaQuanTamDTO>> GetHangHoaQuanTamByKhachHangId(string id)
        {
            var db = await _crmDbContext.HangHoaQuanTams.Where(r => r.KhachHangId == id && r.CoHoiId == null).ToListAsync();
            return _mapper.Map<List<HangHoaQuanTamDTO>>(db);
        }
        public async Task<List<HangHoaQuanTamDTO>> GetHangHoaQuanTamByBaoGiaId(Guid id)
        {
            var db = await _crmDbContext.HangHoaQuanTams.Where(r => r.BaoGiaId == id).ToListAsync();
            return _mapper.Map<List<HangHoaQuanTamDTO>>(db);
        }
        public async Task<List<HangHoaQuanTamDTO>> GetHangHoaQuanTamByKhachHangTiemNangId(Guid id)
        {
            var db = await _crmDbContext.HangHoaQuanTams.Where(r => r.KhachHangTiemNangId == id).ToListAsync();
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
            var db = await _crmDbContext.HangHoaQuanTams.Where(r => r.HoaDonId == id).ToListAsync();
            return _mapper.Map<List<HangHoaQuanTamDTO>>(db);
        }
    }
}
