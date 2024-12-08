namespace CRM.Entities
{
    public partial class KetQuaCuocGoi
    {
        public Guid Id { get; set; }
        public string?  Name { get; set; }
        public virtual ICollection<CuocGoi> CuocGois { get; set; } = new List<CuocGoi>();
    }
}
