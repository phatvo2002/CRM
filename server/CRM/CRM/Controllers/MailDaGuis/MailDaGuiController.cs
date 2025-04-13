using CRM.Attributes;
using CRM.Modal;
using CRM.Services.MailDaGuis;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.MailDaGuis
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class MailDaGuiController : ControllerBase
    {
        private readonly IMailDaGuiServices _mailDaGuiServices;

        public MailDaGuiController(IMailDaGuiServices mailDaGuiServices)
        {
            _mailDaGuiServices = mailDaGuiServices;
        }

        [HttpGet("getall")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var result = await _mailDaGuiServices.GetAll();
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
                var result = await _mailDaGuiServices.GetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getallbytiemnangid/{tiemNangId}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetByTiemNangId(Guid tiemNangId)
        {
            try
            {
                var result = await _mailDaGuiServices.GetByTiemNangid(tiemNangId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("create")]
        [JwtAuthorize]
        public async Task<IActionResult> Create(MailDaGuiModal modal)
        {
            try
            {
                var result = await _mailDaGuiServices.Create(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("update")]
        [JwtAuthorize]
        public async Task<IActionResult> Update(MailDaGuiModal modal)
        {
            try
            {
                var result = await _mailDaGuiServices.Update(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("delete/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                var result = await _mailDaGuiServices.Delete(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
