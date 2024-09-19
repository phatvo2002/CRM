namespace CRM.DTO
{
    public class MenuRoleDTO
    {
        public Guid MenuId { get; set; }

        public Guid GroupId { get; set; }

        public bool? Xem {  get; set; }

        public bool? Them { get; set; }

        public bool? Xoa { get; set; }

        public bool? Sua { get; set; }

        public virtual MenuDTO Menu { get; set; } = null!;
    }
}
