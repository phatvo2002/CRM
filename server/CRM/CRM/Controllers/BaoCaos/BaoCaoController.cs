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

    }
}
