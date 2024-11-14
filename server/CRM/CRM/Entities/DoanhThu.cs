namespace CRM.Entities
{
    public partial class DoanhThu
    {
        public int Id { get; set; }

        public string? TenDoanhThu { get; set; }

        public virtual ICollection<KhachHangTiemNang> KhachHangTiemNangs { get; set; } = new List<KhachHangTiemNang>();
    }
}
