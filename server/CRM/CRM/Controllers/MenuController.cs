using CRM.Attributes;
using CRM.DTO;
using CRM.Modal;
using CRM.Services;
using CRM.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        public readonly IMenuServices _menuServices;

        public MenuController(IMenuServices menuServices)
        {
            _menuServices = menuServices;
        }

      
        [HttpGet("getallmenu")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllMenu()
        {
            try
            {
                List<MenuDTO> result = await _menuServices.GetAllMenu();
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getmenurole/{roleid}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetRoleMenu(Guid roleid)
        {
            try
            {
                List<MenuRoleDTO> result = await _menuServices.GetAllMenuRoles(roleid);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("insertmenu")]
        [JwtAuthorize]
        public async Task<IActionResult> InsertMenu(MenuModel model)
        {
            try
            {
                ResultModal result = await _menuServices.InsertMenu(model);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("deletemenu")]
        [JwtAuthorize]
        public async Task<IActionResult> DeleteMenu(Guid Id )
        {
            try
            {
                ResultModal result = await _menuServices.DeleteMenu(Id);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updategroup")]
        [JwtAuthorize]
        public async Task<IActionResult> UpdateGroup(GroupModel model)
        {
            try
            {
                ResultModal result = await _menuServices.UpdateMenuRole(model);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
