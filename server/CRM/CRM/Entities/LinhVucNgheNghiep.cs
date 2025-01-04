namespace CRM.Entities
{
    public partial class LinhVucNgheNghiep
    {
        public int Id { get; set; }

        public string? TenLinhVuc {  get; set; }

        public virtual ICollection<NganhNghe> NganhNghes { get; set; } = new List<NganhNghe>();

        public virtual ICollection<KhachHangTiemNang> KhachHangTiemNangs { get; set; }  = new List<KhachHangTiemNang>();
        public virtual ICollection<KhachHangMucTieu> KhachHangMucTieus { get; set; } = new List<KhachHangMucTieu>();
    }
}
