namespace CRM.Entities
{
    public partial class LoaiHinhNgheNghiep
    {
        public int Id { get; set; }

        public string? TenLoaiHinh { get; set; }

        public virtual ICollection<KhachHangTiemNang> KhachHangTiemNangs { get; set; } = new List<KhachHangTiemNang>;

    }
}
