using CRM.Attributes;
using CRM.Extensions;
using CRM.Modal;
using CRM.Services.CoHois;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.CoHois
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CoHoiController : ControllerBase
    {
        private readonly ICoHoiServices _coHoiServices;

        public CoHoiController(ICoHoiServices coHoiServices)
        {
            _coHoiServices = coHoiServices;
        }

        [HttpPost("convertcohoi")]
        [JwtAuthorize]
        public async Task<IActionResult> ConvertCoHoi(CoHoiModal modal)
        {
            try
            {
                Guid userId = HttpContext.GetUserId();
                Guid phongBanId = HttpContext.GetPhongBanId();
                ResultModal result = await _coHoiServices.ConvertCoHoi(modal, userId, phongBanId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
