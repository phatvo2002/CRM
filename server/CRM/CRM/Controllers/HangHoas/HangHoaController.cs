using CRM.Attributes;
using CRM.DTO;
using CRM.Modal;
using CRM.Services.HangHoas;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.HangHoas
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class HangHoaController : ControllerBase
    {
        private readonly IHangHoaServices _hangHoaServices;
        private readonly ILogger<HangHoaController> _logger;
        public HangHoaController(IHangHoaServices hangHoaServices, ILogger<HangHoaController> logger)
        {
            _hangHoaServices = hangHoaServices;
            _logger = logger;
        }

        [HttpGet("getallhanghoa")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllHangHoa()
        {
            try
            {
                List<HangHoaDTO> result = await _hangHoaServices.GetAllHangHoa();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("gethanghoabyid/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetHangHoaById(string id)
        {
            try
            {
                var result = await _hangHoaServices.GetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("creathanghoa")]
        [JwtAuthorize]
        public async Task<IActionResult> CreateHangHoa([FromForm] HangHoaModal modal)
        {
            try
            {
                ResultModal result = await _hangHoaServices.CreateHangHoa(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updatehanghoa")]
        [JwtAuthorize]
        public async Task<IActionResult> UpdateHangHoa([FromForm] HangHoaModal modal)
        {
            try
            {
                var result = await _hangHoaServices.UpdateHangHoa(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("deletehanghoa/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> DeleteHangHoa(string id)
        {
            try
            {
                var result = await _hangHoaServices.DeleteById(id);
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
