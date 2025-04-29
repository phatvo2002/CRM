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
        public async Task<BaoCaoDTO> GetBaoCaoTheoNguoiDung(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId, Guid phongBanId)
        {
            var thoiGianTuNgayThangTruoc = tuNgay.AddMonths(-1);
            var thoiGianDenNgayThangTruoc = tuNgay.AddMonths(-1);

            BaoCaoDTO baoCaoDTO = new BaoCaoDTO();

            // kiểm tra nguoi dung là trưởng phòng hay nhân viên
            var nguoiDungData = await _context.Nguoidungs.FirstOrDefaultAsync(r => r.Id == nguoiDungId);
            try
            {
                if (nguoiDungData != null)
                {
                    switch (nguoiDungData.CheckIsTruongPhong)
                    {

                        case false:
                            {
                                // lấy danh sách khách hàng tiềm năng hiện tại
                                var dataKhachHangTiemNangHienTai = await _context.KhachHangTiemNangs.Where(r => (tuNgay >= r.CreateAt && r.CreateAt <= denNgay) && r.NguoiDungId == nguoiDungId).AsNoTracking().ToListAsync();
                                var dataKhachHangTiemNangThangTruoc = await _context.KhachHangTiemNangs.Where(r => (thoiGianTuNgayThangTruoc >= r.CreateAt && r.CreateAt <= thoiGianDenNgayThangTruoc) && r.NguoiDungId == nguoiDungId).AsNoTracking().ToListAsync();
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


                            }
                            break;
                        default:
                            baoCaoDTO = null;
                            break;
                    }
                }



            }
            catch (Exception ex)
            {
                return null;
            }
            throw new NotImplementedException();
        }

        private async Task<int> LayTongSoTheoNguoiDungAsync<T>(IQueryable<T> query, DateTime tuNgay, DateTime denNgay, Guid nguoiDungId) where T : class
        {

            var checkPermissionData = await _context.Nguoidungs.FirstOrDefaultAsync(r => r.Id == nguoiDungId);
            if (checkPermissionData != null)
            {
                if (checkPermissionData.CheckIsTruongPhong == false)
                {
                    var result = await query.Where(r => (tuNgay >= EF.Property<DateTime>(r, "CreateAt")
                                                         && EF.Property<DateTime>(r, "CreateAt") <= denNgay)
                                                         && EF.Property<Guid>(r, "nguoiDungId") == nguoiDungId).AsNoTracking().ToListAsync();
                    if (result.Count() > 0)
                        return result.Count();
                    else return 0;
                }
                else
                {
                    var result = await query.Where(r => (tuNgay >= EF.Property<DateTime>(r, "CreateAt")
                                                          && EF.Property<DateTime>(r, "CreateAt") <= denNgay)
                                                          && EF.Property<Guid>(r, "phongBanId") == checkPermissionData.MaPhongBan).AsNoTracking().ToListAsync();

                    if (result.Count() > 0)
                        return result.Count();
                    else return 0;
                }
            }
            else return 0;


        }
        private async Task<Double> LayTongDoanhThu<T>(IQueryable<T> query, DateTime tuNgay, DateTime denNgay, Guid nguoiDungId) where T : class
        {
            var checkPermissionData = await _context.Nguoidungs.FirstOrDefaultAsync(r => r.Id == nguoiDungId);
        }

    }
}
