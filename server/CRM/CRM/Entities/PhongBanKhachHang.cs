namespace CRM.Entities
{
    public class PhongBanKhachHang
    {
        public int Id { get; set; }

        public string? TenPhongban { get; set; }

        public virtual ICollection<KhachHangTiemNang> KhachHangTiemNangs { get; set; } = new List<KhachHangTiemNang>();
    }
}
