using CRM.Attributes;
using CRM.DTO;
using CRM.Entities;
using CRM.Extensions;
using CRM.Modal;
using CRM.Services.KhachHangMucTieus;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRM.Controllers.KhachHangMucTieus
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class KhachHangMucTieuController : ControllerBase
    {
        private readonly IKhacHangMucTieuServices _khacHangMucTieuServices;
        private readonly CrmDbContext _context;
        public KhachHangMucTieuController(IKhacHangMucTieuServices khacHangMucTieuServices , CrmDbContext context)
        {
            _khacHangMucTieuServices = khacHangMucTieuServices;
            _context = context;
        }

        [HttpGet("getallkhachhangmuctieu")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllKhachHangMucTieu()
        {
            try
            {
                var result = await _khacHangMucTieuServices.GetAll();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getkhachhangmuctieubyid")]
        [JwtAuthorize]
        public async Task<IActionResult> GetKhachHangMucTieuById(string id)
        {
            try
            {
                var result = await _khacHangMucTieuServices.GetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getkhachhangmuctieubynguoidungid")]
        [JwtAuthorize]
        public async Task<IActionResult> GetKhachHangMucTieuByNguoiDungId()
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                Guid phongBanId = HttpContext.GetPhongBanId();
                var db = await _context.Nguoidungs.Where(r=> r.Id == nguoiDungId && r.MaPhongBan == phongBanId).FirstOrDefaultAsync();
                if(db?.CheckIsTruongPhong == true)
                {
                    List<KhachHangMucTieuDTO> result = await _khacHangMucTieuServices.GetKhachHangMucTieuByPhongBanId(phongBanId);
                    return Ok(result);
                }    
                else
                {
                   List<KhachHangMucTieuDTO> result = await _khacHangMucTieuServices.GetKhachHangMucTieuByNguoiDungId(nguoiDungId);
                    return Ok(result);
                }    
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //[HttpGet("getkhachhangmuctieubyphongbanid")]
        //[JwtAuthorize]
        //public async Task<IActionResult> GetKhachHangMucTieuByPhongBanId()
        //{
        //    try
        //    {
        //        Guid phongBanId = HttpContext.GetPhongBanId();
        //        List<KhachHangMucTieuDTO> result = await _khacHangMucTieuServices.GetKhachHangMucTieuByPhongBanId(phongBanId);
        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
        [HttpPost("convertkhachhangmuctieu")]
        [JwtAuthorize]
        public async Task<IActionResult> ConvertKhachHangMucTieu(ConvertKhachHangModal modal)
        {
            try
            {
                Guid phongBanId = HttpContext.GetPhongBanId();
                Guid nguoiDungId = HttpContext.GetUserId();
                ResultModal result = await _khacHangMucTieuServices.ConvertKhachHangMucTieu(modal, nguoiDungId, phongBanId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("createkhachhangmuctieu")]
        [JwtAuthorize]
        public async Task<IActionResult> CreateKhachHangMucTieu(KhachHangMucTieuModal modal)
        {
            try
            {
                Guid phongBanId = HttpContext.GetPhongBanId();
                Guid nguoiDungId = HttpContext.GetUserId();
                ResultModal result = await _khacHangMucTieuServices.CreateKhachHangMucTieu(modal, nguoiDungId, phongBanId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updatekhachhangmuctieu")]
        [JwtAuthorize]
        public async Task<IActionResult> CupdateKhachHangMucTieu(KhachHangMucTieuModal modal)
        {
            try
            {
                Guid phongBanId = HttpContext.GetPhongBanId();
                Guid nguoiDungId = HttpContext.GetUserId();
                ResultModal result = await _khacHangMucTieuServices.UpdateKhachHangMucTieu(modal, nguoiDungId, phongBanId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("deletekhachhangmuctieu")]
        [JwtAuthorize]
        public async Task<IActionResult> DeleteKhachHangMucTieu(string id)
        {
            try
            {
                var result = await _khacHangMucTieuServices.DeleteById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
