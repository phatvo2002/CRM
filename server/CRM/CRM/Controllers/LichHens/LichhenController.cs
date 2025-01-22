using CRM.Attributes;
using CRM.DTO;
using CRM.Extensions;
using CRM.Modal;
using CRM.Services.LichHens;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.LichHens
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class LichhenController : ControllerBase
    {
        private readonly ILichHenServices _lichHenServices;
        public LichhenController(ILichHenServices lichHenServices)
        {
            _lichHenServices = lichHenServices;
        }

        [HttpGet("getalllichhen")]
        [JwtAuthorize]
        public async Task<ActionResult> GetAlllichhen()
        {
            try
            {
                List<LichHenDTO> result = await _lichHenServices.GetAllLichHen();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getlichhenbynguoidung")]
        [JwtAuthorize]
        public async Task<ActionResult> GetLichHenByNguoiDungId()
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                List<LichHenDTO> result = await _lichHenServices.GetLichHenByNguoiDungId(nguoiDungId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getlichhenbykhachhangtiemnangid/{id}")]
        [JwtAuthorize]
        public async Task<ActionResult> GetLichHenByKhachHangTiemNangId(Guid id)
        {
            try
            {
                List<LichHenDTO> result = await _lichHenServices.GetLichHenByKhachHangTiemNangId(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getlichhenbykhachhangid/{id}")]
        [JwtAuthorize]
        public async Task<ActionResult> GetLichHenByKhachHangId(string id)
        {
            try
            {
                List<LichHenDTO> result = await _lichHenServices.GetLichHenByKhachHangId(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getlichhenbyid/{id}")]
        [JwtAuthorize]
        public async Task<ActionResult> GetLichHenById(Guid id)
        {
            try
            {
                LichHenDTO result = await _lichHenServices.GetLichHenById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("createlichhen")]
        [JwtAuthorize]
        public async Task<ActionResult> CreateLichHen(LichHenModal modal)
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                Guid phongBanId = HttpContext.GetPhongBanId();
                ResultModal ressult = await _lichHenServices.CreateLichHen(modal, nguoiDungId, phongBanId);
                return Ok(ressult);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("deletelichhen/{id}")]
        [JwtAuthorize]
        public async Task<ActionResult> DeleteLichHen(Guid id)
        {
            try
            {
                ResultModal result = await _lichHenServices.DeleteLichHen(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updatelichhen")]
        [JwtAuthorize]
        public async Task<ActionResult> UpdateLichHen(LichHenModal modal)
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                Guid phongBanId = HttpContext.GetPhongBanId();
                ResultModal result = await _lichHenServices.UpdateLichHen(modal, nguoiDungId, phongBanId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
