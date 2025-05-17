using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.MucTieuDoanhSos;
using Microsoft.EntityFrameworkCore;

namespace CRM.Repositories.DonHangs
{
    public class DonHangRepository : BaseRepository<DonHang, DonHangModal, Guid, DonHangDTO>, IDonHangRepository
    {
        private readonly IMapper _mapper;
        private readonly IMucTieuDoanhSoRepository _mucTieuDoanhSoRepository;
        public DonHangRepository(CrmDbContext crmDbContext, IMapper mapper, IMucTieuDoanhSoRepository mucTieuDoanhSoRepository) : base(crmDbContext, mapper)
        {
            _mapper = mapper;
            _mucTieuDoanhSoRepository = mucTieuDoanhSoRepository;
        }



        public async Task<ResultModal> ConvertDonHang(DonHangModal modal, Guid nguoiDungId, Guid phongBanId)
        {
            try
            {
                var db = _crmDbContext.DonHangs.Where(r => r.Id == modal.Id).FirstOrDefault();
                if (db == null)
                {
                    DonHang donHang = new DonHang();
                    donHang.TenDonHang = modal.TenDonHang;
                    donHang.MaQuanLy = Helper.Helper.GetUniqueKey(8);
                    donHang.MoTaDonHang = modal.MoTaDonHang;
                    donHang.NgayDatHang = modal.NgayDatHang;
                    donHang.HanGiaoHang = modal.HanGiaoHang;
                    donHang.HanThanhToan = modal.HanThanhToan;
                    donHang.MaBaoGia = modal.MaBaoGia;
                    donHang.MaTinhTrangDonHang = modal.MaTinhTrangDonHang;
                    donHang.MaKhachHang = modal.MaKhachHang;
                    donHang.MaLoaiDonHang = modal.MaLoaiDonHang;
                    donHang.MaTinhTrangGhiDoanhSo = modal.MaTinhTrangGhiDoanhSo;
                    donHang.GiaTriDonHang = modal.GiaTriDonHang;
                    donHang.MaLienHe = null;
                    donHang.Id = Guid.NewGuid();
                    donHang.ThucThuDonHang = modal.ThucThuDonHang;
                    donHang.SoTienConPhaiThu = modal.GiaTriDonHang - modal.ThucThuDonHang;
                    donHang.PhuongThucThanhToan = modal.PhuongThucThanhToan;
                    donHang.SoTaiKhoanNganHang = modal.SoTaiKhoanNganHang;
                    donHang.ChuTaiKhoan = modal.ChuTaiKhoan;
                    donHang.NguoiDungId = nguoiDungId;
                    donHang.PhongBanId = phongBanId;
                    donHang.IsDeleted = false;
                    donHang.CreateAt = DateTime.Now;
                    _crmDbContext.DonHangs.Add(donHang);

                    foreach (var item in modal.HangHoaQuanTam)
                    {
                        //var dbHangHoa = _crmDbContext.HangHoaQuanTams.Where(r => r.Id == item.Id ).FirstOrDefault();
                        //if (dbHangHoa != null)
                        //{
                        //    dbHangHoa.KhachHangId = donHang.MaKhachHang;
                        //    dbHangHoa.HoaDonId = donHang.Id;
                        //    _crmDbContext.HangHoaQuanTams.Update(dbHangHoa);
                        //}
                        //else
                        //{
                        HangHoaQuanTam hangHoaQuanTam = new HangHoaQuanTam();
                        hangHoaQuanTam.Id = Guid.NewGuid();
                        hangHoaQuanTam.MaHangHoaId = item.MaHangHoaId;
                        hangHoaQuanTam.TenHangHoa = item.TenHangHoa;
                        hangHoaQuanTam.KhachHangId = donHang.MaKhachHang;
                        hangHoaQuanTam.KhachHangTiemNangId = null;
                        hangHoaQuanTam.CoHoiId = null;
                        hangHoaQuanTam.SoLuong = item.SoLuong;
                        hangHoaQuanTam.ThanhTien = item.ThanhTien;
                        hangHoaQuanTam.TongTien = item.TongTien;
                        hangHoaQuanTam.ThueSuat = item.ThueSuat;
                        hangHoaQuanTam.TienThue = item.TienThue;
                        hangHoaQuanTam.DonGia = item.DonGia;
                        hangHoaQuanTam.BaoGiaId = donHang.MaBaoGia;
                        hangHoaQuanTam.MaDonViTinh = item.MaDonViTinh;
                        hangHoaQuanTam.ChiecKhauDonHang = item.ChiecKhauDonHang;
                        hangHoaQuanTam.HoaDonId = donHang.Id;
                        _crmDbContext.HangHoaQuanTams.Add(hangHoaQuanTam);
                        //}
                    }
                    await _crmDbContext.SaveChangesAsync();
                    return new ResultModal() { Message = "Tạo đơn hàng thành công", Status = 200, Success = true };
                }
                return new ResultModal() { Message = "Đơn hàng đã tồn tại trong hệ thống", Status = 202, Success = true };
            }
            catch (Exception ex)
            {
                return new ResultModal() { Message = ex.Message, Status = 500, Success = true };
            }
        }

