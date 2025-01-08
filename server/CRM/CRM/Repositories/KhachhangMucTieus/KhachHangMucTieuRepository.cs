using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using Microsoft.EntityFrameworkCore;

namespace CRM.Repositories.KhachhangMucTieus
{
    public class KhachHangMucTieuRepository : BaseRepository<KhachHangMucTieu, KhachHangMucTieuModal, Guid, KhachHangMucTieuDTO>, IKhachHangMucTieuRepository
    {
        public KhachHangMucTieuRepository(CrmDbContext crmDbContext, IMapper mapper) : base(crmDbContext, mapper)
        {
        }

        public async Task<ResultModal> ConvertKhachHangMucTieu(ConvertKhachHangModal modal, Guid nguoiDungId, Guid phongBanId)
        {
            var db = _crmDbContext.KhachHangMucTieus.FirstOrDefault(r => r.Id == modal.Id);
            try
            {
                if (db == null)
                {
                    KhachHangMucTieu khachHangMucTieu = new KhachHangMucTieu();
                    khachHangMucTieu.Id = modal.Id;
                    khachHangMucTieu.TenKhachHang = modal.TenKhachHang;
                    khachHangMucTieu.TenVietTat = modal.TenVietTat;
                    khachHangMucTieu.MaSoThue = modal.MaSoThue;
                    khachHangMucTieu.SoDienThoai = modal.SoDienThoai;
                    khachHangMucTieu.Email = modal.Email;
                    khachHangMucTieu.TaiKhoanNganHang = modal.TaiKhoanNganHang;
                    khachHangMucTieu.NgayThanhLap = modal.NgayThanhLap;
                    khachHangMucTieu.Website = modal.Website;
                    khachHangMucTieu.MoTa = modal.MoTa;
                    khachHangMucTieu.IsKhachHangCaNhan = modal.IsKhachHangCaNhan;
                    khachHangMucTieu.IsDungChung = modal.IsDungChung;
                    khachHangMucTieu.IsNhaPhanPhoi = modal.IsNhaPhanPhoi;
                    khachHangMucTieu.ThongTinGiaoHang = modal.ThongTinGiaoHang;
                    khachHangMucTieu.ThongTinHoaDon = modal.ThongTinHoaDon;
                    khachHangMucTieu.MaPhongbanKhachHang = modal.MaPhongbanKhachHang;
                    khachHangMucTieu.MaNguonGocKhachHang = modal.MaNguonGocKhachHang;
                    khachHangMucTieu.MaLoaiTiemNang = modal.MaLoaiTiemNang;
                    khachHangMucTieu.MaLoaiHinhNgheNghiep = modal.MaLoaiHinhNgheNghiep;
                    khachHangMucTieu.MaLinhVuc = modal.MaLinhVuc;
                    khachHangMucTieu.MaDoanhThu = modal.MaDoanhThu;
                    khachHangMucTieu.MaNganhNghe = modal.MaNganhNghe;
                    khachHangMucTieu.NguoiDungId = nguoiDungId;
                    khachHangMucTieu.PhongBanId = phongBanId;
                    khachHangMucTieu.IsDeleted = false;
                    khachHangMucTieu.CreateAt = DateTime.Now;
                    foreach (var h in modal.HangHoaQuanTam)
                    {
                        var hangHoa = _crmDbContext.HangHoaQuanTams.FirstOrDefault(r => r.Id == h.Id);
                        if (hangHoa != null)
                        {
                            hangHoa.KhachHangId = modal.Id;
                            _crmDbContext.HangHoaQuanTams.Update(hangHoa);
                        }
                        else
                        {
                            HangHoaQuanTam hangHoaQuanTam = new HangHoaQuanTam();
                            hangHoaQuanTam.Id = Guid.NewGuid();
                            hangHoaQuanTam.MaHangHoaId = h.MaHangHoaId;
                            hangHoaQuanTam.KhachHangId = modal.Id;
                            hangHoaQuanTam.KhachHangTiemNangId = h.KhachHangTiemNangId;
                            hangHoaQuanTam.SoLuong = h.SoLuong;
                            hangHoaQuanTam.ThanhTien = h.ThanhTien;
                            hangHoaQuanTam.TongTien = h.TongTien;
                            _crmDbContext.HangHoaQuanTams.Add(hangHoaQuanTam);
                        }
                    }
                    _crmDbContext.KhachHangMucTieus.Add(khachHangMucTieu);
                    await _crmDbContext.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Chuyển đổi khách hàng thành công", Success = true };
                }
                else
                {
                    return new ResultModal() { Status = 202, Message = "Tiềm năng này đã được chuyển đổi thành khách hàng", Success = false };
                }
            }
            catch (Exception ex)
            {
                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };
            }

        }

