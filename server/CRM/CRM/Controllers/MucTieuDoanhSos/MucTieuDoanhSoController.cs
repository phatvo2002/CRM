using CRM.Modal;
using CRM.Services.MucTieuDoanhSos;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.MucTieuDoanhSos
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class MucTieuDoanhSoController : ControllerBase
    {
        private readonly IMucTieuDoanhSoServices _mucTieuDoanhSoservices;
        public MucTieuDoanhSoController(IMucTieuDoanhSoServices mucTieuDoanhSoServices)
        {
            _mucTieuDoanhSoservices = mucTieuDoanhSoServices;
        }

        [HttpPost("createmuctieudoanhso")]
        public async Task<IActionResult> CreateMucTieuDoanhSo(MucTieuDoanhSoModal modal)
        {
            try
            {
                ResultModal result = await _mucTieuDoanhSoservices.CreateMucTieuDoanhSo(modal);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
