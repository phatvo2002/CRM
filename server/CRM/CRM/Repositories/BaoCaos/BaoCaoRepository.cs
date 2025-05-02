using CRM.DTO.BaoCaoDTO;
using CRM.Entities;
using Microsoft.EntityFrameworkCore;

namespace CRM.Repositories.BaoCaos
{
    public class BaoCaoRepository : IBaoCaoRepository
    {
        private readonly CrmDbContext _context;
        public BaoCaoRepository(CrmDbContext context)
        {
            _context = context;
        }
        public async Task<BaoCaoDTO> GetBaoCaoTheoNguoiDung(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId)
        {
            var thoiGianTuNgayThangTruoc = tuNgay.AddMonths(-1);
            var thoiGianDenNgayThangTruoc = denNgay.AddMonths(-1);

            BaoCaoDTO baoCaoDTO = new BaoCaoDTO();

            var nguoiDungData = await _context.Nguoidungs.FirstOrDefaultAsync(r => r.Id == nguoiDungId);
            try
            {
                if (nguoiDungData != null)
                {

                    var dataKhachHangTiemNangHienTai = await _context.KhachHangTiemNangs.Where(r => (r.CreateAt >= tuNgay && r.CreateAt <= denNgay && r.IsChuyenDoi == true) && r.NguoiDungId == nguoiDungId).ToListAsync();
                    var dataKhachHangTiemNangThangTruoc = await _context.KhachHangTiemNangs.Where(r => (r.CreateAt >= thoiGianTuNgayThangTruoc && r.CreateAt <= thoiGianDenNgayThangTruoc) && r.NguoiDungId == nguoiDungId && r.IsChuyenDoi == true).AsNoTracking().ToListAsync();
                    if (dataKhachHangTiemNangHienTai != null)
                    {
                        baoCaoDTO.KhachHangTiemNangHienTai = dataKhachHangTiemNangHienTai.Count();
                        baoCaoDTO.TiLeChuyenDoiKhachHangThangHienTai = dataKhachHangTiemNangHienTai.Any()
                          ? Math.Round((decimal)dataKhachHangTiemNangHienTai.Count(r => r.IsChuyenDoi == true) / dataKhachHangTiemNangHienTai.Count() * 100, 2) : 0;
                    }
                    else baoCaoDTO.KhachHangTiemNangHienTai = 0; baoCaoDTO.TiLeChuyenDoiKhachHangThangHienTai = 0;
                    if (dataKhachHangTiemNangThangTruoc != null)
                    {
                        baoCaoDTO.KhachHangTiemNangThangTruoc = dataKhachHangTiemNangThangTruoc.Count();
                        baoCaoDTO.TiLeChuyenDoiKhachHangThangTruoc = (dataKhachHangTiemNangThangTruoc.Any() ? Math.Round((decimal)dataKhachHangTiemNangThangTruoc.Count(r => r.IsChuyenDoi == true) / dataKhachHangTiemNangThangTruoc.Count() * 100, 2) : 0);
                    }
                    else baoCaoDTO.KhachHangTiemNangThangTruoc = 0; baoCaoDTO.TiLeChuyenDoiKhachHangThangTruoc = 0;

                    // lấy danh sách cơ hội hiện tại
                    baoCaoDTO.TongSoCoHoiHienTai = await LayTongSoTheoNguoiDungAsync(_context.CoHois, tuNgay, denNgay, nguoiDungId);
                    // lấy danh sách cơ hội của tháng trước
                    baoCaoDTO.TongSoCoHoiThangTruoc = await LayTongSoTheoNguoiDungAsync(_context.CoHois, thoiGianTuNgayThangTruoc, thoiGianDenNgayThangTruoc, nguoiDungId);
                    // lấy tổng số báo giá hiện tại 
                    baoCaoDTO.TongSoBaoGiaHienTai = await LayTongSoTheoNguoiDungAsync(_context.BaoGias, tuNgay, denNgay, nguoiDungId);
                    // Lấy tổng số báo giá của tháng trước
                    baoCaoDTO.TongSoBaoGiaThangTruoc = await LayTongSoTheoNguoiDungAsync(_context.BaoGias, thoiGianTuNgayThangTruoc, thoiGianTuNgayThangTruoc, nguoiDungId);
                    // Lấy tổng số đơn hàng hiện tại 
                    baoCaoDTO.TongSoDonHangHienTai = await LayTongSoTheoNguoiDungAsync(_context.DonHangs, tuNgay, denNgay, nguoiDungId);
                    // Lấy tổng số đơn hàng của tháng trước
                    baoCaoDTO.TongSoDonHangThangTruoc = await LayTongSoTheoNguoiDungAsync(_context.DonHangs, thoiGianTuNgayThangTruoc, thoiGianDenNgayThangTruoc, nguoiDungId);
                    // Lấy tổng doanh thu của tháng hiện tại 
                    baoCaoDTO.TongDoanhThuHienTai = await LayTongDoanhThu(_context.DonHangs, tuNgay, denNgay, nguoiDungId);
                    // Lấy tổng doanh thu của tháng trước 
                    baoCaoDTO.TongDoanhThuThangTruoc = await LayTongDoanhThu(_context.DonHangs, thoiGianTuNgayThangTruoc, thoiGianDenNgayThangTruoc, nguoiDungId);
                }

                return baoCaoDTO;

            }
            catch
            {
                return baoCaoDTO;
            }

        }
        public async Task<List<BaoCaoCoHoiDTO>> BaoCaoTheoCoHoi(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId)
        {
            var dataNguoiDung = await _context.Nguoidungs.Where(r => r.Id == nguoiDungId).FirstOrDefaultAsync();
            List<BaoCaoCoHoiDTO> result = new List<BaoCaoCoHoiDTO>();
            if (dataNguoiDung != null)
            {
                if (dataNguoiDung.CheckIsGiamDoc == false)
                {
                    // nếu là nhân viên kinh doanh thì có thể thấy được dữ liệu của chính bản thân
                    if (dataNguoiDung.CheckIsTruongPhong == false)
                    {
                        var dbCoHoi = await _context.CoHois.Where(r => r.NguoiDungId == nguoiDungId && (r.CreateAt >= tuNgay && r.CreateAt <= denNgay)).Include(r => r.GiaiDoanBanHang).ToListAsync();
                        if (dbCoHoi.Count > 0)
                        {
                            var data = dbCoHoi.GroupBy(r => r.MaGiaiDoanBanHang);
                            foreach (var item in data)
                            {
                                result.Add(new BaoCaoCoHoiDTO
                                {
                                    TenCoHoi = item.First().GiaiDoanBanHang.TenGiaiDoan,
                                    SoLuong = item.Count(),
                                    MauSac = LayMauSacTheoGiaiDoan((int)item.First().GiaiDoanBanHang.Stt),
                                });
                            }
                        }
                    }
                    // nếu là trưởng phòng thì có thể thấy dữ liệu của tất cả phòng ban
                    else
                    {
                        var dbCoHoi = await _context.CoHois.Where(r => r.PhongBanId == dataNguoiDung.MaPhongBan && (r.CreateAt >= tuNgay && r.CreateAt <= denNgay)).Include(r => r.GiaiDoanBanHang).ToListAsync();
                        if (dbCoHoi.Count > 0)
                        {
                            var data = dbCoHoi.GroupBy(r => r.MaGiaiDoanBanHang);
                            foreach (var item in data)
                            {
                                result.Add(new BaoCaoCoHoiDTO
                                {
                                    TenCoHoi = item.First().GiaiDoanBanHang.TenGiaiDoan,
                                    SoLuong = item.Count(),
                                    MauSac = LayMauSacTheoGiaiDoan((int)item.First().GiaiDoanBanHang.Stt),
                                });
                            }
                        }

                    }
                }
                // nếu là giám đốc thì có thể xem hết
                else
                {
                    var dbCoHoi = await _context.CoHois.Where(r => r.CreateAt >= tuNgay && r.CreateAt <= denNgay).Include(r => r.GiaiDoanBanHang).ToListAsync();
                    if (dbCoHoi.Count > 0)
                    {
                        var data = dbCoHoi.GroupBy(r => r.MaGiaiDoanBanHang);
                        foreach (var item in data)
                        {
                            result.Add(new BaoCaoCoHoiDTO
                            {
                                TenCoHoi = item.First().GiaiDoanBanHang.TenGiaiDoan,
                                SoLuong = item.Count(),
                                MauSac = LayMauSacTheoGiaiDoan((int)item.First().GiaiDoanBanHang.Stt),
                            });
                        }
                    }
                }
            }

            return result;
        }
        public async Task<List<BaoCaoResultDTO>> BaoCaoBaoGia(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId)
        {
            var dataNguoiDung = await _context.Nguoidungs.Where(r => r.Id == nguoiDungId).FirstOrDefaultAsync();
            var result = new List<BaoCaoResultDTO>();
            if (dataNguoiDung != null)
            {
                if (dataNguoiDung.CheckIsTruongPhong == false)
                {
                    var dbBaoGia = await _context.BaoGias.Where(r => r.NguoiDungId == nguoiDungId && (r.CreateAt >= tuNgay && r.CreateAt <= denNgay) && r.IsDeleted == false).Include(r => r.TinhTrangBaoGia).ToListAsync();
                    if (dbBaoGia != null)
                    {
                        var groupBaoGia = dbBaoGia.GroupBy(r => r.MaTinhTrangBaoGia);
                        foreach (var group in groupBaoGia)
                        {
                            result.Add(new BaoCaoResultDTO
                            {
                                Name = group.First().TinhTrangBaoGia.Name,
                                Number = group.Count()
                            });
                        }

                    }
                }
                else
                {
                    var dbBaoGia = await _context.BaoGias.Where(r => r.PhongBanId == dataNguoiDung.MaPhongBan && (r.CreateAt >= tuNgay && r.CreateAt <= denNgay) && r.IsDeleted == false).Include(r => r.TinhTrangBaoGia).ToListAsync();
                    if (dbBaoGia != null)
                    {
                        var groupBaoGia = dbBaoGia.GroupBy(r => r.MaTinhTrangBaoGia);
                        foreach (var group in groupBaoGia)
                        {
                            result.Add(new BaoCaoResultDTO
                            {
                                Name = group.First().TinhTrangBaoGia.Name,
                                Number = group.Count()
                            });
                        }

                    }

                }
            }
            else return new List<BaoCaoResultDTO>();
            return result;
        }
        public async Task<List<BaoCaoResultDTO>> BaoCaoDonHang(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId)
        {
            var dbNguoiDung = await _context.Nguoidungs.Where(r => r.Id == nguoiDungId).FirstOrDefaultAsync();
            var result = new List<BaoCaoResultDTO>();
            if (dbNguoiDung != null)
            {
                if (dbNguoiDung.CheckIsTruongPhong == false)
                {
                    var dbDonhang = await _context.DonHangs.Where(r => r.NguoiDungId == nguoiDungId && (r.CreateAt >= tuNgay && r.CreateAt <= denNgay) && r.IsDeleted == false).Include(r => r.TinhTrangDonHang).ToListAsync();
                    if (dbDonhang != null)
                    {
                        var groupDonHang = dbDonhang.GroupBy(r => r.MaTinhTrangDonHang);
                        foreach (var item in groupDonHang)
                        {
                            result.Add(new BaoCaoResultDTO
                            {
                                Name = item.First().TinhTrangDonHang.Name,
                                Number = item.Count(),

                            });
                        }
                    }
                }
                else
                {
                    var dbDonhang = await _context.DonHangs.Where(r => r.PhongBanId == dbNguoiDung.MaPhongBan && (r.CreateAt >= tuNgay && r.CreateAt <= denNgay) && r.IsDeleted == false).Include(r => r.TinhTrangDonHang).ToListAsync();
                    if (dbDonhang != null)
                    {
                        var groupDonHang = dbDonhang.GroupBy(r => r.MaTinhTrangDonHang);
                        foreach (var item in groupDonHang)
                        {
                            result.Add(new BaoCaoResultDTO
                            {
                                Name = item.First().TinhTrangDonHang.Name,
                                Number = item.Count(),

                            });
                        }
                    }
                }
            }
            else return new List<BaoCaoResultDTO>();

            return result;

        }
        public async Task<BaoCaoHoatDongDTO> GetBaoCaoHoatDong(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId)
        {
            var thoiGianTuNgayThangTruoc = tuNgay.AddMonths(-1);
            var thoiGianDenNgayThangTruoc = denNgay.AddMonths(-1);
            var nguoiDungData = _context.Nguoidungs.FirstOrDefault(r => r.Id == nguoiDungId);
            var result = new BaoCaoHoatDongDTO();
            if (nguoiDungData != null)
            {
                if (nguoiDungData.CheckIsGiamDoc == false)
                {
                    // lấy dữ liệu nếu nếu người dùng là nhân viên 
                    if (nguoiDungData.CheckIsTruongPhong == false)
                    {
                        // lấy data cuộc gọi đã hoàn thành
                        var dbCuoiGoiHienTai = await _context.CuocGois.Where(r => r.NguoiDungId == nguoiDungId && (r.CreateAt >= tuNgay && r.CreateAt <= denNgay) && r.IsHoanThanh == true && r.IsDeleted == false).ToListAsync();
                        if (dbCuoiGoiHienTai != null) { result.TongSoCuocGoiHienTai = dbCuoiGoiHienTai.Count(); }
                        else result.TongSoCuocGoiHienTai = 0;
                        var dbCuoiGoiThangTruoc = await _context.CuocGois.Where(r => r.NguoiDungId == nguoiDungId && (r.CreateAt <= thoiGianTuNgayThangTruoc && r.CreateAt <= thoiGianDenNgayThangTruoc) && r.IsHoanThanh == true && r.IsDeleted == false).ToListAsync();
                        if (dbCuoiGoiThangTruoc != null)
                        { result.TongSoCuocGoiThangTruoc = dbCuoiGoiThangTruoc.Count(); }
                        else result.TongSoCuocGoiThangTruoc = 0;


                        // lấy data nhiệm vụ đã hoàn thành
                        var dbNhiemVuHienTai = await _context.NhiemVus.Where(r => r.NguoiDungId == nguoiDungId && (r.CreateAt >= tuNgay && r.CreateAt <= denNgay) && r.TrangThaiThucHienId == Guid.Parse("7980BB30-26AF-4D8A-BDD9-F4DC630CA8D5") && r.IsDeleted == false).ToListAsync();
                        if (dbNhiemVuHienTai != null) { result.TongSoNhiemVuDaHoanThanhhienTai = dbNhiemVuHienTai.Count(); }
                        else result.TongSoNhiemVuDaHoanThanhhienTai = 0;
                        var dbNhiemVuThangTruoc = await _context.NhiemVus.Where(r => r.NguoiDungId == nguoiDungId && (r.CreateAt <= thoiGianTuNgayThangTruoc && r.CreateAt <= thoiGianDenNgayThangTruoc) && r.TrangThaiThucHienId == Guid.Parse("7980BB30-26AF-4D8A-BDD9-F4DC630CA8D5") && r.IsDeleted == false).ToListAsync();
                        if (dbNhiemVuThangTruoc != null) { result.TongSoNhiemVuDaHoanThanhThangTruoc = dbNhiemVuThangTruoc.Count(); }
                        else result.TongSoNhiemVuDaHoanThanhThangTruoc = 0;

                        // lấy data lịch hẹn 
                        var dbLichHenHienTai = await _context.LichHens.Where(r => r.NguoiDungId == nguoiDungId && (r.CreateAt >= tuNgay && r.CreateAt <= denNgay) && r.TrangThaiThucHienId == Guid.Parse("7980BB30-26AF-4D8A-BDD9-F4DC630CA8D5") && r.IsDeleted == false).ToListAsync();
                        if (dbLichHenHienTai != null) { result.TongSoLichHenHienTai = dbLichHenHienTai.Count(); }
                        else result.TongSoLichHenHienTai = 0;
                        var dbLichHenThangTruoc = await _context.LichHens.Where(r => r.NguoiDungId == nguoiDungId && (r.CreateAt <= thoiGianTuNgayThangTruoc && r.CreateAt <= thoiGianDenNgayThangTruoc) && r.TrangThaiThucHienId == Guid.Parse("7980BB30-26AF-4D8A-BDD9-F4DC630CA8D5") && r.IsDeleted == false).ToListAsync();
                        if (dbLichHenThangTruoc != null) { result.TongSoLichHenCuaThangTruoc = dbLichHenThangTruoc.Count(); }
                        else result.TongSoLichHenCuaThangTruoc = 0;

                    }
                    // lấy dữ liệu người dùng là trưởng phòng
                    else
                    {
                        // lấy data cuộc gọi đã hoàn thành
                        var dbCuoiGoiHienTai = await _context.CuocGois.Where(r => r.PhongBanId == nguoiDungData.MaPhongBan && (r.CreateAt >= tuNgay && r.CreateAt <= denNgay) && r.IsHoanThanh == true && r.IsDeleted == false).ToListAsync();
                        if (dbCuoiGoiHienTai != null) { result.TongSoCuocGoiHienTai = dbCuoiGoiHienTai.Count(); }
                        else result.TongSoCuocGoiHienTai = 0;
                        var dbCuoiGoiThangTruoc = await _context.CuocGois.Where(r => r.PhongBanId == nguoiDungData.MaPhongBan && (r.CreateAt <= thoiGianTuNgayThangTruoc && r.CreateAt <= thoiGianDenNgayThangTruoc) && r.IsHoanThanh == true && r.IsDeleted == false).ToListAsync();
                        if (dbCuoiGoiThangTruoc != null)
                        { result.TongSoCuocGoiThangTruoc = dbCuoiGoiThangTruoc.Count(); }
                        else result.TongSoCuocGoiThangTruoc = 0;
                        // lấy data nhiệm vụ đã hoàn thành
                        var dbNhiemVuHienTai = await _context.NhiemVus.Where(r => r.PhongBanId == nguoiDungData.MaPhongBan && (r.CreateAt >= tuNgay && r.CreateAt <= denNgay) && r.TrangThaiThucHienId == Guid.Parse("7980BB30-26AF-4D8A-BDD9-F4DC630CA8D5") && r.IsDeleted == false).ToListAsync();
                        if (dbNhiemVuHienTai != null) { result.TongSoNhiemVuDaHoanThanhhienTai = dbNhiemVuHienTai.Count(); }
                        else result.TongSoNhiemVuDaHoanThanhhienTai = 0;
                        var dbNhiemVuThangTruoc = await _context.NhiemVus.Where(r => r.PhongBanId == nguoiDungData.MaPhongBan && (r.CreateAt <= thoiGianTuNgayThangTruoc && r.CreateAt <= thoiGianDenNgayThangTruoc) && r.TrangThaiThucHienId == Guid.Parse("7980BB30-26AF-4D8A-BDD9-F4DC630CA8D5") && r.IsDeleted == false).ToListAsync();
                        if (dbNhiemVuThangTruoc != null) { result.TongSoNhiemVuDaHoanThanhThangTruoc = dbNhiemVuThangTruoc.Count(); }
                        else result.TongSoNhiemVuDaHoanThanhThangTruoc = 0;

                        // lấy data lịch hẹn 
                        var dbLichHenHienTai = await _context.LichHens.Where(r => r.PhongBanId == nguoiDungData.MaPhongBan && (r.CreateAt >= tuNgay && r.CreateAt <= denNgay) && r.TrangThaiThucHienId == Guid.Parse("7980BB30-26AF-4D8A-BDD9-F4DC630CA8D5") && r.IsDeleted == false).ToListAsync();
                        if (dbLichHenHienTai != null) { result.TongSoLichHenHienTai = dbLichHenHienTai.Count(); }
                        else result.TongSoLichHenHienTai = 0;
                        var dbLichHenThangTruoc = await _context.LichHens.Where(r => r.PhongBanId == nguoiDungData.MaPhongBan && (r.CreateAt <= thoiGianTuNgayThangTruoc && r.CreateAt <= thoiGianDenNgayThangTruoc) && r.TrangThaiThucHienId == Guid.Parse("7980BB30-26AF-4D8A-BDD9-F4DC630CA8D5") && r.IsDeleted == false).ToListAsync();
                        if (dbLichHenThangTruoc != null) { result.TongSoLichHenCuaThangTruoc = dbLichHenThangTruoc.Count(); }
                        else result.TongSoLichHenCuaThangTruoc = 0;
                    }
                }
                // lấy dữ liệu nếu người dùng là ban lãnh đạo
                else
                {
                    // lấy data cuộc gọi đã hoàn thành
                    var dbCuoiGoiHienTai = await _context.CuocGois.Where(r => (r.CreateAt >= tuNgay && r.CreateAt <= denNgay) && r.IsHoanThanh == true && r.IsDeleted == false).ToListAsync();
                    if (dbCuoiGoiHienTai != null) { result.TongSoCuocGoiHienTai = dbCuoiGoiHienTai.Count(); }
                    else result.TongSoCuocGoiHienTai = 0;
                    var dbCuoiGoiThangTruoc = await _context.CuocGois.Where(r => (r.CreateAt <= thoiGianTuNgayThangTruoc && r.CreateAt <= thoiGianDenNgayThangTruoc) && r.IsHoanThanh == true && r.IsDeleted == false).ToListAsync();
                    if (dbCuoiGoiThangTruoc != null)
                    { result.TongSoCuocGoiThangTruoc = dbCuoiGoiThangTruoc.Count(); }
                    else result.TongSoCuocGoiThangTruoc = 0;
                    // lấy data nhiệm vụ đã hoàn thành
                    var dbNhiemVuHienTai = await _context.NhiemVus.Where(r => (r.CreateAt >= tuNgay && r.CreateAt <= denNgay) && r.TrangThaiThucHienId == Guid.Parse("7980BB30-26AF-4D8A-BDD9-F4DC630CA8D5") && r.IsDeleted == false).ToListAsync();
                    if (dbNhiemVuHienTai != null) { result.TongSoNhiemVuDaHoanThanhhienTai = dbNhiemVuHienTai.Count(); }
                    else result.TongSoNhiemVuDaHoanThanhhienTai = 0;
                    var dbNhiemVuThangTruoc = await _context.NhiemVus.Where(r => (r.CreateAt <= thoiGianTuNgayThangTruoc && r.CreateAt <= thoiGianDenNgayThangTruoc) && r.TrangThaiThucHienId == Guid.Parse("7980BB30-26AF-4D8A-BDD9-F4DC630CA8D5") && r.IsDeleted == false).ToListAsync();
                    if (dbNhiemVuThangTruoc != null) { result.TongSoNhiemVuDaHoanThanhThangTruoc = dbNhiemVuThangTruoc.Count(); }
                    else result.TongSoNhiemVuDaHoanThanhThangTruoc = 0;

                    // lấy data lịch hẹn 
                    var dbLichHenHienTai = await _context.LichHens.Where(r => (r.CreateAt >= tuNgay && r.CreateAt <= denNgay) && r.TrangThaiThucHienId == Guid.Parse("7980BB30-26AF-4D8A-BDD9-F4DC630CA8D5") && r.IsDeleted == false).ToListAsync();
                    if (dbLichHenHienTai != null) { result.TongSoLichHenHienTai = dbLichHenHienTai.Count(); }
                    else result.TongSoLichHenHienTai = 0;
                    var dbLichHenThangTruoc = await _context.LichHens.Where(r => (r.CreateAt <= thoiGianTuNgayThangTruoc && r.CreateAt <= thoiGianDenNgayThangTruoc) && r.TrangThaiThucHienId == Guid.Parse("7980BB30-26AF-4D8A-BDD9-F4DC630CA8D5") && r.IsDeleted == false).ToListAsync();
                    if (dbLichHenThangTruoc != null) { result.TongSoLichHenCuaThangTruoc = dbLichHenThangTruoc.Count(); }
                    else result.TongSoLichHenCuaThangTruoc = 0;
                }
            }
            return result;
        }
        public async Task<List<BaoCaoTop5KhachHangTuongTac>> BaoCaoTop5KhachHangTuongTac(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId)
        {
            var result = new List<BaoCaoTop5KhachHangTuongTac>();
            var dbKhachHangTuongTac = await _context.CuocGois.Where(r => r.NguoiDungId == nguoiDungId && r.IsDeleted == false && (r.CreateAt >= tuNgay && r.CreateAt <= denNgay))
                .Include(r => r.KhachHangMucTieu).Include(r => r.KhachHangTiemNang)
                .ToListAsync();
            if (dbKhachHangTuongTac != null)
            {
                var top5KhachHangTuongTac = dbKhachHangTuongTac.OrderByDescending(r => r.CreateAt).Take(5);
                int stt = 1;
                foreach (var item in top5KhachHangTuongTac)
                {
                    result.Add(new BaoCaoTop5KhachHangTuongTac
                    {
                        Id = item.Id,
                        STT = stt,
                        TenHoatDong = item.TieuDe,
                        TenKhachHang = item.KhachHangTiemNang.TenKhachHang != null ? item.KhachHangTiemNang.TenKhachHang : item.KhachHangMucTieu.TenKhachHang,
                        ThoiGian = (DateTime)item.CreateAt,
                        TrangThaiThucHien = item.IsHoanThanh == false ? "Chưa hoàn thành" : "Hoàn thành",
                    });
                }
            }
            return result;
        }
        public async Task<List<BaoCaoResultDTO>> BaoCaoCuocGoiTheoTrangThai(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId)
        {
            var result = new List<BaoCaoResultDTO>();
            var dbNguoiDung = await _context.Nguoidungs.Where(r => r.Id == nguoiDungId).FirstOrDefaultAsync();
            if (dbNguoiDung != null)
            {
                // lấy dữ liệu khi là nhân viên
                if (dbNguoiDung.CheckIsTruongPhong == false)
                {
                    var dbCuocGoi = await _context.CuocGois.Where(r => r.NguoiDungId == nguoiDungId && (r.CreateAt >= tuNgay && r.CreateAt <= denNgay) && r.IsDeleted == false).Include(r => r.KetQuaCuocGoi).ToListAsync();
                    if (dbCuocGoi != null)
                    {
                        var dbCuocGoiGroup = dbCuocGoi.GroupBy(r => r.KetQuaCuocGoiId);
                        foreach (var item in dbCuocGoiGroup)
                        {
                            result.Add(new BaoCaoResultDTO
                            {
                                Name = item.First().KetQuaCuocGoi.Name,
                                Number = item.Count()
                            });
                        }
                    }
                    else { result.Add(new BaoCaoResultDTO { Name = "Không có dữ liệu", Number = 0 }); }
                }
                // lấy dữ liệu khi là trưởng phòng
                else
                {
                    var dbCuocGoi = await _context.CuocGois.Where(r => r.PhongBanId == dbNguoiDung.MaPhongBan && (r.CreateAt >= tuNgay && r.CreateAt <= denNgay)).Include(r => r.KetQuaCuocGoi).ToListAsync();
                    if (dbCuocGoi != null)
                    {
                        var dbCuocGoiGroup = dbCuocGoi.GroupBy(r => r.KetQuaCuocGoiId);
                        foreach (var item in dbCuocGoiGroup)
                        {
                            result.Add(new BaoCaoResultDTO
                            {
                                Name = item.First().KetQuaCuocGoi.Name,
                                Number = item.Count()
                            });
                        }
                    }
                    else { result.Add(new BaoCaoResultDTO { Name = "Không có dữ liệu", Number = 0 }); }
                }
            }
            else { result.Add(new BaoCaoResultDTO { Name = "Không có dữ liệu", Number = 0 }); }
            return result;
        }
        // Hàm xử lý báo cáo dành cho ban lãnh đạo công ty 
        public async Task<BaoCaoDoanhThuDTO> BaoCaoDoanhThu(DateTime tuNgay, DateTime denNgay)
        {
            var thoiGianTuNgayThangTruoc = tuNgay.AddMonths(-1);
            var thoiGianDenNgayThangTruoc = denNgay.AddMonths(-1);
            var result = new BaoCaoDoanhThuDTO();
            var dbDoanhThu = await _context.DonHangs.Where(r => r.CreateAt >= tuNgay && r.CreateAt <= denNgay).ToListAsync();
            if (dbDoanhThu != null)
            {

                result.DoanhThuHienTai = dbDoanhThu.Sum(r => r.ThucThuDonHang);
            }
            else result.DoanhThuHienTai = 0;
            var dbDoanhThuThangTruoc = await _context.DonHangs.Where(r => r.CreateAt >= thoiGianTuNgayThangTruoc && r.CreateAt <= thoiGianDenNgayThangTruoc).ToListAsync();
            if (dbDoanhThuThangTruoc != null)
            {
                result.DoanhThuThangTruoc = dbDoanhThuThangTruoc.Sum(r => r.ThucThuDonHang);
            }
            else result.DoanhThuThangTruoc = 0;
            return result;
        }
        public async Task<List<BaoCaoDoanhThuTheoNamDTO>> BaoCaoDoanhThuTheonam(int nam)
        {
            var result = new List<BaoCaoDoanhThuTheoNamDTO>();
            var dbDoanhThu = await _context.DonHangs.Where(r => (r.CreateAt.HasValue && r.CreateAt.Value.Year == nam) && r.IsDeleted == false).ToListAsync();
            var dbDoanhThuTheoThang = dbDoanhThu.GroupBy(r => r.CreateAt.Value.Month).Select(g => new BaoCaoDoanhThuTheoNamDTO
            {
                Thang = g.Key,
                DoanhThu = g.Sum(r => r.ThucThuDonHang),
            });
            var fullResult = Enumerable.Range(1, 12)
       .Select(thang => result.FirstOrDefault(r => r.Thang == thang) ?? new BaoCaoDoanhThuTheoNamDTO
       {
           Thang = thang,
           DoanhThu = 0
       })
       .OrderBy(r => r.Thang)
       .ToList();

            return fullResult;
        }

