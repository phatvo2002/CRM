using CRM.Attributes;
using CRM.Entities;
using CRM.Extensions;
using CRM.Modal;
using CRM.Services.Mails;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.Mails
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        private readonly IMailServices _mailService;
        private readonly CrmDbContext _crmDbContext;
        private readonly ILogger<MailController> _logger;   
        public MailController(IMailServices mailService, CrmDbContext crmDbContext, ILogger<MailController> logger)
        {
            _mailService = mailService;
            _crmDbContext = crmDbContext;
            _logger = logger;
        }
        [HttpPost("GuiMail")]
        [JwtAuthorize]
        public async Task<IActionResult> SendMail([FromForm] MailRequest mailRequest)
        {
            try
            {
                Guid nguoiDungID = HttpContext.GetUserId();
                Guid phongBand = HttpContext.GetPhongBanId();
                var db = _crmDbContext.Nguoidungs.FirstOrDefault(r => r.Id == nguoiDungID);
                if (db != null)
                {
                    if (db.Password != null)
                    {
                        await _mailService.SendMailAsync(mailRequest, db.Email, db.Password, nguoiDungID, phongBand);
                        return Ok(new ResultModal() { Status = 200, Message = "Gửi mail thành công", Success = true });
                    }
                    return Ok(new ResultModal() { Status = 202, Message = "Bạn chưa đăng ký dịch vụ mail cá nhân", Success = false });
                }
                return Ok(new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false });
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GuiMailDonHang/{donHangId}")]
        [JwtAuthorize]
        public async Task<IActionResult> SendMailDonhang([FromForm] MailRequest mailRequest, Guid donHangId)
        {
            try
            {
                Guid nguoiDungID = HttpContext.GetUserId();
                Guid phongBand = HttpContext.GetPhongBanId();
                var db = _crmDbContext.Nguoidungs.FirstOrDefault(r => r.Id == nguoiDungID);
                if (db != null)
                {
                    if (db.Password != null)
                    {
                        await _mailService.SendMailDonHangAsync(mailRequest, db.Email, db.Password, donHangId, nguoiDungID, phongBand);
                        return Ok(new ResultModal() { Status = 200, Message = "Gửi mail thành công", Success = true });
                    }
                    return Ok(new ResultModal() { Status = 202, Message = "Bạn chưa đăng ký dịch vụ mail cá nhân", Success = false });
                }
                return Ok(new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false });
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("GuiMailBaoGia/{baoGiaId}")]
        [JwtAuthorize]
        public async Task<IActionResult> SendMailBaoGia([FromForm] MailRequest mailRequest, Guid baoGiaId)
        {
            try
            {
                Guid nguoiDungID = HttpContext.GetUserId();
                Guid phongBand = HttpContext.GetPhongBanId();
                var db = _crmDbContext.Nguoidungs.FirstOrDefault(r => r.Id == nguoiDungID);
                if (db != null)
                {
                    if (db.Password != null)
                    {
                        await _mailService.SendMailBaoGiaAsync(mailRequest, db.Email, db.Password, baoGiaId, nguoiDungID, phongBand);
                        return Ok(new ResultModal() { Status = 200, Message = "Gửi mail báo giá thành công", Success = true });
                    }
                    else return Ok(new ResultModal() { Status = 202, Message = "Bạn chưa đăng ký dịch vụ mail cá nhân", Success = false });
                }
                else return Ok(new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false });
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }
}
