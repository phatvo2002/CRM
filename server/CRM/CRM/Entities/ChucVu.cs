namespace CRM.Entities
{
    public  partial class ChucVu
    {
        public Guid Id { get; set; }

        public string? TenChucVu {  get; set; }

        public string? MoTa {  get; set; }  

        public virtual ICollection<Nguoidung> Nguoidung { get; set;} = new List<Nguoidung>();

        public virtual ICollection<MenuRole> MenuRole { get; set; } = new List<MenuRole>();

    }
}
