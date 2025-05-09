using CRM.Attributes;
using CRM.DTO;
using CRM.Entities;
using CRM.Extensions;
using CRM.Modal;
using CRM.Services.BaoGias;
using CRM.Services.Mails;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.BaoGias
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class BaoGiaController : ControllerBase
    {
        private readonly IBaoGiaServices _baoGiaServices;
        private readonly IMailServices _mailService;
        private readonly CrmDbContext _context;
        public BaoGiaController(IBaoGiaServices baoGiaServices, CrmDbContext context, IMailServices mailService)
        {
            _baoGiaServices = baoGiaServices;
            _context = context;
            _mailService = mailService;
        }

        [HttpGet("getbaogialist")]
        [JwtAuthorize]
        public async Task<IActionResult> GetBaoGiaList(DateTime tuNgay, DateTime denNgay)
        {
            try
            {
                Guid phongbanId = HttpContext.GetPhongBanId();
                Guid userId = HttpContext.GetUserId();
                var db = _context.Nguoidungs.FirstOrDefault(r => r.Id == userId);
                if (db.CheckIsGiamDoc)
                {
                    var result = await _baoGiaServices.GetAllDto(tuNgay, denNgay);
                    return Ok(result);
                }
                else if (db.CheckIsTruongPhong)
                {
                    List<BaoGiaDTO> result = await _baoGiaServices.GetBaoGiaByPhongBanId(phongbanId, tuNgay, denNgay);
                    return Ok(result);
                }
                else
                {
                    List<BaoGiaDTO> result = await _baoGiaServices.GetBaoGiaByNguoiDungId(userId, tuNgay, denNgay);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getbaogiabyid/{id}")]
        //[JwtAuthorize]
        public async Task<IActionResult> GetBaoGiaById(Guid id)
        {
            try
            {
                BaoGiaDTO result = await _baoGiaServices.GetBaoGiaById(id);
                return Ok(result);
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
        [HttpPost("GuiMailBaoGia/{baoGiaId}/{trangThaiId}")]
        [JwtAuthorize]
        public async Task<IActionResult> SendMailBaoGia([FromForm] MailRequest mailRequest, Guid baoGiaId, int trangThaiId)
        {
            try
            {
                Guid nguoiDungID = HttpContext.GetUserId();
                Guid phongBand = HttpContext.GetPhongBanId();
                var db = _context.Nguoidungs.FirstOrDefault(r => r.Id == nguoiDungID);
                if (db != null)
                {
                    if (db.Password != null)
                    {
                        await _baoGiaServices.UpdateTrangThaiBaoGia(baoGiaId, trangThaiId);
                        await _mailService.SendMailAsync(mailRequest, db.Email, db.Password, nguoiDungID, phongBand);
                        return Ok(new ResultModal() { Status = 200, Message = "Gửi mail thành công", Success = true });
                    }
                    return Ok(new ResultModal() { Status = 202, Message = "Bạn chưa đăng ký dịch vụ mail cá nhân", Success = false });
                }
                return Ok(new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false });
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
        [HttpPut("pheduyetbaogia")]
        //[JwtAuthorize]
        public async Task<IActionResult> PheDuyetBaoGia(Guid baoGiaId, int trangThaiId)
        {
            try
            {
                ResultModal result = await _baoGiaServices.PheDuyetBaoGia(baoGiaId, trangThaiId);
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
                //var result = await _baoGiaServices.DeleteById(id);
                ResultModal result = await _baoGiaServices.DeleteBaoGia(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
