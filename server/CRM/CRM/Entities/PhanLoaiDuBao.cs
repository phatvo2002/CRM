namespace CRM.Entities
{
    public class PhanLoaiDuBao
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public virtual ICollection<GiaiDoanBanHang> GiaiDoanBanHangs { get; set; } = new List<GiaiDoanBanHang>();
    }
}
