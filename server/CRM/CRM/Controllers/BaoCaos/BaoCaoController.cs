using CRM.Attributes;
using CRM.Extensions;
using CRM.Services.BaoCaos;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.BaoCaos
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BaoCaoController : ControllerBase
    {
        private readonly IBaoCaoServices _baoCaoServices;
        public BaoCaoController(IBaoCaoServices baoCaoServices)
        {
            _baoCaoServices = baoCaoServices;
        }
        [HttpGet("getbaocaotongthe")]
        [JwtAuthorize]
        public async Task<IActionResult> GetBaoCaoTongThe(DateTime tuNgay, DateTime denNgay)
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                var result = await _baoCaoServices.GetBaoCaoTheoNguoiDung(tuNgay, denNgay, nguoiDungId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
