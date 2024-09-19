using CRM.Abstraction;
using CRM.DTO;
using CRM.Modal;
using CRM.Services.Interfaces;

namespace CRM.Services
{
    public class MenuServices : IMenuServices
    {
        public readonly IUnitOfWork _unitOfWork;

        public MenuServices(IUnitOfWork unitOfWork)
        {
              _unitOfWork = unitOfWork;
        }
        public async Task<ResultModal> DeleteMenu(Guid Id)
        {
           return await _unitOfWork.MenuRepository.DeleteMenu(Id);
        }

        public async Task<List<MenuDTO>> GetAllMenu()
        {
            return await _unitOfWork.MenuRepository.GetAllMenu();
        }

        public async Task<List<MenuRoleDTO>> GetAllMenuRoles(Guid roleid)
        {
            return await _unitOfWork.MenuRepository.GetAllMenuRole(roleid);
        }

        public async Task<ResultModal> InsertMenu(MenuModel modal)
        {
           return await _unitOfWork.MenuRepository.AddMenu(modal);
        }

        public async Task<ResultModal> UpdateMenuRole(GroupModel model)
        {
           return await _unitOfWork.MenuRepository.UpdateGroup(model);
        }
    }
}
