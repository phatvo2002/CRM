namespace CRM.Entities
{
    public class LoaiHangHoa
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public virtual ICollection<HangHoa> HangHoas { get; set; } = new List<HangHoa>();
    }
}
