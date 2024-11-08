
using CRM.DTO;
using CRM.Modal;
using CRM.Repositories.Interfaces;
using CRM.Services.Interfaces;

namespace CRM.Services
{
    public class MenuServices : IMenuServices
    {
        private readonly IMenuRepository _menuRepository;
        public MenuServices( IMenuRepository menuRepository)
        {
            _menuRepository = menuRepository;
        }
        public async Task<ResultModal> DeleteMenu(Guid Id)
        {
           return await _menuRepository.DeleteMenu(Id);
        }

        public async Task<List<MenuDTO>> GetAllMenu()
        {
            return await _menuRepository.GetAllMenu();
        }

        public async Task<List<MenuRoleDTO>> GetAllMenuRoles(Guid roleid)
        {
            return await _menuRepository.GetAllMenuRole(roleid);
        }

        public async Task<ResultModal> InsertMenu(MenuModel modal)
        {
           return await _menuRepository.AddMenu(modal);
        }

        public async Task<ResultModal> UpdateMenu(MenuModel model)
        {
           return await _menuRepository.UpdateMenu(model); 
        }

        public async Task<ResultModal> UpdateMenuRole(GroupModel model)
        {
           return await _menuRepository.UpdateGroup(model);
        }
    }
}
