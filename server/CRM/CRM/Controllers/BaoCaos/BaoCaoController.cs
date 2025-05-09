using CRM.Attributes;
using CRM.Extensions;
using CRM.Services.BaoCaos;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.BaoCaos
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BaoCaoController : ControllerBase
    {
        private readonly IBaoCaoServices _baoCaoServices;
        public BaoCaoController(IBaoCaoServices baoCaoServices)
        {
            _baoCaoServices = baoCaoServices;
        }
        [HttpGet("getbaocaotongthe")]
        [JwtAuthorize]
        public async Task<IActionResult> GetBaoCaoTongThe(DateTime tuNgay, DateTime denNgay)
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                var result = await _baoCaoServices.GetBaoCaoTheoNguoiDung(tuNgay, denNgay, nguoiDungId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getbaocaotongthehoatdong")]
        [JwtAuthorize]
        public async Task<IActionResult> GetBaoCaoTongTheHoatDong(DateTime tuNgay, DateTime denNgay)
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                var result = await _baoCaoServices.GetBaoCaoHoatDong(tuNgay, denNgay, nguoiDungId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getbaocaotheocohoi")]
        [JwtAuthorize]
        public async Task<IActionResult> GetBaoCaoTheoCoHoi(DateTime tuNgay, DateTime denNgay)
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                var result = await _baoCaoServices.BaoCaoTheoCoHoi(tuNgay, denNgay, nguoiDungId);
                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getbaocaobaogia")]
        [JwtAuthorize]
        public async Task<IActionResult> GetBaoCaoBaoGia(DateTime tuNgay, DateTime denNgay)
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                var result = await _baoCaoServices.BaoCaoBaoGia(tuNgay, denNgay, nguoiDungId);
                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getbaocaodonhang")]
        [JwtAuthorize]
        public async Task<IActionResult> GetBaoCaoBaoDonHang(DateTime tuNgay, DateTime denNgay)
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                var result = await _baoCaoServices.BaoCaoDonHang(tuNgay, denNgay, nguoiDungId);
                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("gettop5khachhangtuongtacganday")]
        [JwtAuthorize]
        public async Task<IActionResult> GetTop5KhachHangTuongTac(DateTime tuNgay, DateTime denNgay)
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                var result = await _baoCaoServices.BaoCaoTop5KhachHangTuongTac(tuNgay, denNgay, nguoiDungId);
                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getbaocaocuocgoitheotrangthai")]
        [JwtAuthorize]
        public async Task<IActionResult> GetCuocGoiTheoTrangThai(DateTime tuNgay, DateTime denNgay)
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                var result = await _baoCaoServices.BaoCaoCuocGoiTheoTrangThai(tuNgay, denNgay, nguoiDungId);
                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getbaocaodoanhthu")]
        [JwtAuthorize]
        public async Task<IActionResult> GetBaoCaoDoanhThu(DateTime tuNgay, DateTime denNgay)
        {
            try
            {
                var result = await _baoCaoServices.BaoCaoDoanhThu(tuNgay, denNgay);
                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getbaocaodoanhthutheonam")]
        [JwtAuthorize]
        public async Task<IActionResult> GetBaoCaoDoanhThuTheoNam(int nam)
        {
            try
            {
                var result = await _baoCaoServices.BaoCaoDoanhThuTheonam(nam);
                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getbaocaodoanhthutheophongban")]
        [JwtAuthorize]
        public async Task<IActionResult> GetBaoCaoDoanhThuTheoPhongBan(DateTime tuNgay, DateTime denNgay)
        {
            try
            {
                var result = await _baoCaoServices.BaoCaoDoanhThuTheoPhongBan(tuNgay, denNgay);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getbaocaososanhmuctieudoanhso")]
        [JwtAuthorize]
        public async Task<IActionResult> GetBaoCaoSoSanhMucTieuDoanhSo(DateTime tuNgay, DateTime denNgay, int nam)
        {
            try
            {
                var result = await _baoCaoServices.BaoCaoSoSanhMucTieuDoanhSo(tuNgay, denNgay, nam);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getbaocaonguongockhachhang")]
        [JwtAuthorize]
        public async Task<IActionResult> GetBaoCaoNguonGocKhachHang(DateTime tuNgay, DateTime denNgay)
        {
            try
            {
                var result = await _baoCaoServices.BaoCaoNguonGocKhachHang(tuNgay, denNgay);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getbaocaotop5nhanviensuatsacnhat")]
        [JwtAuthorize]
        public async Task<IActionResult> GetBaoCaoTop5NhanVienSuatSacNhat(DateTime tuNgay, DateTime denNgay, int type)
        {
            try
            {
                var result = await _baoCaoServices.BaoCaoTop5NhanVienSuatSacNhat(tuNgay, denNgay, type);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getbaocaotop5nhanviencodoanhthucaonhat")]
        [JwtAuthorize]
        public async Task<IActionResult> GetBaoCaoTop5NhanVienCoDoanhThuCaoNhat(DateTime tuNgay, DateTime denNgay)
        {
            try
            {
                Guid userId = HttpContext.GetUserId();
                var result = await _baoCaoServices.BaoCaoTop5NhanVienCoDoanhThuCaoNhat(tuNgay, denNgay, userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getbaocaososanhdoanhthunhanvien")]
        [JwtAuthorize]
        public async Task<IActionResult> GetBaoCaoSoSanhDoanhThuNhanVien(DateTime tuNgay, DateTime denNgay)
        {
            try
            {
                Guid phongBanId = HttpContext.GetPhongBanId();
                var result = await _baoCaoServices.BaoCaoSoSanhDoanhThuNhanVien(tuNgay, denNgay, phongBanId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getbaocaonhiemvu")]
        [JwtAuthorize]
        public async Task<IActionResult> GetBaoCaoNhieVu(DateTime tuNgay, DateTime denNgay)
        {
            try
            {
                Guid phongBanId = HttpContext.GetPhongBanId();
                var result = await _baoCaoServices.BaoCaoNhiemVu(tuNgay, denNgay, phongBanId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getbaocaotop3nhanvienhoanthanhnhiemvu")]
        [JwtAuthorize]
        public async Task<IActionResult> GetBaoCaoTop3NhanVienHoanThanhNhiemVu(DateTime tuNgay, DateTime denNgay)
        {
            try
            {
                Guid phongBanId = HttpContext.GetPhongBanId();
                var result = await _baoCaoServices.BaoCaoTop3NhanVienHoanThanhNhiemVu(tuNgay, denNgay, phongBanId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getbaocaonhiemvutheotrangthai")]
        [JwtAuthorize]
        public async Task<IActionResult> GetBaoCaoNhiemVuTheoTrangThai(DateTime tuNgay, DateTime denNgay)
        {
            try
            {
                Guid phongBanId = HttpContext.GetPhongBanId();
                var result = await _baoCaoServices.BaoCaoNhiemVuTheoTrangThai(tuNgay, denNgay, phongBanId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getbaocaokhaosat")]
        [JwtAuthorize]
        public async Task<IActionResult> GetBaoCaoKhaoSat(DateTime tuNgay, DateTime denNgay)
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                var result = await _baoCaoServices.BaoCaoKhaoSat(tuNgay, denNgay, nguoiDungId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
