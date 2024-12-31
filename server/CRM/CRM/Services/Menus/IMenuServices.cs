using CRM.DTO;
using CRM.Modal;

namespace CRM.Services.Menus
{
    public interface IMenuServices
    {
        public Task<ResultModal> InsertMenu(MenuModel modal);

        public Task<ResultModal> DeleteMenu(Guid Id);

        public Task<List<MenuDTO>> GetAllMenu();

        public Task<ResultModal> UpdateMenuRole(GroupModel model);

        public Task<List<MenuRoleDTO>> GetAllMenuRoles(Guid roleid);

        public Task<ResultModal> UpdateMenu(MenuModel model);
    }
}
