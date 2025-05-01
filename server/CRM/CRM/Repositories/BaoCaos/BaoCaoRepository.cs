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


        public async Task<List<BaoCaoBaoGiaDTO>> BaoCaoBaoGia(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId)
        {
            var dataNguoiDung = await _context.Nguoidungs.Where(r => r.Id == nguoiDungId).FirstOrDefaultAsync();
            var result = new List<BaoCaoBaoGiaDTO>();
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
                            result.Add(new BaoCaoBaoGiaDTO
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
                            result.Add(new BaoCaoBaoGiaDTO
                            {
                                Name = group.First().TinhTrangBaoGia.Name,
                                Number = group.Count()
                            });
                        }

                    }

                }
            }
            else return new List<BaoCaoBaoGiaDTO>();
            return result;
        }

        public async Task<List<BaoCaoDonHangDTO>> BaoCaoDonHang(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId)
        {
            var dbNguoiDung = await _context.Nguoidungs.Where(r => r.Id == nguoiDungId).FirstOrDefaultAsync();
            var result = new List<BaoCaoDonHangDTO>();
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
                            result.Add(new BaoCaoDonHangDTO
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
                            result.Add(new BaoCaoDonHangDTO
                            {
                                Name = item.First().TinhTrangDonHang.Name,
                                Number = item.Count(),

                            });
                        }
                    }
                }
            }
            else return new List<BaoCaoDonHangDTO>();

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
