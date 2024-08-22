using CRM.Attributes;
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
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
