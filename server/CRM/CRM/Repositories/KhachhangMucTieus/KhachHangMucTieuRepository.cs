using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.MucTieuDoanhSos;
using Microsoft.EntityFrameworkCore;

namespace CRM.Repositories.KhachhangMucTieus
{
    public class KhachHangMucTieuRepository : BaseRepository<KhachHangMucTieu, KhachHangMucTieuModal, Guid, KhachHangMucTieuDTO>, IKhachHangMucTieuRepository
    {
        private readonly IMucTieuDoanhSoRepository _mucTieuDoanhSoRepository;
        public KhachHangMucTieuRepository(CrmDbContext crmDbContext, IMapper mapper, IMucTieuDoanhSoRepository mucTieuDoanhSoRepository) : base(crmDbContext, mapper)
        {
            _mucTieuDoanhSoRepository = mucTieuDoanhSoRepository;
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

                    // Đưa toàn bộ dữ liệu hàng hóa của tiềm năng đang quan tâm thành của KH mục tiêu 
                    foreach (var h in modal.HangHoaQuanTam)
                    {
                        var hangHoa = await _crmDbContext.HangHoaQuanTams.FirstOrDefaultAsync(r => r.Id == h.Id);
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
                            hangHoaQuanTam.TenHangHoa = h.TenHangHoa;
                            hangHoaQuanTam.MaDonViTinh = h.MaDonViTinh;
                            hangHoaQuanTam.KhachHangId = khachHangMucTieu.Id;
                            hangHoaQuanTam.KhachHangTiemNangId = h.KhachHangTiemNangId;
                            hangHoaQuanTam.SoLuong = h.SoLuong;
                            hangHoaQuanTam.DonGia = h.DonGia;
                            hangHoaQuanTam.ThueSuat = h.ThueSuat;
                            hangHoaQuanTam.TienThue = h.TienThue;
                            hangHoaQuanTam.ThanhTien = h.ThanhTien;
                            hangHoaQuanTam.TongTien = h.TongTien;
                            _crmDbContext.HangHoaQuanTams.Add(hangHoaQuanTam);
                        }
                    }
                    foreach (var lh in modal.LienHe)
                    {
                        var lienHeData = _crmDbContext.LienHes.Where(l => l.Id == lh.Id).FirstOrDefault();
                        if (lienHeData != null)
                        {
                            lienHeData.KhachHangId = modal.Id;
                            _crmDbContext.Update(lienHeData);
                        }
                        else
                        {
                            continue;
                        }
                    }

                    _crmDbContext.KhachHangMucTieus.Add(khachHangMucTieu);

                    // chuyển trạng thái của tiềm năng thành đã chuyển đổi
                    var dbKhTiemnang = _crmDbContext.KhachHangTiemNangs.FirstOrDefault(r => r.Id == modal.KhachHangTiemNangId);
                    if (dbKhTiemnang != null)
                    {
                        dbKhTiemnang.IsChuyenDoi = true;
                        _crmDbContext.KhachHangTiemNangs.Update(dbKhTiemnang);
                    }

                    await _mucTieuDoanhSoRepository.UpdateMucTieuDoanhSoData(nguoiDungId, phongBanId, 3, 0);


                    await _crmDbContext.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Chuyển đổi khách hàng thành công", Success = true };
                }
                else
                {
                    return new ResultModal() { Status = 202, Message = "Dữ liệu đã tồn tại trong hệ thống", Success = false };
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
                    khachHangMucTieu.NgayThanhLap = modal.NgayThanhLap;
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
        }

        public async Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuByNguoiDungId(Guid NguoiDungId, DateTime tuNgay, DateTime denNgay)
        {
            var db = await _crmDbContext.KhachHangMucTieus.Where(r => r.NguoiDungId == NguoiDungId && r.IsDeleted == false && r.CreateAt >= tuNgay && r.CreateAt <= denNgay)
                .Include(r => r.NguonGocKhachHang).Include(r => r.LoaiTiemNang).Include(r => r.Nguoidung).ToListAsync();
            return _mapper.Map<List<KhachHangMucTieuDTO>>(db);
        }

        public async Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuByNguoiDungIdQuery(Guid NguoiDungId)
        {
            var db = await _crmDbContext.KhachHangMucTieus.Where(r => r.NguoiDungId == NguoiDungId && r.IsDeleted == false)
               .Include(r => r.NguonGocKhachHang).Include(r => r.LoaiTiemNang).Include(r => r.Nguoidung).ToListAsync();
            return _mapper.Map<List<KhachHangMucTieuDTO>>(db);
        }

        public async Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuByPhongBanId(Guid PhongBanId, DateTime tuNgay, DateTime denNgay)
        {
            var db = await _crmDbContext.KhachHangMucTieus.Where(r => r.PhongBanId == PhongBanId && r.IsDeleted == false && r.CreateAt >= tuNgay && r.CreateAt <= denNgay)
                .Include(r => r.NguonGocKhachHang)
                .Include(r => r.LoaiTiemNang).Include(r => r.Nguoidung).ToListAsync();
            return _mapper.Map<List<KhachHangMucTieuDTO>>(db);
        }