        public async Task<List<DonHangDTO>> GetAllDonHang(DateTime tuNgay, DateTime denNgay)
        {
            var db = await _crmDbContext.DonHangs.AsNoTracking()
                .Where(r => r.CreateAt >= tuNgay &&
                           r.CreateAt <= denNgay &&
                           r.IsDeleted == false)
                .Include(r => r.KhachHangMucTieu)
                .Include(r => r.Nguoidung).Include(r => r.TinhTrangDonHang).ToListAsync();
            return _mapper.Map<List<DonHangDTO>>(db);
        }



        public async Task<List<DonHangDTO>> GetDonHangByKhachHangId(string khachHangId)
        {
            var db = await _crmDbContext.DonHangs.AsNoTracking().Where(r => r.MaKhachHang == khachHangId
                                                               ).Include(r => r.KhachHangMucTieu)
                                                                .Include(r => r.Nguoidung)
                                                                .Include(r => r.TinhTrangDonHang).ToListAsync();
            return _mapper.Map<List<DonHangDTO>>(db);
        }

        public async Task<List<DonHangDTO>> GetDonHangByNguoiDungId(Guid nguoiDungId, DateTime tuNgay, DateTime denNgay)
        {
            var db = await _crmDbContext.DonHangs.AsNoTracking().Where(r => r.NguoiDungId == nguoiDungId &&
                                                                            r.CreateAt >= tuNgay &&
                                                                            r.CreateAt <= denNgay &&
                                                                            r.IsDeleted == false).Include(r => r.KhachHangMucTieu)
                .Include(r => r.Nguoidung).Include(r => r.TinhTrangDonHang).ToListAsync();
            return _mapper.Map<List<DonHangDTO>>(db);
        }

        public async Task<List<DonHangDTO>> GetDonHangByPhongBanId(Guid phongBanId, DateTime tuNgay, DateTime denNgay)
        {
            var db = await _crmDbContext.DonHangs.AsNoTracking().Where(r => r.PhongBanId == phongBanId &&
                                                                            r.CreateAt >= tuNgay &&
                                                                            r.CreateAt <= denNgay &&
                                                                            r.IsDeleted == false).Include(r => r.KhachHangMucTieu)
                .Include(r => r.Nguoidung).Include(r => r.TinhTrangDonHang).ToListAsync();
            return _mapper.Map<List<DonHangDTO>>(db);
        }

        public async Task<DonHangDTO> GetDonHangId(Guid id)
        {
            var db = await _crmDbContext.DonHangs.Where(r => r.Id == id).Include(r => r.KhachHangMucTieu).Include(r => r.Nguoidung).Include(r => r.TinhTrangDonHang).FirstOrDefaultAsync();
            return _mapper.Map<DonHangDTO>(db);
        }

