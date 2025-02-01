namespace CRM.Entities
{
    public class LyDo
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public virtual ICollection<ChiTietKetQua> ChiTietKetQuas { get; set; } = new List<ChiTietKetQua>();
    }
}
