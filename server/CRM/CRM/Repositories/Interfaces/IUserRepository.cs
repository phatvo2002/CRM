using CRM.DTO;
using CRM.Modal;

namespace CRM.Repositories.Interfaces
{
    public interface IUserRepository
    {

        Task<LoginDTO> Login(LoginViewModal loginViewModel);

        Task<ResultModal> ChangePassword(Guid id ,string newpass);

        Task<ResultModal> CreateUser(UserModal userModal);

        Task<List<UserDTO>> GetUsers();

        Task<ResultModal> DeleteUser(Guid id);

        Task<LoginDTO> GetUserById(Guid id);
    }
}
