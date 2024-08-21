using CRM.Modal;
using CRM.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserServices _userService;

        public UserController(IUserServices userService)
        {
            _userService = userService;
        }
        [HttpPost("createUser")]
        public async Task<IActionResult> CreateUser(UserModal modal)
        {
            try
            {
                ResultModal result = await _userService.CreateUser(modal);
                return Ok(result);
            }catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
