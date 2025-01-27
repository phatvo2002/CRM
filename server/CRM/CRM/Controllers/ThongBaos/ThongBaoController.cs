using CRM.Attributes;
using CRM.DTO;
using CRM.Extensions;
using CRM.Modal;
using CRM.Services.ThongBaos;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.ThongBaos
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ThongBaoController : ControllerBase
    {
        private readonly IThongBaoServices _thongBaoServices;
        public ThongBaoController(IThongBaoServices thongBaoServices)
        {
            _thongBaoServices = thongBaoServices;
        }

        [HttpGet("getallthongbao")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllThongBao()
        {
            try
            {
                var result = await _thongBaoServices.GetAll();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getthongbaobynguoidungid")]
        [JwtAuthorize]
        public async Task<IActionResult> GetThongBaoByNguoiDungId()
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                List<ThongBaoDTO> result = await _thongBaoServices.GetThongBaoByNguoiDungId(nguoiDungId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getthongbaonotreadbynguoidungid")]
        [JwtAuthorize]
        public async Task<IActionResult> GetThongBaoNotReadByNguoiDungId()
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                List<ThongBaoDTO> result = await _thongBaoServices.GetThongBaoByNguoiDungIdNotRead(nguoiDungId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getthongbaobyid/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetThongBaoById(int id)
        {
            try
            {
                var result = await _thongBaoServices.GetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("createthongbao")]
        [JwtAuthorize]
        public async Task<IActionResult> CreateThongBao(ThongBaoModal modal)
        {
            try
            {
                var result = await _thongBaoServices.Create(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("checkthongbao")]
        [JwtAuthorize]
        public async Task<IActionResult> CheckThongBao()
        {
            try
            {
                ResultModal result = await _thongBaoServices.CheckThongBao();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updatethongbao")]
        [JwtAuthorize]
        public async Task<IActionResult> UpdateThongBao(ThongBaoModal modal)
        {
            try
            {
                var result = await _thongBaoServices.Update(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("checkdocthongbao/{id}")]
        [JwtAuthorize]
        public async Task CheckDocThongBao(Guid id)
        {
            await _thongBaoServices.CheckDocThongBao(id);
        }
        [HttpDelete("deletethongbao/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> DeleteThongBao(Guid id)
        {
            try
            {
                var result = await _thongBaoServices.DeleteById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
