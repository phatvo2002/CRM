using CRM.Attributes;
using CRM.Modal;
using CRM.Services.LoaiHangHoas;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.LoaiHangHoas
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class LoaiHangHoaController : ControllerBase
    {
        private readonly ILoaiHangHoaServices _loaiHangHoaServices;
        public LoaiHangHoaController(ILoaiHangHoaServices loaiHangHoaServices)
        {
            _loaiHangHoaServices = loaiHangHoaServices;
        }
        [HttpGet("getallloaihanghoa")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllLoaiHangHoa()
        {
            try
            {
                var result = await _loaiHangHoaServices.GetAll();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getloaihanghoabyid/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetLoaiHangHoaById(Guid id)
        {
            try
            {
                var result = await _loaiHangHoaServices.GetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("creatloaihanghoa")]
        [JwtAuthorize]
        public async Task<IActionResult> CreateLoaiHangHoa(LoaiHangHoaModal modal)
        {
            try
            {
                var result = await _loaiHangHoaServices.Create(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updateloaihanghoa")]
        [JwtAuthorize]
        public async Task<IActionResult> UpdateLoaiHangHoa(LoaiHangHoaModal modal)
        {
            try
            {
                var result = await _loaiHangHoaServices.Update(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("deleteloaihanghoa/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> DeleteLoaiHangHoa(int id)
        {
            try
            {
                var result = await _loaiHangHoaServices.DeleteById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
