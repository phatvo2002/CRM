using CRM.DTO;
using CRM.Modal;
using CRM.Repositories.NguoiDungs;

namespace CRM.Services.NguoiDungs
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

        public async Task<UserDTO> GetUserById(Guid Id)
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

        public async Task<ResultModal> ChangePasswrord(Guid id, string oldPassword, string newPassword)
        {
            return await _userRepository.ChangePassword(id, oldPassword, newPassword);
        }

        public async Task<ResultModal> UserRolePermission(Guid id, Guid roleId, string roleName)
        {
            return await _userRepository.UserRolePermission(id, roleId, roleName);
        }

        public async Task<ResultModal> UserDepartment(Guid userId, Guid departmentId)
        {
            return await _userRepository.UserDepartment(userId, departmentId);
        }

        public async Task<List<UserDTO>> GetUserByPhongBanId(Guid id)
        {
            return await _userRepository.GetUserByPhongBanId(id);
        }

        public async Task<ResultModal> ActiveMailServices(Guid Id, string passEmail, string email)
        {
            return await _userRepository.ActiveMailServices(Id, passEmail, email);
        }

        public async Task<ResultModal> UploadImage(Guid userId, IFormFile formFile)
        {
            return await _userRepository.UploadImage(userId, formFile);
        }

        public async Task<List<UserDTO>> GetUserIsTruongPhong()
        {
            return await _userRepository.GetUserIsTruongPhong();
        }

        public async Task<List<UserDTO>> GetUserIsNhanVien(Guid phongBanId)
        {
            return await _userRepository.GetUserIsNhanVien(phongBanId);
        }
    }
}
