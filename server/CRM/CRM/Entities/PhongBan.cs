namespace CRM.Entities
{
    public partial class PhongBan
    {
        public Guid Id { get; set; }

        public string? TenPhongBan { get; set; }

        public virtual ICollection<Nguoidung> Nguoidung { get; set;} = new List<Nguoidung>();
    }
}
