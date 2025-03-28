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

        public MailController(IMailServices mailService, CrmDbContext crmDbContext)
        {
            _mailService = mailService;
            _crmDbContext = crmDbContext;
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
                return BadRequest(ex.Message);
            }
        }
    }
}
