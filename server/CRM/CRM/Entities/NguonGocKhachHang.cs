namespace CRM.Entities
{
    public class NguonGocKhachHang
    {
        public int Id { get; set; }
        public string? TenNguonGoc {  get; set; }

        public virtual ICollection<KhachHangTiemNang> KhachHangTiemNangs { get; set; } = new List<KhachHangTiemNang>();
    }
}
