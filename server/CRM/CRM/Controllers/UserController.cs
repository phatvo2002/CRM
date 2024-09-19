using CRM.Attributes;
using CRM.DTO;
using CRM.Modal;
using CRM.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
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
        [JwtAuthorize]
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

        [HttpGet("getAllUser")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllUser()
        {
            try
            {
                List<UserDTO> result = await _userService.GetUsers();
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("getUserById")]
        [JwtAuthorize]
        public async Task<IActionResult> GetUserById(Guid Id)
        {
            try
            {
                LoginDTO result = await _userService.GetUserById(Id);
                return Ok(result);
            }catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("deleteUserById/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            try
            {
                ResultModal result = await _userService.DeleteUser(id);
                return Ok(result);
            }catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("userRolePermission")]
        [JwtAuthorize]
        public async Task<IActionResult> UserRolePermission(Guid id , Guid roleId , string roleName)
        {
            try
            {
                ResultModal result = await _userService.UserRolePermission(id , roleId , roleName);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
