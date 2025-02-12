using CRM.Attributes;
using CRM.Extensions;
using CRM.Modal;
using CRM.Services.BaoGias;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.BaoGias
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BaoGiaController : ControllerBase
    {
        private readonly IBaoGiaServices _baoGiaServices;

        public BaoGiaController(IBaoGiaServices baoGiaServices)
        {
            _baoGiaServices = baoGiaServices;
        }
        [HttpPost("covertbaogia")]
        [JwtAuthorize]
        public async Task<IActionResult> ConvertBaoGia(BaoGiaModal baoGiaModal)
        {
            try
            {
                Guid userId = HttpContext.GetUserId();
                Guid phongBanId = HttpContext.GetPhongBanId();
                ResultModal result = await _baoGiaServices.ConvertBaoGia(baoGiaModal, userId, phongBanId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
