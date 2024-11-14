namespace CRM.Entities
{
    public partial class NganhNghe
    {
        public int Id { get; set; }

        public string? TenNganhNghe { get; set; }

        public int MaLinhVucNgheNghiep {  get; set; }

        public virtual LinhVucNgheNghiep? LinhVucNgheNghiep { get; set;}

        public virtual ICollection<KhachHangTiemNang> KhachHangTiemNangs { get; set; } = new List<KhachHangTiemNang>();
    }
}
