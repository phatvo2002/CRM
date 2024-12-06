namespace CRM.Entities
{
    public partial class TrangThaiThucHien
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public virtual ICollection<LichHen> LichHens { get; set; } = new List<LichHen>();
    }
}
