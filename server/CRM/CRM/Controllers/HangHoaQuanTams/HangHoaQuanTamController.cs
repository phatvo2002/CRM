using CRM.Attributes;
using CRM.DTO;
using CRM.Modal;
using CRM.Services.HangHoaQuanTams;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.HangHoaQuanTams
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class HangHoaQuanTamController : ControllerBase
    {
        private readonly IHangHoaQuanTamServices _hangHoaQuanTamServices;

        public HangHoaQuanTamController(IHangHoaQuanTamServices hangHoaQuanTamServices)
        {
            _hangHoaQuanTamServices = hangHoaQuanTamServices;
        }

        [HttpGet("getallhanghoaquantam")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllHangHoaQuanTam()
        {
            try
            {
                var result = await _hangHoaQuanTamServices.GetAll();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("gethanghoaquantambyid/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetHangHoaQuanTamById(int id)
        {
            try
            {
                var result = await _hangHoaQuanTamServices.GetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("gethanghoaquantambykhachhangtiemnangid/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetHangHoaQuanTamByKhachHangTiemNangId(Guid id)
        {
            try
            {
                List<HangHoaQuanTamDTO> result = await _hangHoaQuanTamServices.GetHangHoaQuanTamByKhachHangTiemNangId(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("gethanghoaquantambykhachhangid/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetHangHoaQuanTamByKhachHangId(string id)
        {
            try
            {
                List<HangHoaQuanTamDTO> result = await _hangHoaQuanTamServices.GetHangHoaQuanTamByKhachHangId(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("gethanghoaquantambycohoiid/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetHangHoaQuanTamByCoHoiId(string id)
        {
            try
            {
                List<HangHoaQuanTamDTO> result = await _hangHoaQuanTamServices.GetHangHoaQuanTamByCoHoiId(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("gethanghoaquantambybaogiaid/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetHangHoaQuanTamByBaoGiaId(Guid id)
        {
            try
            {
                List<HangHoaQuanTamDTO> result = await _hangHoaQuanTamServices.GetHangHoaQuanTamByBaoGiaId(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("creathanghoaquantam")]
        [JwtAuthorize]
        public async Task<IActionResult> CreateHangHoaQuanTam(HangHoaQuanTamModal modal)
        {
            try
            {
                var result = await _hangHoaQuanTamServices.Create(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updatehanghoaquantam")]
        [JwtAuthorize]
        public async Task<IActionResult> UpdateHangHoaQuanTam(HangHoaQuanTamModal modal)
        {
            try
            {
                var result = await _hangHoaQuanTamServices.Update(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updatehanghoaquantamlist")]
        [JwtAuthorize]
        public async Task<IActionResult> UpdateHangHoaQuanTamList(List<HangHoaQuanTamModal> modal)
        {
            try
            {
                ResultModal result = await _hangHoaQuanTamServices.UpdateHangHoaQuanTam(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("deletehanghoaquantam/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> DeleteHangHoaQuanTam(Guid id)
        {
            try
            {
                var result = await _hangHoaQuanTamServices.DeleteById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
