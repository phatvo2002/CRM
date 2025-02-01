namespace CRM.Entities
{
    public class ChiTietKetQua
    {
        public Guid? Id { get; set; }
        public decimal? SoTien { get; set; }
        public DateTime NgayKyVongKetThuc { get; set; }
        public string? MaCoHoi { get; set; }
        public Guid? MaGiaiDoan { get; set; }
        public int? MaLyDo {  get; set; }
        public virtual CoHoi? CoHoi { get; set; }
        public virtual GiaiDoanBanHang? GiaiDoanBanHang { get; set; }
        public virtual LyDo? LyDo { get; set; }
    }
}
