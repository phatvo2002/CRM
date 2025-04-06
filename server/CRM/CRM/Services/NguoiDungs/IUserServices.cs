using CRM.DTO;
using CRM.Modal;

namespace CRM.Services.NguoiDungs
{
    public interface IUserServices
    {
        Task<LoginDTO> Login(LoginViewModal loginViewModal);

        Task<ResultModal> CreateUser(UserModal userModal);
        Task<ResultModal> ActiveMailServices(Guid Id, string passEmail, string email);
        Task<List<UserDTO>> GetUsers();
        Task<List<UserDTO>> GetUserByPhongBanId(Guid id);
        Task<List<UserDTO>> GetUserIsNhanVien(Guid phongBanId);
        Task<ResultModal> DeleteUser(Guid id);
        Task<List<UserDTO>> GetUserIsTruongPhong();
        Task<UserDTO> GetUserById(Guid Id);
        Task<ResultModal> ActiveAccount(AcviteModal modal);
        Task<ResultModal> ChangePasswrord(Guid id, string oldPassword, string newPassword);
        Task<ResultModal> UserRolePermission(Guid id, Guid roleId, string roleName);
        Task<ResultModal> UserDepartment(Guid userId, Guid departmentId);
        Task<ResultModal> UploadImage(Guid userId, IFormFile formFile);
    }

}
