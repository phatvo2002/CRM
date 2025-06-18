using CRM.Attributes;
using CRM.DTO;
using CRM.Entities;
using CRM.Extensions;
using CRM.Modal;
using CRM.Services.DonHangs;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.DonHangs
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class DonHangController : ControllerBase
    {
        private readonly IDonHangServices _donHangServices;
        private readonly CrmDbContext _crmDbContext;
        public DonHangController(IDonHangServices donHangServices, CrmDbContext crmDbContext)
        {
            _donHangServices = donHangServices;
            _crmDbContext = crmDbContext;
        }
        [HttpGet("getalldonhang")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllDonHang()
        {
            try
            {
                var result = await _donHangServices.GetAll();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getdonhanglist")]
        [JwtAuthorize]
        public async Task<IActionResult> GetDonhangList(DateTime tuNgay, DateTime denNgay)
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                Guid phongBanid = HttpContext.GetPhongBanId();
                var db = _crmDbContext.Nguoidungs.FirstOrDefault(r => r.Id == nguoiDungId);
                if (db.CheckIsTruongPhong == true && db.CheckIsGiamDoc == false)
                {
                    List<DonHangDTO> result = await _donHangServices.GetDonHangByPhongBanId(phongBanid, tuNgay, denNgay);
                    return Ok(result);
                }
                else if (db.CheckIsTruongPhong == false && db.CheckIsGiamDoc == true)
                {
                    List<DonHangDTO> result = await _donHangServices.GetAllDonHang(tuNgay, denNgay);
                    return Ok(result);
                }
                else
                {
                    List<DonHangDTO> result = await _donHangServices.GetDonHangByNguoiDungId(nguoiDungId, tuNgay, denNgay);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getbykhachhang/{khachhangid}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetDonHangByKhachHang(string khachHangId)
        {
            try
            {
                var result = await _donHangServices.GetDonHangByKhachHangId(khachHangId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getdonhangbyid/{id}")]
        //[JwtAuthorize]
        public async Task<IActionResult> GetDonHangById(Guid Id)
        {
            try
            {
                var result = await _donHangServices.GetDonHangId(Id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getlichsumuahang/{khachHangId}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetLichSuDonHang(string khachHangId)
        {
            try
            {
                var result = await _donHangServices.GetLichSuMuaHang(khachHangId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("convertdonhang")]
        [JwtAuthorize]
        public async Task<IActionResult> ConvertDonhang(DonHangModal modal)
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                Guid phongBanid = HttpContext.GetPhongBanId();
                ResultModal result = await _donHangServices.ConvertDonHang(modal, nguoiDungId, phongBanid);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updatedonhang")]
        [JwtAuthorize]
        public async Task<IActionResult> UpdateDonHang(DonHangModal modal)
        {
            try
            {
                var result = await _donHangServices.Update(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("xacnhandonhang")]
        ////[JwtAuthorize]
        public async Task<IActionResult> XacNhanDonHang(XacNhanDonHangModal modal)
        {
            try
            {
                var result = await _donHangServices.XacNhanDonHang(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("capnhatthucthudonhang")]
        [JwtAuthorize]
        public async Task<IActionResult> CapNhatThucThuDonHang(Guid id, decimal soTien)
        {
            try
            {
                var result = await _donHangServices.CapNhatThucThuDonHang(id, soTien);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("deletedonhang")]
        [JwtAuthorize]
        public async Task<IActionResult> DeleteDonHang(Guid id)
        {
            try
            {
                var result = await _donHangServices.DeleteById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
