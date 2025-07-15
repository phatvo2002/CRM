using CRM.Attributes;
using CRM.DTO;
using CRM.Extensions;
using CRM.Modal;
using CRM.Services.PhongBans;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.PhongBans
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PhongBanController : ControllerBase
    {
        private readonly IPhongBanServices _phongBanServices;
        private readonly ILogger<PhongBanController> _logger;
        public PhongBanController(IPhongBanServices phongBanServices, ILogger<PhongBanController> logger)
        {
            _phongBanServices = phongBanServices;
            _logger = logger;
        }

        [HttpGet("getAllphongban")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllPhongBan()
        {
            try
            {
                Guid chiNhanhId = HttpContext.GetChiNhanhId();
                List<PhongBanDTO> result = await _phongBanServices.GetAllPhongBan(chiNhanhId);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getphongbanbyid/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetPhongBanByid(Guid id)
        {
            try
            {
                PhongBanDTO result = await _phongBanServices.GetPhongBanById(id);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("insertphongban")]
        [JwtAuthorize]
        public async Task<IActionResult> InsertPhongBan(PhongBanModel model)
        {
            try
            {
                ResultModal result = await _phongBanServices.CreatePhongBan(model);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("delete")]
        [JwtAuthorize]
        public async Task<IActionResult> DeletePhongBan(Guid id)
        {
            try
            {
                ResultModal result = await _phongBanServices.DeletePhongBan(id);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("updatephongban/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> UpdatePhongban(PhongBanModel model, Guid id)
        {
            try
            {
                ResultModal result = await _phongBanServices.UpdatePhongBan(model, id);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }






    }
}