        public async Task<ResultModal> UpdateKhachHangMucTieu(KhachHangMucTieuModal modal, Guid nguoiDungId, Guid phongBanId)
        {
            var db = _crmDbContext.KhachHangMucTieus.FirstOrDefault(r => r.Id == modal.Id);
            try
            {
                if (db != null)
                {
                    db.TenKhachHang = modal.TenKhachHang;
                    db.TenVietTat = modal.TenVietTat;
                    db.MaSoThue = modal.MaSoThue;
                    db.SoDienThoai = modal.SoDienThoai;
                    db.Email = modal.Email;
                    db.TaiKhoanNganHang = modal.TaiKhoanNganHang;
                    db.Website = modal.Website;
                    db.MoTa = modal.MoTa;
                    db.NgayThanhLap = modal.NgayThanhLap;
                    db.IsKhachHangCaNhan = modal.IsKhachHangCaNhan;
                    db.IsNhaPhanPhoi = modal.IsNhaPhanPhoi;
                    db.IsDungChung = modal.IsDungChung;
                    db.ThongTinGiaoHang = modal.ThongTinGiaoHang;
                    db.ThongTinHoaDon = modal.ThongTinHoaDon;
                    db.MaPhongbanKhachHang = modal.MaPhongbanKhachHang;
                    db.MaNguonGocKhachHang = modal.MaNguonGocKhachHang;
                    db.MaLoaiTiemNang = modal.MaLoaiTiemNang;
                    db.MaLinhVuc = modal.MaLinhVuc;
                    db.MaNganhNghe = modal.MaNganhNghe;
                    db.MaDoanhThu = modal.MaDoanhThu;
                    db.NguoiDungId = nguoiDungId;
                    db.PhongBanId = phongBanId;
                    _crmDbContext.KhachHangMucTieus.Update(db);
                    await _crmDbContext.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Chỉnh sửa dữ liệu thành công", Success = true };
                }
                return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
            }
            catch (Exception ex)
            {
                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };
            }

        }
        public async Task<ResultModal> BanGiaoKhachHangMucTieu(BanGiaoModal modal)
        {
            var db = _crmDbContext.KhachHangMucTieus.FirstOrDefault(r => r.Id == modal.KhachHangMucTieuId);
            try
            {
                if (db != null)
                {
                    db.NguoiDungId = modal.NguoiDungId;
                    _crmDbContext.KhachHangMucTieus.Update(db);
                    if (modal.CheckIsCuocGoi == true)
                    {
                        var cuocGoiData = _crmDbContext.CuocGois.Where(r => r.KhachHangMucTieuId == modal.KhachHangMucTieuId).ToList();
                        foreach (var item in cuocGoiData)
                        {
                            if (item != null)
                            {
                                item.NguoiDungId = modal.NguoiDungId;
                                _crmDbContext.CuocGois.Update(item);
                            }
                            else
                            {
                                continue;
                            }
                        }
                    }
                    if (modal.CheckIsLichHen == true)
                    {
                        var lichHenData = _crmDbContext.LichHens.Where(r => r.KhachHangMucTieuId == modal.KhachHangMucTieuId).ToList();
                        foreach (var item in lichHenData)
                        {
                            if (item != null)
                            {
                                item.NguoiDungId = modal.NguoiDungId;
                                _crmDbContext.LichHens.Update(item);
                            }
                            else
                            {
                                continue;
                            }
                        }
                    }
                    if (modal.CheckIsNhiemVu == true)
                    {
                        var nhiemVuData = _crmDbContext.NhiemVus.Where(r => r.KhachHangMucTieuId == modal.KhachHangMucTieuId).ToList();
                        foreach (var item in nhiemVuData)
                        {
                            if (item != null)
                            {
                                item.NguoiDungId = modal.NguoiDungId;
                                _crmDbContext.NhiemVus.Update(item);
                            }
                            else
                            {
                                continue;
                            }
                        }
                    }
                    await _crmDbContext.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Bàn giao thành công", Success = true };
                }
                return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
            }
            catch (Exception ex)
            {
                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };
            }


        }

        public async Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuDaXoaByNguoiDungId(Guid NguoiDungId)
        {
            var db = await _crmDbContext.KhachHangMucTieus.Where(r => r.NguoiDungId == NguoiDungId && r.IsDeleted == true).ToListAsync();
            return _mapper.Map<List<KhachHangMucTieuDTO>>(db);
        }

        public async Task<List<KhachHangMucTieuDTO>> GetKhachHangMucTieuDaXoaByPhongBanId(Guid PhongBanId)
        {
            var db = await _crmDbContext.KhachHangMucTieus.Where(r => r.PhongBanId == PhongBanId && r.IsDeleted == true).ToListAsync();
            return _mapper.Map<List<KhachHangMucTieuDTO>>(db);
        }

        public async Task<ResultModal> KhoiPhucKhachHang(List<KhachHangMucTieuModal> modal)
        {
            try
            {
                foreach (var item in modal)
                {
                    var db = _crmDbContext.KhachHangMucTieus.Where(r => r.Id == item.Id).FirstOrDefault();
                    if (db != null)
                    {
                        db.IsDeleted = false;
                        _crmDbContext.KhachHangMucTieus.Update(db);
                    }
                    else { continue; }
                }
                await _crmDbContext.SaveChangesAsync();
                return new ResultModal() { Status = 200, Message = "Khôi phục thành công", Success = true };
            }
            catch (Exception ex)
            {
                return new ResultModal() { Status = 500, Message = ex.Message, Success = true };
            }

        }
    }
}
