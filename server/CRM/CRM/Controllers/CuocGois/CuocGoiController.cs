using CRM.Attributes;
using CRM.DTO;
using CRM.Extensions;
using CRM.Modal;
using CRM.Services.CuocGois;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.CuocGois
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CuocGoiController : ControllerBase
    {
        private readonly ICuocGoiServices _cuocGoiServices;
        public CuocGoiController(ICuocGoiServices cuocGoiServices)
        {
            _cuocGoiServices = cuocGoiServices;
        }

        [HttpGet("getallcuocgoi")]
        [JwtAuthorize]
        public async Task<ActionResult> GetAllCuoGoi()
        {
            try
            {
                List<CuocGoiDTO> result = await _cuocGoiServices.GetAllCuocGoi();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getcuocgoibynguoidung")]
        [JwtAuthorize]
        public async Task<ActionResult> GetCuoGoiByNguoiDungId()
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                List<CuocGoiDTO> result = await _cuocGoiServices.GetCuocGoiByNguoiDungId(nguoiDungId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("getcuocgoibykhachhangtiemnangid/{id}")]
        [JwtAuthorize]
        public async Task<ActionResult> GetCuoGoiByKhachHangTiemNangId(Guid id)
        {
            try
            {
                List<CuocGoiDTO> result = await _cuocGoiServices.GetCuocGoiByKhachHangTiemNangId(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getcuocgoibykhachhangid/{id}")]
        [JwtAuthorize]
        public async Task<ActionResult> GetCuoGoiByKhachHangId(string id)
        {
            try
            {
                List<CuocGoiDTO> result = await _cuocGoiServices.GetCuocGoiByKhachHangId(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getcuocgoibyid/{id}")]
        [JwtAuthorize]
        public async Task<ActionResult> GetCuoGoiById(Guid id)
        {
            try
            {
                CuocGoiDTO result = await _cuocGoiServices.GetCuocGoiById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getcuocgoiDahoanthanh/{id}")]
        [JwtAuthorize]
        public async Task<ActionResult> GetCuoGoiDaHoanThanh(string id)
        {
            try
            {
                List<CuocGoiDTO> result = await _cuocGoiServices.GetCuocGoiIsThucHien(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getcuocgoiChuahoanthanh/{id}")]
        [JwtAuthorize]
        public async Task<ActionResult> GetCuoGoiChuaHoanThanh(string id)
        {
            try
            {
                List<CuocGoiDTO> result = await _cuocGoiServices.GetCuocGoiChuaThucHien(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("createcuocgoi")]
        [JwtAuthorize]
        public async Task<ActionResult> CreateCuocGoi(CuocGoiModal modal)
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                Guid phongBanId = HttpContext.GetPhongBanId();
                ResultModal ressult = await _cuocGoiServices.CreateCuocGoi(modal, nguoiDungId, phongBanId);
                return Ok(ressult);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("deletecuocgoi/{id}")]
        [JwtAuthorize]
        public async Task<ActionResult> DeleteCuocGoi(Guid id)
        {
            try
            {
                ResultModal result = await _cuocGoiServices.DeleteCuocGoi(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updatecuocgoi")]
        [JwtAuthorize]
        public async Task<ActionResult> UpdateCuocGoi(CuocGoiModal modal)
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                Guid phongBanId = HttpContext.GetPhongBanId();
                ResultModal result = await _cuocGoiServices.UpdateCuocGoi(modal, nguoiDungId, phongBanId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
