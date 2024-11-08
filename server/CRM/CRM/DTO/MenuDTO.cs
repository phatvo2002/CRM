namespace CRM.DTO
{
    public class MenuDTO
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = null!;

        public string? Url { get; set; }

        public string? Icon { get; set; }

        public int? OrderNumber { get; set; }

        public bool? IsActive { get; set; }
    }
}
