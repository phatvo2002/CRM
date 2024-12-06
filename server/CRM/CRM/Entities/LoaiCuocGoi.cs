namespace CRM.Entities
{
    public class LoaiCuocGoi
    {
        public Guid Id { get; set; }
        public string? TenCuocGoi { get; set; }

        public virtual ICollection<CuocGoi> CuocGois { get; set; } = new List<CuocGoi>();
    }
}
