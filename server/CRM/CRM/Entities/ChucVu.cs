namespace CRM.Entities
{
    public  partial class ChucVu
    {
        public Guid Id { get; set; }

        public string? TenChucVu {  get; set; }

        public virtual ICollection<Nguoidung> Nguoidung { get; set;} = new List<Nguoidung>();
    }
}
