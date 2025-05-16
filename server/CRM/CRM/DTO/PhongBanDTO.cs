namespace CRM.DTO
{
    public class PhongBanDTO
    {
        public Guid Id { get; set; }
        public int SoThuTu { get; set; }
        public string? MaQuanLy { get; set; }
        public string? TenPhongBan { get; set; }
        public string? MoTa { get; set; }
        public string? IsActive { get; set; }
        public List<UserDTO>? Nguoidung { get; set; }
    }
}
