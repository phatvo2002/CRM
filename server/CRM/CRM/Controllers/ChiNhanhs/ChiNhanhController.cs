using CRM.Attributes;
using CRM.Modal;
using CRM.Services.ChiNhanhs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.ChiNhanhs
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ChiNhanhController : ControllerBase
    {
        private readonly IChiNhanhServices _chiNhanhServices;
        private readonly ILogger<ChiNhanhController> _logger;   

        public ChiNhanhController(IChiNhanhServices chiNhanhServices, ILogger<ChiNhanhController> logger)
        {
            _chiNhanhServices = chiNhanhServices;
            _logger = logger;
        }


        [HttpGet("getall")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var result = await _chiNhanhServices.GetAll();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getbyid/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAll(Guid id)
        {
            try
            {
                var result = await _chiNhanhServices.GetById(id);
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
        public async Task<IActionResult> Create(ChiNhanhModal modal)
        {
            try
            {
                var result =await _chiNhanhServices.Create(modal);
                return Ok(result);
            }
            catch (Exception ex) {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update")]
        [JwtAuthorize]
        public async Task<IActionResult> Update(ChiNhanhModal modal)
        {
            try
            {
                var result = await _chiNhanhServices.Update(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("detete/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                var result = await _chiNhanhServices.DeleteById(id);
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
