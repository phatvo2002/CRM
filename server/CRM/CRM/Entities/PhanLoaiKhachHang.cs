namespace CRM.Entities
{
    public class PhanLoaiKhachHang
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public virtual ICollection<KhachHangMucTieu> KhachHangMucTieus { get; set; } = new List<KhachHangMucTieu>();
    }
}
