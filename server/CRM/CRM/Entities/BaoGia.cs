namespace CRM.Entities
{
    public class BaoGia : BaseNguoiDung
    {
        public Guid Id { get; set; }
        public string? TenBaoGia { get; set; }
        public DateTime? NgayBaoGia { get; set; }
        public DateTime? NgayHetHan { get; set; }
        public string? DiaChi { get; set; }
        public string? MaSoThue { get; set; }
        public string? MoTa { get; set; } // dòng mới 
        public decimal? TongTien { get; set; }
        public int? MaTinhTrangBaoGia { get; set; }
        public string? MaCoHoi { get; set; }
        public string? MaKhachHang { get; set; }
        public virtual TinhTrangBaoGia? TinhTrangBaoGia { get; set; }
        public virtual CoHoi? CoHoi { get; set; }
        public virtual KhachHangMucTieu? KhachHangMucTieu { get; set; }
        public ICollection<ChiTietBaoGia>? chiTietBaoGias { get; set; } = new List<ChiTietBaoGia>();

    }
}
