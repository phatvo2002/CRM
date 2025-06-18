using CRM.DTO;
using CRM.Modal;

namespace CRM.Repositories.Menus
{
    public interface IMenuRepository
    {
        public Task<ResultModal> AddMenu(MenuModel modal);

        public Task<List<MenuDTO>> GetAllMenu(Guid groupId);

        public Task<MenuDTO> GetMenuById(Guid id);

        public Task<ResultModal> DeleteMenu(Guid id);

        public Task<ResultModal> UpdateGroup(GroupModel model);

        public Task<List<MenuRoleDTO>> GetAllMenuRole(Guid Id);

        public Task<ResultModal> UpdateMenu(MenuModel model);
    }
}
