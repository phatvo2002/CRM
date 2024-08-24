using CRM.DTO;
using CRM.Modal;
using CRM.Repositories;
using CRM.Repositories.Interfaces;
using CRM.Services.Interfaces;

namespace CRM.Services
{
    public class UserServices : IUserServices
    {
        private readonly IUserRepository _userRepository;

        public UserServices(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<ResultModal> CreateUser(UserModal userModal)
        {
            return await _userRepository.CreateUser(userModal);
        }

        public async Task<ResultModal> DeleteUser(Guid id)
        {
            return await _userRepository.DeleteUser(id);
        }

        public async Task<List<UserDTO>> GetUsers()
        {
            return await _userRepository.GetUsers();
        }

        public async Task<LoginDTO> GetUserById(Guid Id )
        {
            return await _userRepository.GetUserById(Id);
        }

        public async Task<LoginDTO> Login(LoginViewModal loginViewModal)
        {
            return await _userRepository.Login(loginViewModal);
        }

        public async Task<ResultModal> ActiveAccount(AcviteModal modal)
        {
            return await _userRepository.ActiveAccount(modal);
        }
    }
}
