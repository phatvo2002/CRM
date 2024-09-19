using CRM.Abstraction;
using CRM.DTO;
using CRM.Modal;
using CRM.Repositories.Interfaces;
using CRM.Services.Interfaces;

namespace CRM.Services
{
    public class UserServices : IUserServices
    {
        private readonly IUnitOfWork _unitOfWork;

        public UserServices( IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<ResultModal> CreateUser(UserModal userModal)
        {
            return await _unitOfWork.UserRepository.CreateUser(userModal);
        }

        public async Task<ResultModal> DeleteUser(Guid id)
        {
            return await _unitOfWork.UserRepository.DeleteUser(id);
        }

        public async Task<List<UserDTO>> GetUsers()
        {
            return await _unitOfWork.UserRepository.GetUsers();
        }

        public async Task<LoginDTO> GetUserById(Guid Id )
        {
            return await _unitOfWork.UserRepository.GetUserById(Id);
        }

        public async Task<LoginDTO> Login(LoginViewModal loginViewModal)
        {
            return await _unitOfWork.UserRepository.Login(loginViewModal);
        }

        public async Task<ResultModal> ActiveAccount(AcviteModal modal)
        {
            return await _unitOfWork.UserRepository.ActiveAccount(modal);
        }

        public async Task<ResultModal> ChangePasswrord(Guid id, string oldPassword, string newPassword)
        {
            return await _unitOfWork.UserRepository.ChangePassword(id, oldPassword, newPassword);
        }

        public async Task<ResultModal> UserRolePermission(Guid id, Guid roleId, string roleName)
        {
           return await _unitOfWork.UserRepository.UserRolePermission(id, roleId, roleName);
        }
    }
}
