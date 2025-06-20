using CRM.Attributes;
using CRM.DTO;
using CRM.Extensions;
using CRM.Modal;
using CRM.Services.LienHes;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.LienHes
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class LienHeController : ControllerBase
    {
        private readonly ILienHeServices _lienHeServices;
        private readonly ILogger<LienHeController> _logger;
        public LienHeController(ILienHeServices lienHeServices, ILogger<LienHeController> logger)
        {
            _lienHeServices = lienHeServices;
            _logger = logger;
        }

        [HttpGet("getalllienhe")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllLienHe()
        {
            try
            {
                var result = await _lienHeServices.GetAll();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getlienhebyid/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetLienheById(int id)
        {
            try
            {
                var result = await _lienHeServices.GetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getlienhebykhachhangtiemnangid/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetLienheByKhachHangTiemNangId(Guid id)
        {
            try
            {
                List<LienHeDTO> result = await _lienHeServices.GetLienHeByKhachHangTiemNangId(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getlienhebykhachhangmuctieuid/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetLienheByKhachHangMucTieuId(string id)
        {
            try
            {
                List<LienHeDTO> result = await _lienHeServices.GetLienHeByKhachHangMucTieuId(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("creatlienhe")]
        [JwtAuthorize]
        public async Task<IActionResult> CreateLienHe(LienHeModal modal)
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                Guid phongBanid = HttpContext.GetPhongBanId();
                var result = await _lienHeServices.CreateLienHe(modal, nguoiDungId, phongBanid);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updatelienhe")]
        [JwtAuthorize]
        public async Task<IActionResult> UpdateLienhe(LienHeModal modal)
        {
            try
            {
                var result = await _lienHeServices.Update(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("deletelienhe/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> DeleteLienHe(string id)
        {
            try
            {
                var result = await _lienHeServices.DeleteById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}
