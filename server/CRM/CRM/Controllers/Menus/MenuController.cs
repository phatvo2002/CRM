using CRM.Attributes;
using CRM.DTO;
using CRM.Extensions;
using CRM.Modal;
using CRM.Services;
using CRM.Services.Menus;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.Menus
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly IMenuServices _menuServices;
        private readonly ILogger<MenuController> _logger;
        public MenuController(IMenuServices menuServices, ILogger<MenuController> logger)
        {
            _menuServices = menuServices;
            _logger = logger;
        }


        [HttpGet("getallmenu")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllMenu()
        {
            try
            {
                Guid groupId = HttpContext.GetChucVuId();
                List<MenuDTO> result = await _menuServices.GetAllMenu(groupId);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
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
                var filteredResult = result
         .Where(r => r.Menu.MenuChildrent.Count > 0
              && r.Menu.MenuChildrent.Any(child => child.MenuRoles.Count > 0))
                    .Select(r => new MenuRoleDTO
                {
            Menu = new MenuDTO
         {
             Id = r.Menu.Id,
             Name = r.Menu.Name,
             Url = r.Menu.Url,
             Icon = r.Menu.Icon,
             IsActive = r.Menu.IsActive,
             MenuChildrent = r.Menu.MenuChildrent
                 .Where(child => child.MenuRoles.Count > 0)
                 .ToList()
         },
         GroupId = r.GroupId,
         MenuId = r.MenuId}).ToList();
                return Ok(filteredResult);

            }
            catch (ArgumentException ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getmenuallrole/{roleid}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetRoleAllMenu(Guid roleid)
        {
            try
            {
                List<MenuRoleDTO> result = await _menuServices.GetAllMenuByRole(roleid);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getmenuparent")]
        [JwtAuthorize]
        public async Task<IActionResult> GetMenuParent()
        {
            try
            {
                List<MenuDTO> result = await _menuServices.GetAllMenuParent();
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
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
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("deletemenu")]
        [JwtAuthorize]
        public async Task<IActionResult> DeleteMenu(Guid Id)
        {
            try
            {
                ResultModal result = await _menuServices.DeleteMenu(Id);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("updatemenu")]
        [JwtAuthorize]
        public async Task<IActionResult> Updatemenu(MenuModel model)
        {
            try
            {
                ResultModal result = await _menuServices.UpdateMenu(model);
                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
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
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }


    }
}
