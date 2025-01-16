using CRM.Modal;
using CRM.Services.Mails;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.Mails
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        private readonly IMailServices _mailService;

        public MailController(IMailServices mailService)
        {
            _mailService = mailService;
        }
        [HttpPost("GuiMail")]
        public async Task<IActionResult> SendMail([FromForm] MailRequest mailRequest)
        {
            try
            {
                await _mailService.SendMailAsync(mailRequest);
                return Ok(new ResultModal() { Status = 200, Message = "Gửi mail thành công", Success = true });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
