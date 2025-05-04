using CRM.Attributes;
using CRM.Modal;
using CRM.Services.KhaoSats;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.KhaoSats
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class KhaoSatController : ControllerBase
    {
        private readonly IKhaoSatServices _khaoSatServices;

        public KhaoSatController(IKhaoSatServices khaoSatServices)
        {
            _khaoSatServices = khaoSatServices;
        }

        [HttpGet("getall")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var result = await _khaoSatServices.GetAll();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getbyid/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetById(Guid id)
        {
            try
            {
                var result = await _khaoSatServices.GetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("create")]
        public async Task<IActionResult> Create(KhaoSatModal modal)
        {
            try
            {
                var result = await _khaoSatServices.Create(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("update")]
        [JwtAuthorize]
        public async Task<IActionResult> Update(KhaoSatModal modal)
        {
            try
            {
                var result = await _khaoSatServices.Update(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("delete/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                var result = await _khaoSatServices.DeleteById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
