namespace CRM.Entities
{
    public partial class LoaiTiemNang
    {
        public int Id { get; set; }

        public string? TenLoaiTiemNang { get; set; }

        public virtual ICollection<KhachHangTiemNang> KhachHangTiemNangs { get; set; } = new List<KhachHangTiemNang>();
        public virtual ICollection<KhachHangMucTieu> KhachHangMucTieus { get; set; } = new List<KhachHangMucTieu>();
    }
}
