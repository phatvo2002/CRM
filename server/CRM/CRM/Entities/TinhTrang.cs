namespace CRM.Entities
{
    public partial class TinhTrang
    {
        public int Id { get; set; }

        public string? TenTinhTrang { get; set; }

        public virtual ICollection<Nguoidung> Nguoidung { get; set;} = new List<Nguoidung>();
    }
}
