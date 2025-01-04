using CRM.Attributes;
using CRM.DTO;
using CRM.Services.TinhTrangs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.TinhTrangs
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class TinhTrangController : ControllerBase
    {
        public readonly ITinhTrangServices _tinhTrangServices;

        public TinhTrangController(ITinhTrangServices tinhTrangServices)
        {
            _tinhTrangServices = tinhTrangServices;
        }

        [HttpGet("GetAllTinhTrang")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllTinhTrang()
        {
            try
            {
                List<TinhTrangDTO> result = await _tinhTrangServices.getAllTinhTrang();
                return Ok(result);
            }
            catch (ArgumentException e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
