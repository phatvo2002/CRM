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

        public async Task<LoginDTO> Login(LoginViewModal loginViewModal)
        {
            return await _userRepository.Login(loginViewModal);
        }
    }
}
