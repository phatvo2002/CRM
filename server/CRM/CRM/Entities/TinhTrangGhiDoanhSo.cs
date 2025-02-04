namespace CRM.Entities
{
    public class TinhTrangGhiDoanhSo
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public virtual ICollection<DonHang> DonHangs { get; set; } = new List<DonHang>();

    }
}
