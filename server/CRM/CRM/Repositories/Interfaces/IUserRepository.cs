using CRM.DTO;
using CRM.Modal;

namespace CRM.Repositories.Interfaces
{
    public interface IUserRepository
    {

        Task<LoginDTO> Login(LoginViewModal loginViewModel);

        Task<ResultModal> ChangePassword(Guid id , string oldpass, string newpass);

        Task<ResultModal> CreateUser(UserModal userModal);

        Task<List<UserDTO>> GetUsers();

        Task<ResultModal> DeleteUser(Guid id);

        Task<UserDTO> GetUserById(Guid id);

        Task<ResultModal> ActiveAccount(AcviteModal modal);

        Task<ResultModal> UserRolePermission(Guid userId , Guid roleId , string roleName);

        Task<ResultModal> UserDepartment(Guid userId , Guid departmentId );

    }
}