        public async Task<ResultModal> XacNhanDonHang(XacNhanDonHangModal modal)
        {
            var db = _crmDbContext.DonHangs.Where(r => r.Id == modal.Id).Include(r => r.Nguoidung).FirstOrDefault();
            try
            {
                if (db != null)
                {

                    if (modal.Type == 1)
                    {
                        if (db.Nguoidung?.Id is Guid nguoiDungID && db.Nguoidung?.MaPhongBan is Guid phongBanId)
                        {
                            db.MaTinhTrangDonHang = 3;
                            db.LyDoHuyDon = null;

                            _crmDbContext.DonHangs.Update(db);
                            await _crmDbContext.SaveChangesAsync();

                            await _mucTieuDoanhSoRepository.UpdateMucTieuDoanhSoData(
                                nguoiDungID,
                                phongBanId,
                                6,
                                (double)db.GiaTriDonHang
                            );

                            return new ResultModal
                            {
                                Status = 200,
                                Message = "Xác nhận đơn hàng thành công",
                                Success = true
                            };
                        }
                        else return new ResultModal
                        {
                            Status = 202,
                            Message = "Đã có lỗi xảy ra",
                            Success = true
                        };
                    }
                    else
                    {
                        db.MaTinhTrangDonHang = 9;
                        db.LyDoHuyDon = modal.LyDoHuyDon;
                        _crmDbContext.DonHangs.Update(db);
                        await _crmDbContext.SaveChangesAsync();
                        return new ResultModal() { Status = 200, Message = "Hủy đơn thành công", Success = true };
                    }


                }
                else return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
            }
            catch (Exception ex)
            {
                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };
            }



        }
        public async Task<ResultModal> CapNhatThucThuDonHang(Guid id, decimal soTien)
        {
            try
            {
                var db = await _crmDbContext.DonHangs.Where(r => r.Id == id).FirstOrDefaultAsync();
                if (db != null)
                {
                    db.ThucThuDonHang += soTien;
                    db.SoTienConPhaiThu = db.GiaTriDonHang - db.ThucThuDonHang;
                    _crmDbContext.DonHangs.Update(db);
                    await _crmDbContext.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Thành công", Success = true };
                }
                else return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
            }
            catch
            {
                return new ResultModal() { Status = 500, Message = "Lỗi", Success = false };
            }
        }

        public async Task<List<LichSuMuaHangDTO>> GetLichSuMuaHang(string khachHangId)
        {
            var result = new List<LichSuMuaHangDTO>();
            var db = await _crmDbContext.DonHangs.Where(r => r.MaKhachHang == khachHangId && r.IsDeleted == false).ToListAsync();
            if (db != null)
            {
                foreach (var item in db)
                {
                    LichSuMuaHangDTO data = new LichSuMuaHangDTO();
                    data.TenDonHang = item.TenDonHang;
                    data.NgayDatHang = item.NgayDatHang;
                    data.MoTaDonHang = item.MoTaDonHang;
                    data.ThucThuDonHang = item.ThucThuDonHang;
                    data.GiaTriDonHang = item.GiaTriDonHang;
                    data.SoTienConPhaiThu = item.SoTienConPhaiThu;
                    var dataHangHoaQuanTam = await _crmDbContext.HangHoaQuanTams.Where(r => r.HoaDonId == item.Id).Include(r => r.DonViTinh).ToListAsync();
                    List<HangHoaQuanTamDTO> ListHangHoa = new List<HangHoaQuanTamDTO>();
                    foreach (var item2 in dataHangHoaQuanTam)
                    {
                        HangHoaQuanTamDTO hangHoaQuanTam = new HangHoaQuanTamDTO();
                        hangHoaQuanTam.MaHangHoaId = item2.MaHangHoaId;
                        hangHoaQuanTam.TenHangHoa = item2.TenHangHoa;
                        hangHoaQuanTam.TenDonViTinh = item2?.DonViTinh?.Name;
                        hangHoaQuanTam.SoLuong = item2?.SoLuong;
                        hangHoaQuanTam.DonGia = item2?.DonGia;
                        hangHoaQuanTam.TienThue = item2?.TienThue;
                        hangHoaQuanTam.ThanhTien = item2?.ThanhTien;
                        hangHoaQuanTam.TongTien = item2?.TongTien;
                        ListHangHoa.Add(hangHoaQuanTam);
                    }
                    data.HangHoaDTOs = ListHangHoa;

                    result.Add(data);
                }
                return result;
            }
            else
            {
                throw new Exception("Không tìm thấy dữ liệu");
            };
        }
    }
}
