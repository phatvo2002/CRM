using CRM.Attributes;
using CRM.DTO;
using CRM.Extensions;
using CRM.Modal;
using CRM.Services.NhiemVus;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.NhiemVus
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class NhiemVuController : ControllerBase
    {
        private readonly INhiemVuServices _nhiemVuServices;
        public NhiemVuController(INhiemVuServices nhiemVuServices)
        {
            _nhiemVuServices = nhiemVuServices;
        }

        [HttpGet("getallnhiemvu")]
        [JwtAuthorize]
        public async Task<ActionResult> GetAllNhiemVu()
        {
            try
            {
                List<NhiemVuDTO> result = await _nhiemVuServices.GetAllNhiemVu();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getnhiemvubynguoidung")]
        [JwtAuthorize]
        public async Task<ActionResult> GetNhiemVuByNguoiDungId()
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                List<NhiemVuDTO> result = await _nhiemVuServices.GetNhiemVuByNguoiDungId(nguoiDungId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getnhiemvubykhachhangtiemnangid/{id}")]
        [JwtAuthorize]
        public async Task<ActionResult> GetNhiemVuByKhachHangTiemNangId(Guid id)
        {
            try
            {
                List<NhiemVuDTO> result = await _nhiemVuServices.GetNhiemVuByKhachHangTiemNangId(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getnhiemvuid/{id}")]
        [JwtAuthorize]
        public async Task<ActionResult> GetNhiemVuById(Guid id)
        {
            try
            {
                NhiemVuDTO result = await _nhiemVuServices.GetNhiemVuById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("createnhiemvu")]
        [JwtAuthorize]
        public async Task<ActionResult> CreateNhiemVu(NhiemVuModal modal)
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                Guid phongBanId = HttpContext.GetPhongBanId();
                ResultModal ressult = await _nhiemVuServices.CreateNhiemVu(modal, nguoiDungId, phongBanId);
                return Ok(ressult);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("deletenhiemvu/{id}")]
        [JwtAuthorize]
        public async Task<ActionResult> DeleteNhiemVu(Guid id)
        {
            try
            {
                ResultModal result = await _nhiemVuServices.DeleteNhiemVu(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updatenhiemvu")]
        [JwtAuthorize]
        public async Task<ActionResult> UpdateNhiemVu(NhiemVuModal modal)
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                Guid phongBanId = HttpContext.GetPhongBanId();
                ResultModal result = await _nhiemVuServices.UpdateNhiemVu(modal, nguoiDungId, phongBanId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
