namespace CRM.DTO
{
    public class BaoGiaDTO
    {
        public Guid Id { get; set; }
        public string? TenBaoGia { get; set; }
        public DateTime? NgayBaoGia { get; set; }
        public DateTime? NgayHetHan { get; set; }
        public string? DiaChi { get; set; }
        public string? MaSoThue { get; set; }
        public decimal? TongTien { get; set; }
        public int? MaTinhTrangBaoGia { get; set; }
        public string? MaCoHoi { get; set; }
        public string? MaKhachHang { get; set; }
    }
}
