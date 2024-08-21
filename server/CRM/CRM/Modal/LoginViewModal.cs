using System.ComponentModel.DataAnnotations;

namespace CRM.Modal
{
    public class LoginViewModal
    {
        [Required(ErrorMessage = "Tài khoản không được để trống")]
        public string? TaiKhoan { get; set; } = "";

        [Required(ErrorMessage = "Mật khẩu không được để trống")]
        public string? Password { get; set; } = "";
    }
}
