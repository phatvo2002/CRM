namespace CRM.Modal
{
    public class ThongBaoModal
    {
        public Guid Id { get; set; }
        public string? TieuDe { get; set; }
        public string? NoiDung { get; set; }
        public string? Type { get; set; }
        public string? DuongDan { get; set; }
        public bool? IsRead { get; set; }
        public bool? IsDelete { get; set; }
        public DateTime? CreateAt { get; set; }
        public Guid? NguoiDungId { get; set; }
    }
}
