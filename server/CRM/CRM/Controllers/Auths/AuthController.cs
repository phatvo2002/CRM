using CRM.Attributes;
using CRM.DTO;
using CRM.Extensions;
using CRM.Modal;
using CRM.Services.NguoiDungs;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.Auths
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public readonly IUserServices _userServices;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IUserServices userServices)
        {
            _userServices = userServices;
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
