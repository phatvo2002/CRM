using CRM.Attributes;
using CRM.DTO;
using CRM.Entities.StoreProcedure;
using CRM.Modal;
using CRM.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ChucVuController : ControllerBase
    {
        private readonly IChucVuServices _chucVuServices;

        public ChucVuController(IChucVuServices chucVuServices)
        {
            _chucVuServices = chucVuServices;
        }

        [HttpPost("createChucVu")]
        [JwtAuthorize]
        public async Task<IActionResult> CreateChucVu(ChucVuModal modal)
        {
            try
            {
                ResultModal result = await _chucVuServices.CreateChucVu(modal);
                return Ok(result);
            }catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getAllChucVu")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllChucVu()
        {
            try
            {
                List<ChucVuDTO> result = await _chucVuServices.GetAllChucVu();
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("deleteChucVu")]
        [JwtAuthorize]    
         public async Task<IActionResult>  DeleteChucVu(Guid id)
        {
            try
            {
                ResultModal result = await _chucVuServices.DeleteChucVu(id);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getmenurolechucvubyid")]
        [JwtAuthorize]
        public async Task<IActionResult> GetMenuRoleById(Guid Id)
        {
            try
            {
                List<crm_getmenugroup_by_id> result = await _chucVuServices.GetMenuRoleById(Id);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("UpdateChucVu")]
        [JwtAuthorize]
        public async Task<IActionResult> UpdateChucVU(ChucVuModal modal ,Guid id)
        {
            try
            {
                ResultModal result  = await _chucVuServices.UpdateChucVu(modal, id);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
