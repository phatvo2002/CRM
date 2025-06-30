using CRM.DTO;
using CRM.Modal;

namespace CRM.Services.Menus
{
    public interface IMenuServices
    {
         Task<ResultModal> InsertMenu(MenuModel modal);
         Task<ResultModal> DeleteMenu(Guid Id);
         Task<List<MenuDTO>> GetAllMenu(Guid groupId);
         Task<ResultModal> UpdateMenuRole(GroupModel model);
         Task<List<MenuRoleDTO>> GetAllMenuRoles(Guid roleid);
         Task<ResultModal> UpdateMenu(MenuModel model);
         Task<List<MenuDTO>> GetAllMenuParent();
    }
}
