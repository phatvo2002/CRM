using CRM.DTO;
using CRM.Modal;

namespace CRM.Repositories.Menus
{
    public interface IMenuRepository
    {
         Task<ResultModal> AddMenu(MenuModel modal);
         Task<List<MenuDTO>> GetAllMenu(Guid groupId);
         Task<List<MenuDTO>> GetAllMenuParent();
         Task<MenuDTO> GetMenuById(Guid id);
         Task<ResultModal> DeleteMenu(Guid id);
         Task<ResultModal> UpdateGroup(GroupModel model);
         Task<List<MenuRoleDTO>> GetAllMenuRole(Guid Id);
         Task<List<MenuRoleDTO>> GetAllMenuByRole(Guid RoleId);
         Task<ResultModal> UpdateMenu(MenuModel model);
    }
}
