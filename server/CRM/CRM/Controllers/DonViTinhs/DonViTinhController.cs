using CRM.Attributes;
using CRM.Modal;
using CRM.Services.DonViTinhs;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.DonViTinhs
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class DonViTinhController : ControllerBase
    {
        private readonly IDonViTinhServices _donViTinhServices;
        private readonly ILogger<DonViTinhController> _logger;
        public DonViTinhController(IDonViTinhServices donViTinhServices, ILogger<DonViTinhController> logger)
        {
            _donViTinhServices = donViTinhServices;
            _logger = logger;
        }

        [HttpGet("getalldonvitinh")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllDonViTinh()
        {
            try
            {
                var result = await _donViTinhServices.GetAll();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getdonvitinhbyid/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetDonViTinhById(int id)
        {
            try
            {
                var result = await _donViTinhServices.GetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("creatdonvitinh")]
        [JwtAuthorize]
        public async Task<IActionResult> CreateDonViTinh(DonViTinhModal modal)
        {
            try
            {
                var result = await _donViTinhServices.Create(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updatedonvitinh")]
        [JwtAuthorize]
        public async Task<IActionResult> UpdateDonViTinh(DonViTinhModal modal)
        {
            try
            {
                var result = await _donViTinhServices.Update(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("deletedonvitinh/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> DeleteDonViTinh(int id)
        {
            try
            {
                var result = await _donViTinhServices.DeleteById(id);
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
