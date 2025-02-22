using CRM.Attributes;
using CRM.DTO;
using CRM.Entities;
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
        private readonly CrmDbContext _context;
        public BaoGiaController(IBaoGiaServices baoGiaServices, CrmDbContext context)
        {
            _baoGiaServices = baoGiaServices;
            _context = context;
        }
        [HttpGet("getbaogialist")]
        [JwtAuthorize]
        public async Task<IActionResult> GetBaoGiaList()
        {
            try
            {
                Guid phongbanId = HttpContext.GetPhongBanId();
                Guid userId = HttpContext.GetUserId();
                var db = _context.Nguoidungs.FirstOrDefault(r => r.Id == userId);
                if (db.CheckIsGiamDoc)
                {
                    var result = await _baoGiaServices.GetAll();
                    return Ok(result);
                }
                else if (db.CheckIsTruongPhong)
                {
                    List<BaoGiaDTO> result = await _baoGiaServices.GetBaoGiaByPhongBanId(phongbanId);
                    return Ok(result);
                }
                else
                {
                    List<BaoGiaDTO> result = await _baoGiaServices.GetBaoGiaByNguoiDungId(userId);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
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
        [HttpPut("updatebaogia")]
        [JwtAuthorize]
        public async Task<IActionResult> UpdateThongTinBaoGia(BaoGiaModal modal)
        {
            try
            {
                var result = await _baoGiaServices.Update(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updatetongtien")]
        [JwtAuthorize]
        public async Task<IActionResult> UpdateSoTienHangHoa(Guid baoGiaId, decimal soTien)
        {
            try
            {
                ResultModal result = await _baoGiaServices.UpdateSoTienHangHoa(baoGiaId, soTien);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("deletebaogia/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> DeleteBaoGia(Guid id)
        {
            try
            {
                var result = await _baoGiaServices.DeleteById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
