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

        public byte[]? HinhAnh { get; set; }
        
        public Guid? MaChucVu { get; set; }

        public Guid? MaPhongBan { get; set; }
        public Guid? MaChiNhanh { get; set; }
        public PhongBanDTO? PhongBan { get; set; }
        public ChucVuDTO? ChucVu { get; set; }
        public bool CheckIsTruongPhong { get; set; }

        public bool CheckIsGiamDoc { get; set; }

        public int? MaTinhTrang { get; set; }

        public string? Token { get; set; }

        public int Status { get; set; }
        public DateTime Expires { get; set; }
    }
}
