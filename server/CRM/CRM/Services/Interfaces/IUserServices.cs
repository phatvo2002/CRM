using CRM.DTO;
using CRM.Modal;

namespace CRM.Services.Interfaces
{
    public interface IUserServices
    {
        Task<LoginDTO> Login(LoginViewModal loginViewModal);

        Task<ResultModal> CreateUser(UserModal userModal);

        Task<List<UserDTO>> GetUsers();

        Task<ResultModal> DeleteUser(Guid id);

        Task<LoginDTO> GetUserById(Guid Id);
    }

}
