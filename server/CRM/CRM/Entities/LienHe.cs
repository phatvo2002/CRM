namespace CRM.Entities
{
    public partial class LienHe : BaseNguoiDung
    {
        public string? Id { get; set; }
        public string? TenLienHe { get; set; }
        public string? XungHo { get; set; }
        public string? Email { get; set; }
        public string? SoDienThoai { get; set; }
        public Guid? KhachHangTiemNangId { get; set; }
        public string? KhachHangId { get; set; }

        public virtual ICollection<CoHoi> CoHois { get; set; } = new List<CoHoi>();
    }
}
