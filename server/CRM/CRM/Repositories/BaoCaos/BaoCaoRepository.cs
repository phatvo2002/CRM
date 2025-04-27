using CRM.DTO.BaoCaoDTO;
using CRM.Entities;

namespace CRM.Repositories.BaoCaos
{
    public class BaoCaoRepository : IBaoCaoRepository
    {
        private readonly CrmDbContext _context;
        public BaoCaoRepository(CrmDbContext context)
        {
            _context = context;
        }
        public Task<BaoCaoDTO> GetBaoCaoTheoNguoiDung(DateTime tuNgay, DateTime denNgay, Guid nguoiDungId, Guid phongBanId)
        {
            var thoiGianTuNgayThangTruoc = tuNgay.AddMonths(-1);
            var thoiGianDenNgayThangTruoc = tuNgay.AddMonths(-1);

            BaoCaoDTO baoCaoDTO = new BaoCaoDTO();
            try
            {
                // kiểm tra nguoi dung là trưởng phòng hay nhân viên
                var nguoiDungData = _context.Nguoidungs.FirstOrDefault(r => r.Id == nguoiDungId);

                // Nếu là nhân viên thì sử dụng hàm này 
                if (nguoiDungData != null && nguoiDungData.CheckIsTruongPhong == false)
                {
                    // lấy danh sách khách hàng tiềm năng 
                    var dataKhachHangTiemNangHienTai = _context.KhachHangTiemNangs.Where(r => (tuNgay >= r.CreateAt && r.CreateAt <= denNgay) && r.NguoiDungId == nguoiDungId).ToList();
                    var dataKhachHangTiemNangThangTruoc = _context.KhachHangTiemNangs.
                        Where(r => (thoiGianTuNgayThangTruoc >= r.CreateAt && r.CreateAt <= thoiGianDenNgayThangTruoc) && r.NguoiDungId == nguoiDungId).ToList();
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


                }


            }
            catch (Exception ex)
            {
                return null;
            }
            throw new NotImplementedException();
        }
    }
}
