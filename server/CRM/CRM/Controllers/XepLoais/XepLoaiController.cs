using CRM.Attributes;
using CRM.Modal;
using CRM.Repositories.XepLoais;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.XepLoais
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class XepLoaiController : ControllerBase
    {
        private readonly IXepLoaiRepository _xepLoaiRepository;
        public XepLoaiController(IXepLoaiRepository xepLoaiRepository)
        {
            _xepLoaiRepository = xepLoaiRepository;
        }
        [HttpGet("getall")]
        [JwtAuthorize]
        public async Task<IActionResult> Getall()
        {
            try
            {
                var result = await _xepLoaiRepository.GetAll();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getbyid/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var result = await _xepLoaiRepository.GetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("create")]
        [JwtAuthorize]
        public async Task<IActionResult> Create(XepLoaiModal modal)
        {
            try
            {
                var result = await _xepLoaiRepository.Create(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("update")]
        [JwtAuthorize]
        public async Task<IActionResult> Update(XepLoaiModal modal)
        {
            try
            {
                var result = await _xepLoaiRepository.Update(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("delete/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var result = await _xepLoaiRepository.DeleteById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
