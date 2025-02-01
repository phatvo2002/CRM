
namespace CRM.Entities
{
    public class LoaiCoHoi
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public virtual ICollection<CoHoi> CoHois { get; set; } = new List<CoHoi>();
    }
}
