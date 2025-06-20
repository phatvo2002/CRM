using CRM.Attributes;
using CRM.Extensions;
using CRM.Modal;
using CRM.Services.KPINhanViens;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class KPINhanVienController : ControllerBase
    {
        private readonly IKPIServices _kPINhanVienServices;
        private readonly ILogger<KPINhanVienController> _logger;
        public KPINhanVienController(IKPIServices kPINhanVienServices, ILogger<KPINhanVienController> logger)
        {
            _kPINhanVienServices = kPINhanVienServices;
            _logger = logger;
        }
        [HttpGet("getall")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllKPI()
        {
            try
            {
                var result = await _kPINhanVienServices.GetAll();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getbyid")]
        [JwtAuthorize]
        public async Task<IActionResult> GeKPIById(Guid id)
        {
            try
            {
                var result = await _kPINhanVienServices.GetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("create")]
        [JwtAuthorize]
        public async Task<IActionResult> CreateKPI(KPINhanVienModal modal)
        {
            try
            {
                Guid phongBanId = HttpContext.GetPhongBanId();
                var result = await _kPINhanVienServices.CreateKPINhanVien(modal, phongBanId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex);
            }
        }
        [HttpPut("update")]
        [JwtAuthorize]
        public async Task<IActionResult> UpdateKPI(KPINhanVienModal modal)
        {
            try
            {
                var result = await _kPINhanVienServices.UpdateKPINhanVien(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("delete")]
        [JwtAuthorize]
        public async Task<IActionResult> DeteteKPI(Guid Id)
        {
            try
            {
                var result = await _kPINhanVienServices.DeleteById(Id);
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
