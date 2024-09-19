using CRM.Entities;

namespace CRM.DTO
{
    public class LoginDTO
    {
        public Guid Id { get; set; }

        public string? Ten { get; set; }

        public string? DiaChi { get; set; }

        public string? SoDienThoai { get; set; }

        public string? Email { get; set; }

        public bool IsActive { get; set; }

        public string? TaiKhoan { get; set; }

        public string? MatKhau { get; set; }
        public Guid? MaChucVu { get; set; }

        public Guid? MaPhongBan { get; set; }


        public int? MaTinhTrang { get; set; }
    

        public string? Token { get; set; }

        public int Status { get; set; }
        public DateTime Expires { get; set; }
    }
}
