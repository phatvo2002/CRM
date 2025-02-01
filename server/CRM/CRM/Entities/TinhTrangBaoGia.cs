namespace CRM.Entities
{
    public class TinhTrangBaoGia
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public ICollection<BaoGia>? BaoGias { get; set; } = new List<BaoGia>();
    }
}
