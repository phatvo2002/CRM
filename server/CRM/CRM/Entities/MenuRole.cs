namespace CRM.Entities
{
    public class MenuRole
    {
        public Guid MenuId { get; set; }

        public Guid GroupId { get; set; }

        public bool? Xem {  get; set; }
        public bool? Them { get; set; }

        public bool? Xoa { get; set; }

        public bool? Sua { get; set; }

        public virtual Menu? Menu { get; set; }

        public virtual ChucVu? ChucVu { get; set; }
       
    }
}
