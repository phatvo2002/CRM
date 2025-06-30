namespace CRM.Entities
{
    public class Menu
    {
        public Guid  Id { get; set; }
        public string Name { get; set; } = null!;
        public string? Url { get; set; }
        public string? Icon { get; set; } 
        public int? OrderNumber {  get; set; }
        public bool? IsActive { get; set; }
        public Guid? ParentId { get; set; }
        public virtual ICollection<Menu> MenuChildrent { get; set; } = new List<Menu>();
        public virtual ICollection<MenuRole> MenuRoles { get; set; } = new List<MenuRole>();
        public virtual Menu? Parent { get; set; }
    }
}
