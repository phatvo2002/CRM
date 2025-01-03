using CRM.Attributes;
using CRM.DTO;
using CRM.Modal;
using CRM.Services.LienHes;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.LienHes
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class LienHeController : ControllerBase
    {
        private readonly ILienHeServices _lienHeServices;
        public LienHeController(ILienHeServices lienHeServices)
        {
            _lienHeServices = lienHeServices;
        }

        [HttpGet("getalllienhe")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllLienHe()
        {
            try
            {
                var result = await _lienHeServices.GetAll();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getlienhebyid/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetLienheById(int id)
        {
            try
            {
                var result = await _lienHeServices.GetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getlienhebykhachhangtiemnangid/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetLienheByKhachHangTiemNangId(Guid id)
        {
            try
            {
                List<LienHeDTO> result = await _lienHeServices.GetLienHeByKhachHangTiemNangId(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("creatlienhe")]
        [JwtAuthorize]
        public async Task<IActionResult> CreateLienHe(LienHeModal modal)
        {
            try
            {
                var result = await _lienHeServices.Create(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updatelienhe")]
        [JwtAuthorize]
        public async Task<IActionResult> UpdateLienhe(LienHeModal modal)
        {
            try
            {
                var result = await _lienHeServices.Update(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("deletelienhe/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> DeleteDonViTinh(int id)
        {
            try
            {
                var result = await _lienHeServices.DeleteById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
