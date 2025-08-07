using CRM.Attributes;
using CRM.DTO;
using CRM.Entities;
using CRM.Extensions;
using CRM.Modal;
using CRM.Services.NguoiDungs;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.Auths
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public readonly IUserServices _userServices;
        private readonly ILogger<AuthController> _logger;
        private readonly CrmDbContext  _crmDbContext;

        public AuthController(IUserServices userServices , CrmDbContext crmDbContext)
        {
            _userServices = userServices;
            _crmDbContext = crmDbContext;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginViewModal viewModal)
        {
            try
            {
                LoginDTO result = await _userServices.Login(viewModal);

                return Ok(result);

            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("LoginWithGoogle")]
        public async Task<IActionResult> LoginWithGoogle(LoginEmailModal modal)
        {

            try
            {
                var payload = await GoogleJsonWebSignature.ValidateAsync(modal.Token);
                if (payload == null)
                    return Ok(new ResultModal() { Status = 202, Message = "Mã không hợp lệ", Success = false });

                var userEmail = payload.Email;
                var userdb =  _crmDbContext.Nguoidungs.Where(r=>r.Email == userEmail).FirstOrDefault();
                LoginDTO result = new LoginDTO();
                if (userdb == null)
                {
                    return Ok(new ResultModal() { Status = 202, Message = "Không tìm thấy tài khoản", Success = false });
                }
                else
                {
                     LoginViewModal viewModal = new LoginViewModal()
                     {
                         TaiKhoan = userdb.TaiKhoan,
                         Password = "abc@123",
                     };
                     result = await _userServices.Login(viewModal);
                }

                    return Ok(result);

            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
      

        [HttpPut("ActiveAccount")]
        [JwtAuthorize]
        public async Task<IActionResult> ActiveAccount(AcviteModal modal)
        {
            try
            {
                ResultModal result = await _userServices.ActiveAccount(modal);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("ActiveMailSerVices/{passEmail}/{email}")]
        [JwtAuthorize]
        public async Task<IActionResult> ActiveMailSerVices(string passEmail, string email)
        {
            try
            {
                Guid userId = HttpContext.GetUserId();
                ResultModal result = await _userServices.ActiveMailServices(userId, passEmail, email);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }


        [HttpPut("ChangePassword")]
        [JwtAuthorize]
        public async Task<IActionResult> ChangePassword(Guid Id, string OldPassword, string NewPassword)
        {
            try
            {
                ResultModal result = await _userServices.ChangePasswrord(Id, OldPassword, NewPassword);
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
