using CRM.DTO;
using CRM.Modal;

namespace CRM.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<LoginDTO> Login(LoginViewModal loginViewModel);

        Task<ResultModal> CreateUser(UserModal userModal);
    }
}
