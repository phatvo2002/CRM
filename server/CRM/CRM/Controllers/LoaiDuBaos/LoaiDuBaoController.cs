using CRM.Attributes;
using CRM.Modal;
using CRM.Services.DonViTinhs;
using CRM.Services.LoaiDuBaos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.LoaiDuBaos
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class LoaiDuBaoController : ControllerBase
    {
        private readonly ILoaiDuBaoServices _loaiDuBaoServices;
        private readonly ILogger<LoaiDuBaoController> _logger;
        public LoaiDuBaoController(ILoaiDuBaoServices loaiDuBaoServices, ILogger<LoaiDuBaoController> logger)
        {
            _loaiDuBaoServices = loaiDuBaoServices;
            _logger = logger;
        }

        [HttpGet("getallloaidubao")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllLoaiDuBao()
        {
            try
            {
                var result = await _loaiDuBaoServices.GetAll();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getLoaiDuBaobyid/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetLoaiDuBaoById(int id)
        {
            try
            {
                var result = await _loaiDuBaoServices.GetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("creatloaidubao")]
        [JwtAuthorize]
        public async Task<IActionResult> CreateLoaiDuBao(ClassModal modal)
        {
            try
            {
                var result = await _loaiDuBaoServices.Create(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updateloaidubao")]
        [JwtAuthorize]
        public async Task<IActionResult> UpdateLoaiDuBao(ClassModal modal)
        {
            try
            {
                var result = await _loaiDuBaoServices.Update(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("deleteloaidubao/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> DeleteLoaiDuBao(int id)
        {
            try
            {
                var result = await _loaiDuBaoServices.DeleteById(id);
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