        public async Task<List<BaoCaoDoanhThuTheoPhongBanDTO>> BaoCaoDoanhThuTheoPhongBan(DateTime tuNgay, DateTime denNgay)
        {
            var result = new List<BaoCaoDoanhThuTheoPhongBanDTO>();
            var dbDoanhThu = await _context.DonHangs.Where(r => (r.CreateAt >= tuNgay && r.CreateAt <= denNgay) && r.IsDeleted == false).Include(r => r.PhongBan).ToListAsync();
            if (dbDoanhThu.Count > 0)
            {

                var doanhThuGroup = dbDoanhThu.GroupBy(r => r.PhongBanId);
                foreach (var item in doanhThuGroup)
                {
                    var testDataa = item.First().PhongBan.TenPhongBan;
                    if (item.First().PhongBan.TenPhongBan != "Phòng IT")
                    {
                        result.Add(new BaoCaoDoanhThuTheoPhongBanDTO
                        {
                            TenPhongBan = item.First().PhongBan.TenPhongBan,
                            DoanhThu = item.Sum(r => r.ThucThuDonHang),
                        });
                    }
                    else { continue; }

                }
            }
            else result.Add(new BaoCaoDoanhThuTheoPhongBanDTO { TenPhongBan = "Không có dữ liệu", DoanhThu = 0 });

            return result;
        }
        public async Task<List<BaoCaoSoSanhMucTieuDTO>> BaoCaoSoSanhMucTieuDoanhSo(DateTime tuNgay, DateTime denNgay, int nam)
        {
            var dbDoanhSoTheoQuy = await _context.DonHangs
                .Where(r => r.CreateAt.HasValue &&
                            r.CreateAt.Value.Year == nam &&
                            r.CreateAt >= tuNgay && r.CreateAt <= denNgay &&
                            r.IsDeleted == false)
                .ToListAsync();

            var dbMucTieuDoanhSoTheoQuy = await _context.MucTieuDoanhSos
                .Where(r => r.CreateAt.HasValue &&
                            r.CreateAt.Value.Year == nam &&
                            r.CreateAt >= tuNgay && r.CreateAt <= denNgay &&
                            r.IsDeleted == false)
                .ToListAsync();

            if (!dbDoanhSoTheoQuy.Any() || !dbMucTieuDoanhSoTheoQuy.Any())
                return new List<BaoCaoSoSanhMucTieuDTO>();

            var doanhSoTheoThang = dbDoanhSoTheoQuy
                .GroupBy(r => r.CreateAt.Value.Month)
                .ToDictionary(g => g.Key, g => g.Sum(r => r.ThucThuDonHang));

            var mucTieuTheoThang = dbMucTieuDoanhSoTheoQuy
                .GroupBy(r => r.CreateAt.Value.Month)
                .ToDictionary(g => g.Key, g => g.Sum(r => r.DoanhSo ?? 0));

            var result = doanhSoTheoThang
                .Select(ds => new BaoCaoSoSanhMucTieuDTO
                {
                    Thang = ds.Key,
                    MucTieuThucTe = ds.Value,
                    MucTieu = (decimal)(mucTieuTheoThang.ContainsKey(ds.Key) ? mucTieuTheoThang[ds.Key] : 0)
                })
                .OrderByDescending(r => r.Thang)
                .ToList();

            return result;
        }
        public async Task<List<BaoCaoResultDTO>> BaoCaoNguonGocKhachHang(DateTime tuNgay, DateTime denNgay)
        {
            var db = await _context.KhachHangTiemNangs.Where(r => r.CreateAt >= tuNgay && r.CreateAt <= denNgay && r.IsDeleted == false).Include(r => r.NguonGocKhachHang).ToListAsync();
            if (db != null)
            {
                var dbGroup = db.GroupBy(r => r.MaNguonGocKhachHang).Select(g => new BaoCaoResultDTO
                {
                    Name = g.First().NguonGocKhachHang.TenNguonGoc,
                    Number = g.Count(),
                }).ToList();
                return dbGroup;
            }
            else return new List<BaoCaoResultDTO>();
        }
        public async Task<List<BaoCaoTop5NhanVienSuatSac>> BaoCaoTop5NhanVienSuatSacNhat(DateTime tuNgay, DateTime denNgay, int type)
        {
            if (type == 1)
            {
                var hoanThanhId = Guid.Parse("7980BB30-26AF-4D8A-BDD9-F4DC630CA8D5");

                var cuocGoi = await _context.CuocGois
                    .Where(r => r.CreateAt >= tuNgay && r.CreateAt <= denNgay && r.IsDeleted == false && r.IsHoanThanh == true).Include(r => r.Nguoidung)
                    .GroupBy(r => new { r.Nguoidung.Id, r.Nguoidung.HoVaDem, r.Nguoidung.Ten }) // Giả sử có NhanVienId và navigation property NhanVien
                    .Select(g => new
                    {
                        NhanVienId = g.Key.Id,
                        Name = $"{g.Key.HoVaDem + "" + g.Key.Ten}",
                        SoCuocGoiHoanThanh = g.Count()
                    })
                    .ToListAsync();

                var lichHen = await _context.LichHens
                    .Where(r => r.CreateAt >= tuNgay && r.CreateAt <= denNgay && r.IsDeleted == false && r.TrangThaiThucHienId == hoanThanhId).Include(r => r.Nguoidung)
                    .GroupBy(r => new { r.Nguoidung.Id, r.Nguoidung.HoVaDem, r.Nguoidung.Ten })
                    .Select(g => new
                    {
                        NhanVienId = g.Key.Id,
                        Name = $"{g.Key.HoVaDem + "" + g.Key.Ten}",
                        SoLichHenHoanThanh = g.Count()
                    })
                    .ToListAsync();

                var nhiemVu = await _context.NhiemVus
                    .Where(r => r.CreateAt >= tuNgay && r.CreateAt <= denNgay && r.IsDeleted == false && r.TrangThaiThucHienId == hoanThanhId).Include(r => r.Nguoidung)
                    .GroupBy(r => new { r.Nguoidung.Id, r.Nguoidung.HoVaDem, r.Nguoidung.Ten })
                    .Select(g => new
                    {
                        NhanVienId = g.Key.Id,
                        Name = g.Key.Ten,
                        SoNhiemVuHoanThanh = g.Count()
                    })
                    .ToListAsync();

                // Gộp dữ liệu
                var result = cuocGoi
                    .Union(lichHen.Select(x => new { x.NhanVienId, x.Name, SoCuocGoiHoanThanh = 0 }))
                    .Union(nhiemVu.Select(x => new { x.NhanVienId, x.Name, SoCuocGoiHoanThanh = 0 }))
                    .GroupBy(x => new { x.NhanVienId, x.Name })
                    .Select(g =>
                    {
                        var nvId = g.Key.NhanVienId;
                        var name = g.Key.Name;

                        var cuocGoiCount = cuocGoi.FirstOrDefault(x => x.NhanVienId == nvId)?.SoCuocGoiHoanThanh ?? 0;
                        var lichHenCount = lichHen.FirstOrDefault(x => x.NhanVienId == nvId)?.SoLichHenHoanThanh ?? 0;
                        var nhiemVuCount = nhiemVu.FirstOrDefault(x => x.NhanVienId == nvId)?.SoNhiemVuHoanThanh ?? 0;

                        return new BaoCaoTop5NhanVienSuatSac
                        {
                            Name = name,
                            SoCuocGoiHoanThanh = cuocGoiCount,
                            SoLichHenHoanThanh = lichHenCount,
                            SoNhiemVuHoanThanh = nhiemVuCount
                        };
                    })
                    .OrderByDescending(x => x.SoCuocGoiHoanThanh + x.SoLichHenHoanThanh + x.SoNhiemVuHoanThanh)
                    .Take(5)
                    .Select((x, index) =>
                    {
                        x.STT = index + 1;
                        return x;
                    })
                    .ToList();

                return result;
            }
            else
            {
                var cuocGoi = await _context.CuocGois
                   .Where(r => r.CreateAt >= tuNgay && r.CreateAt <= denNgay && r.IsDeleted == false).Include(r => r.Nguoidung)
                   .GroupBy(r => new { r.Nguoidung.Id, r.Nguoidung.HoVaDem, r.Nguoidung.Ten })
                   .Select(g => new
                   {
                       NhanVienId = g.Key.Id,
                       Name = $"{g.Key.HoVaDem + "" + g.Key.Ten}",
                       SoCuocGoiHoanThanh = g.Count()
                   })
                   .ToListAsync();
                var lichHen = await _context.LichHens
                  .Where(r => r.CreateAt >= tuNgay && r.CreateAt <= denNgay && r.IsDeleted == false).Include(r => r.Nguoidung)
                  .GroupBy(r => new { r.Nguoidung.Id, r.Nguoidung.HoVaDem, r.Nguoidung.Ten })
                  .Select(g => new
                  {
                      NhanVienId = g.Key.Id,
                      Name = $"{g.Key.HoVaDem + "" + g.Key.Ten}",
                      SoLichHenHoanThanh = g.Count()
                  })
                  .ToListAsync();
                var nhiemVu = await _context.NhiemVus
                   .Where(r => r.CreateAt >= tuNgay && r.CreateAt <= denNgay && r.IsDeleted == false).Include(r => r.Nguoidung)
                   .GroupBy(r => new { r.Nguoidung.Id, r.Nguoidung.HoVaDem, r.Nguoidung.Ten })
                   .Select(g => new
                   {
                       NhanVienId = g.Key.Id,
                       Name = g.Key.Ten,
                       SoNhiemVuHoanThanh = g.Count()
                   })
                   .ToListAsync();
                var result = cuocGoi
                   .Union(lichHen.Select(x => new { x.NhanVienId, x.Name, SoCuocGoiHoanThanh = 0 }))
                   .Union(nhiemVu.Select(x => new { x.NhanVienId, x.Name, SoCuocGoiHoanThanh = 0 }))
                   .GroupBy(x => new { x.NhanVienId, x.Name })
                   .Select(g =>
                   {
                       var nvId = g.Key.NhanVienId;
                       var name = g.Key.Name;

                       var cuocGoiCount = cuocGoi.FirstOrDefault(x => x.NhanVienId == nvId)?.SoCuocGoiHoanThanh ?? 0;
                       var lichHenCount = lichHen.FirstOrDefault(x => x.NhanVienId == nvId)?.SoLichHenHoanThanh ?? 0;
                       var nhiemVuCount = nhiemVu.FirstOrDefault(x => x.NhanVienId == nvId)?.SoNhiemVuHoanThanh ?? 0;

                       return new BaoCaoTop5NhanVienSuatSac
                       {
                           Name = name,
                           SoCuocGoiHoanThanh = cuocGoiCount,
                           SoLichHenHoanThanh = lichHenCount,
                           SoNhiemVuHoanThanh = nhiemVuCount
                       };
                   })
                   .OrderByDescending(x => x.SoCuocGoiHoanThanh + x.SoLichHenHoanThanh + x.SoNhiemVuHoanThanh)
                   .Select((x, index) =>
                   {
                       x.STT = index + 1;
                       return x;
                   })
                   .ToList();

                return result;
            }

        }
        public async Task<List<BaoCaoTop5NhanVienCoDoanhThuCaoNhat>> BaoCaoTop5NhanVienCoDoanhThuCaoNhat(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId)
        {
            var dbNguoiDung = _context.Nguoidungs.FirstOrDefault(r => r.Id == nguoiDungId);
            if (dbNguoiDung != null)
            {
                if (dbNguoiDung.CheckIsGiamDoc == true && dbNguoiDung.CheckIsTruongPhong == false || dbNguoiDung.MaPhongBan == Guid.Parse("4D086C61-CC35-40D4-B9D9-816063DF1C32"))
                {
                    var dbDoanhThu = await _context.DonHangs.Where(r =>
                                                                   r.CreateAt >= tuNgay &&
                                                                   r.CreateAt <= denNgay &&
                                                                   r.IsDeleted == false)
                                                            .Include(r => r.Nguoidung)
                                                            .GroupBy(r => r.NguoiDungId)
                                                            .Select(g => new BaoCaoTop5NhanVienCoDoanhThuCaoNhat
                                                            {
                                                                TenNhanVien = $"{g.First().Nguoidung.HoVaDem}{g.First().Nguoidung.Ten}",
                                                                DoanhThu = g.Sum(r => r.GiaTriDonHang)
                                                            }).ToListAsync();
                    return dbDoanhThu;
                }
                else
                {
                    var dbDoanhThu = await _context.DonHangs.Where(r =>
                                                                  r.CreateAt >= tuNgay &&
                                                                  r.CreateAt <= denNgay &&
                                                                  r.IsDeleted == false &&
                                                                  r.PhongBanId == dbNguoiDung.MaPhongBan)
                                                           .Include(r => r.Nguoidung)
                                                           .GroupBy(r => r.NguoiDungId)
                                                           .Select(g => new BaoCaoTop5NhanVienCoDoanhThuCaoNhat
                                                           {
                                                               TenNhanVien = $"{g.First().Nguoidung.HoVaDem}{g.First().Nguoidung.Ten}",
                                                               DoanhThu = g.Sum(r => r.GiaTriDonHang)
                                                           }).ToListAsync();
                    return dbDoanhThu;
                }
            }
            else return new List<BaoCaoTop5NhanVienCoDoanhThuCaoNhat>();
        }
        private string LayMauSacTheoGiaiDoan(int maGiaiDoan)
        {
            string maMau = "";
            maMau = maGiaiDoan switch
            {
                1 => "8884d8",
                2 => "#83a6ed",
                3 => "#8dd1e1",
                4 => "#82ca9d",
                5 => "#a4de6c",
                6 => "#fff",
                _ => "#fff",
            };
            return maMau;
        }
        private async Task<int> LayTongSoTheoNguoiDungAsync<T>(IQueryable<T> query, DateTime tuNgay, DateTime denNgay, Guid nguoiDungId) where T : class
        {

            var checkPermissionData = await _context.Nguoidungs.FirstOrDefaultAsync(r => r.Id == nguoiDungId);
            if (checkPermissionData != null)
            {
                if (checkPermissionData.CheckIsTruongPhong == false)
                {
                    var result = await query.Where(r => (EF.Property<DateTime>(r, "CreateAt") >= tuNgay
                                                         && EF.Property<DateTime>(r, "CreateAt") <= denNgay)
                                                         && EF.Property<Guid>(r, "NguoiDungId") == nguoiDungId && EF.Property<bool>(r, "IsDelete") == false).ToListAsync();
                    if (result.Count() > 0)
                        return result.Count();
                    else return 0;
                }
                else
                {
                    var result = await query.Where(r => (EF.Property<DateTime>(r, "CreateAt") >= tuNgay
                                                          && EF.Property<DateTime>(r, "CreateAt") <= denNgay)
                                                          && EF.Property<Guid>(r, "PhongBanId") == checkPermissionData.MaPhongBan && EF.Property<bool>(r, "IsDelete") == false).ToListAsync();

                    if (result.Count() > 0)
                        return result.Count();
                    else return 0;
                }
            }
            else return 0;


        }
        private async Task<decimal> LayTongDoanhThu<T>(IQueryable<T> query, DateTime tuNgay, DateTime denNgay, Guid nguoiDungId) where T : class
        {
            var checkPermissionData = await _context.Nguoidungs.FirstOrDefaultAsync(r => r.Id == nguoiDungId);
            if (checkPermissionData != null)
            {
                if (checkPermissionData.CheckIsTruongPhong == false)
                {
                    var result = query.Where(r => (tuNgay >= EF.Property<DateTime>(r, "CreateAt")
                                                         && EF.Property<DateTime>(r, "CreateAt") <= denNgay)
                                                         && EF.Property<Guid>(r, "NguoiDungId") == nguoiDungId);
                    if (result.Count() > 0)
                        return result.Sum(r => EF.Property<decimal>(r, "ThuThuDonHang"));
                    else return 0;
                }
                else
                {
                    var result = query.Where(r => (tuNgay >= EF.Property<DateTime>(r, "CreateAt")
                                                        && EF.Property<DateTime>(r, "CreateAt") <= denNgay)
                                                        && EF.Property<Guid>(r, "PhongBanId") == checkPermissionData.MaPhongBan);
                    if (result.Count() > 0)
                        return result.Sum(r => EF.Property<decimal>(r, "ThuThuDonHang"));
                    else return 0;
                }
            }
            else return 0;
        }


    }
}
