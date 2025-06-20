using CRM.Attributes;
using CRM.DTO;
using CRM.Entities;
using CRM.Extensions;
using CRM.Modal;
using CRM.Services.MucTieuDoanhSos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRM.Controllers.MucTieuDoanhSos
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class MucTieuDoanhSoController : ControllerBase
    {
        private readonly IMucTieuDoanhSoServices _mucTieuDoanhSoservices;
        private readonly CrmDbContext _context;
        private readonly ILogger<MucTieuDoanhSoController> _logger;
        public MucTieuDoanhSoController(IMucTieuDoanhSoServices mucTieuDoanhSoServices, CrmDbContext context, ILogger<MucTieuDoanhSoController> logger)
        {
            _mucTieuDoanhSoservices = mucTieuDoanhSoServices;
            _context = context;
            _logger = logger;
        }


        [HttpGet("getall")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAll(DateTime tuNgay, DateTime denNgay)
        {
            try
            {
                Guid phongBanId = HttpContext.GetPhongBanId();
                Guid nguoiDungId = HttpContext.GetUserId();
                var userData = await _context.Nguoidungs.Where(r => r.Id == nguoiDungId).FirstOrDefaultAsync();
                if (userData != null)
                {
                    if (userData?.CheckIsGiamDoc == true && userData?.CheckIsTruongPhong == false || userData?.MaPhongBan == Guid.Parse("4D086C61-CC35-40D4-B9D9-816063DF1C32"))
                    {
                        List<MucTieuDoanhSoDTO> result = await _mucTieuDoanhSoservices.GetAll(tuNgay, denNgay);
                        return Ok(result);
                    }
                    else
                    {
                        List<MucTieuDoanhSoDTO> result = await _mucTieuDoanhSoservices.GetAllByPhongBan(tuNgay, denNgay, phongBanId);
                        return Ok(result);
                    }
                }
                else return Ok(new ResultModal() { Status = 202, Message = "Không có dữ liệu", Success = false });
            }
            catch (ArgumentException ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getById")]
        [JwtAuthorize]
        public async Task<IActionResult> GetById(Guid Id)
        {
            try
            {
                var result = await _mucTieuDoanhSoservices.GetById(Id);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("create")]
        [JwtAuthorize]
        public async Task<IActionResult> CreateMucTieuDoanhSo(MucTieuDoanhSoModal modal)
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                ResultModal result = await _mucTieuDoanhSoservices.CreateMucTieuDoanhSo(modal, nguoiDungId);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("update")]
        [JwtAuthorize]
        public async Task<IActionResult> Update(MucTieuDoanhSoModal modal)
        {
            try
            {
                var result = await _mucTieuDoanhSoservices.UpdateMucTieuDoanhSo(modal);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("delete")]
        [JwtAuthorize]
        public async Task<IActionResult> Delete(Guid id)
        {
            try
            {
                var result = await _mucTieuDoanhSoservices.DeleteById(id);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}
