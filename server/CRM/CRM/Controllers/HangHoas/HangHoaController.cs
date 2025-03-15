using CRM.Attributes;
using CRM.Modal;
using CRM.Services.HangHoas;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.HangHoas
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class HangHoaController : ControllerBase
    {
        private readonly IHangHoaServices _hangHoaServices;
        public HangHoaController(IHangHoaServices hangHoaServices)
        {
            _hangHoaServices = hangHoaServices;
        }

        [HttpGet("getallhanghoa")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllHangHoa()
        {
            try
            {
                var result = await _hangHoaServices.GetAll();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("gethanghoabyid/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetHangHoaById(string id)
        {
            try
            {
                var result = await _hangHoaServices.GetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("creathanghoa")]
        [JwtAuthorize]
        public async Task<IActionResult> CreateHangHoa([FromForm] HangHoaModal modal)
        {
            try
            {
                ResultModal result = await _hangHoaServices.CreateHangHoa(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updatehanghoa")]
        [JwtAuthorize]
        public async Task<IActionResult> UpdateHangHoa([FromForm] HangHoaModal modal)
        {
            try
            {
                var result = await _hangHoaServices.UpdateHangHoa(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("deletehanghoa/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> DeleteHangHoa(string id)
        {
            try
            {
                var result = await _hangHoaServices.DeleteById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
