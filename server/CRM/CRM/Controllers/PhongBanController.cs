using CRM.Attributes;
using CRM.DTO;
using CRM.Modal;
using CRM.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PhongBanController : ControllerBase
    {
        public readonly IPhongBanServices _phongBanServices;

        public PhongBanController(IPhongBanServices phongBanServices)
        { 
           _phongBanServices = phongBanServices;
        }

        [HttpGet("getAllphongban")]
        [JwtAuthorize]             
        public async Task<IActionResult> GetAllPhongBan()
        {
            try
            {
                List<PhongBanDTO> result = await _phongBanServices.GetAllPhongBan();
                return Ok(result);
            }catch (ArgumentException ex)
            {
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
            }catch (ArgumentException ex)
            {
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
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("updatephongban/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> UpdatePhongban(PhongBanModel model ,Guid id)
        {
            try
            {
                ResultModal result = await _phongBanServices.UpdatePhongBan(model ,id );
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }






    }
}
