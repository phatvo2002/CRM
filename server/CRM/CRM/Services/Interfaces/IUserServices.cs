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

        Task<UserDTO> GetUserById(Guid Id);

        Task<ResultModal> ActiveAccount(AcviteModal modal);

        Task<ResultModal> ChangePasswrord(Guid id ,  string oldPassword , string newPassword);

        Task<ResultModal> UserRolePermission(Guid id , Guid roleId , string roleName);

        Task<ResultModal> UserDepartment(Guid userId, Guid departmentId);
    }

}
