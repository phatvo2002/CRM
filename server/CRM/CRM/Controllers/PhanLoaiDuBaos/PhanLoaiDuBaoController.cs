using CRM.Attributes;
using CRM.Modal;
using CRM.Services.PhanLoaiDuBaos;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.PhanLoaiDuBaos
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PhanLoaiDuBaoController : ControllerBase
    {
        private readonly IPhanLoaiDuBaoServices _phanloaiDuBaoServices;
        private readonly ILogger<PhanLoaiDuBaoController> _logger;
        public PhanLoaiDuBaoController(IPhanLoaiDuBaoServices phanloaiDuBaoServices, ILogger<PhanLoaiDuBaoController> logger)
        {
            _phanloaiDuBaoServices = phanloaiDuBaoServices;
            _logger = logger;
        }

        [HttpGet("getallphanloaioaidubao")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllPhanLoaiDuBao()
        {
            try
            {
                var result = await _phanloaiDuBaoServices.GetAll();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getphanloaidubaobyid/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetPhanLoaiDuBaoById(int id)
        {
            try
            {
                var result = await _phanloaiDuBaoServices.GetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("creatphanloaidubao")]
        [JwtAuthorize]
        public async Task<IActionResult> CreateLoaiDuBao(ClassModal modal)
        {
            try
            {
                var result = await _phanloaiDuBaoServices.Create(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updatephanloaidubao")]
        [JwtAuthorize]
        public async Task<IActionResult> UpdatephanLoaiDuBao(ClassModal modal)
        {
            try
            {
                var result = await _phanloaiDuBaoServices.Update(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("deletephanloaidubao/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> DeletePhanLoaiDuBao(int id)
        {
            try
            {
                var result = await _phanloaiDuBaoServices.DeleteById(id);
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