        public async Task<ResultModal> CreateKhachHangMucTieu(KhachHangMucTieuModal modal, Guid nguoiDungId, Guid phongBanId)
        {
            var db = _crmDbContext.KhachHangMucTieus.FirstOrDefault(r => r.Id == modal.Id);
            try
            {
                if (db == null)
                {
                    KhachHangMucTieu khachHangMucTieu = new KhachHangMucTieu();
                    khachHangMucTieu.Id = modal.Id;
                    khachHangMucTieu.TenKhachHang = modal.TenKhachHang;
                    khachHangMucTieu.TenVietTat = modal.TenVietTat;
                    khachHangMucTieu.MaSoThue = modal.MaSoThue;
                    khachHangMucTieu.SoDienThoai = modal.SoDienThoai;
                    khachHangMucTieu.Email = modal.Email;
                    khachHangMucTieu.TaiKhoanNganHang = modal.TaiKhoanNganHang;
                    khachHangMucTieu.Website = modal.Website;
                    khachHangMucTieu.MoTa = modal.MoTa;
                    khachHangMucTieu.IsKhachHangCaNhan = modal.IsKhachHangCaNhan;
                    khachHangMucTieu.IsDungChung = modal.IsDungChung;
                    khachHangMucTieu.IsNhaPhanPhoi = modal.IsNhaPhanPhoi;
                    khachHangMucTieu.ThongTinGiaoHang = modal.ThongTinGiaoHang;
                    khachHangMucTieu.ThongTinHoaDon = modal.ThongTinHoaDon;
                    khachHangMucTieu.MaPhongbanKhachHang = modal.MaPhongbanKhachHang;
                    khachHangMucTieu.MaNguonGocKhachHang = modal.MaNguonGocKhachHang;
                    khachHangMucTieu.MaLoaiTiemNang = modal.MaLoaiTiemNang;
                    khachHangMucTieu.MaLoaiHinhNgheNghiep = modal.MaLoaiHinhNgheNghiep;
                    khachHangMucTieu.MaLinhVuc = modal.MaLinhVuc;
                    khachHangMucTieu.MaDoanhThu = modal.MaDoanhThu;
                    khachHangMucTieu.MaNganhNghe = modal.MaNganhNghe;
                    khachHangMucTieu.NguoiDungId = nguoiDungId;
                    khachHangMucTieu.PhongBanId = phongBanId;
                    khachHangMucTieu.IsDeleted = false;
                    khachHangMucTieu.CreateAt = DateTime.Now;
                    _crmDbContext.KhachHangMucTieus.Add(khachHangMucTieu);
                    await _crmDbContext.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Thêm khách hàng thành công", Success = true };
                }
                return new ResultModal() { Status = 202, Message = "Khách hàng đã tồn tại trong hệ thống", Success = false };

            }
            catch (Exception ex)
            {
                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };
            }

            throw new NotImplementedException();
        }

        public async Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuByNguoiDungId(Guid NguoiDungId)
        {
            var db = await _crmDbContext.KhachHangMucTieus.Where(r => r.NguoiDungId == NguoiDungId).Include(r => r.NguonGocKhachHang).Include(r => r.LoaiTiemNang).ToListAsync();
            return _mapper.Map<List<KhachHangMucTieuDTO>>(db);
        }

        public async Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuByPhongBanId(Guid PhongBanId)
        {
            var db = await _crmDbContext.KhachHangMucTieus.Where(r => r.PhongBanId == PhongBanId).Include(r => r.NguonGocKhachHang).Include(r => r.LoaiTiemNang).ToListAsync();
            return _mapper.Map<List<KhachHangMucTieuDTO>>(db);
        }
    }
}
