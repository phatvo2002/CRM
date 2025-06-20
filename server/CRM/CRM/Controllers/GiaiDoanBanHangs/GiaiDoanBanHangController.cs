using CRM.Attributes;
using CRM.DTO;
using CRM.Modal;
using CRM.Repositories.GiaiDoans;
using CRM.Services.LoaiDuBaos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.GiaiDoanBanHangs
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class GiaiDoanBanHangController : ControllerBase
    {
        private readonly IGiaiDoanBanhangRepository _giaiDoanBanHangservices;
        private readonly ILogger<GiaiDoanBanHangController> _logger;
        public GiaiDoanBanHangController(IGiaiDoanBanhangRepository giaiDoanBanHangServices, ILogger<GiaiDoanBanHangController> logger)
        {
            _giaiDoanBanHangservices = giaiDoanBanHangServices;
            _logger = logger;
        }

        [HttpGet("getallGiaiDoanBanHang")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllGiaiDoanBanhang()
        {
            try
            {
                List<GiaiDoanBanHangDTO> result = await _giaiDoanBanHangservices.GetAllGiaiDoanBanhang();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getgiaidoanbanhangbyid/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetGiaiDoanBanHangById(Guid id)
        {
            try
            {
                var result = await _giaiDoanBanHangservices.GetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("creategiaidoanbanhang")]
        [JwtAuthorize]
        public async Task<IActionResult> CreateGiaiDoanBanHang(GIaiDoanBanhangModal modal)
        {
            try
            {
                var result = await _giaiDoanBanHangservices.Create(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updategiaidoanbanhang")]
        [JwtAuthorize]
        public async Task<IActionResult> UpdateGiaiDoanBanhang(GIaiDoanBanhangModal modal)
        {
            try
            {
                var result = await _giaiDoanBanHangservices.Update(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("deletegiaidoanbanhang/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> DeleteGiaiDoanBanHang(Guid id)
        {
            try
            {
                var result = await _giaiDoanBanHangservices.DeleteById(id);
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
