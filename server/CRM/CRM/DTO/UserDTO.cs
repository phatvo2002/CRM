namespace CRM.DTO
{
    public class UserDTO
    {
        public Guid Id { get; set; }

        public string? HoVaDem { get; set; }

        public string? Ten { get; set; }

        public string? DiaChi { get; set; }

        public string? SoDienThoai { get; set; }

        public string? Email { get; set; }

        public bool IsActive { get; set; }

        public DateTime? NgayThuViec { get; set; }

        public DateTime? NgayBatDauLamViec { get; set; }

        public Guid? MaChucVu { get; set; }

        public Guid? MaPhongBan { get; set; }

        public bool CheckIsTruongPhong { get; set; }

        public bool CheckIsGiamDoc { get; set; }
    }
}
