namespace CRM.Entities
{
    public partial class MucDoUuTien
    {
        public Guid Id {  get; set; }

        public string? Name { get; set; }

        public virtual ICollection<NhiemVu> NhiemVus { get; set; } = new List<NhiemVu>();
    }
}
