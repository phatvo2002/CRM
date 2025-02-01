using CRM.DTO;
using CRM.Modal;
using System.ComponentModel.DataAnnotations;

namespace CRM.Repositories.NguoiDungs
{
    public interface IUserRepository
    {

        Task<LoginDTO> Login(LoginViewModal loginViewModel);

        Task<ResultModal> ChangePassword(Guid id, string oldpass, string newpass);

        Task<ResultModal> ActiveMailServices(Guid Id , string passEmail , string email);

        Task<ResultModal> CreateUser(UserModal userModal);

        Task<List<UserDTO>> GetUsers();

        Task<List<UserDTO>> GetUserByPhongBanId(Guid id);

        Task<ResultModal> DeleteUser(Guid id);

        Task<UserDTO> GetUserById(Guid id);

        Task<ResultModal> ActiveAccount(AcviteModal modal);

        Task<ResultModal> UserRolePermission(Guid userId, Guid roleId, string roleName);

        Task<ResultModal> UserDepartment(Guid userId, Guid departmentId);

    }
}
