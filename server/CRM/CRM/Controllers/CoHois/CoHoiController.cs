using CRM.Attributes;
using CRM.DTO;
using CRM.Entities;
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
        private readonly CrmDbContext _context;

        public CoHoiController(ICoHoiServices coHoiServices, CrmDbContext context)
        {
            _coHoiServices = coHoiServices;
            _context = context;
        }

        [HttpGet("getallcohoi")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllCoHoi(DateTime tuNgay, DateTime denNgay)
        {
            Guid nguoiDungId = HttpContext.GetUserId();
            try
            {
                var result = await _coHoiServices.GetAllData(tuNgay, denNgay, nguoiDungId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getcohoibyid/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetCoHoiById(string id)
        {
            try
            {
                CoHoiDTO result = await _coHoiServices.GetCoHoiById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getcohoilist")]
        [JwtAuthorize]
        public async Task<IActionResult> GetCoHoiList()
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                Guid phongBanId = HttpContext.GetPhongBanId();
                var userData = _context.Nguoidungs.Where(r => r.Id == nguoiDungId).FirstOrDefault();
                if (userData.CheckIsTruongPhong == true)
                {
                    List<CoHoiDTO> result = await _coHoiServices.GetCoHoiByPhongBanId(phongBanId);
                    return Ok(result);
                }
                else
                {
                    List<CoHoiDTO> result = await _coHoiServices.GetCoHoiByNguoiDungId(nguoiDungId);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
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
        [HttpPut("updategiaidoan")]
        [JwtAuthorize]
        public async Task<IActionResult> UpdateGiaiDoan(string id, Guid giaiDoanId)
        {
            try
            {
                ResultModal result = await _coHoiServices.UpdateGiaiDoan(id, giaiDoanId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("updatesotien")]
        [JwtAuthorize]
        public async Task<IActionResult> UpdateSoTien(string id, decimal soTien)
        {
            try
            {
                ResultModal result = await _coHoiServices.UpdateCoHoiGiaTien(id, soTien);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updatengaykyvong")]
        [JwtAuthorize]
        public async Task<IActionResult> UpdateNgayKyVongKetThuc(string id, DateTime ngayKyVong)
        {
            try
            {
                ResultModal result = await _coHoiServices.UpdateNgayKyVong(id, ngayKyVong);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("deletecohoi/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> DeleteCoHoi(string id)
        {
            try
            {
                var result = await _coHoiServices.DeleteById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
