namespace CRM.Entities
{
    public class ChiTietDonHang
    {
        public Guid Id { get; set; }
        public Guid ChiTietDonHangId { get; set; }
        public Guid? KhachHangId { get; set; }
        public string? MaHangHoa { get; set; }
        public string? TenHangHoa { get; set; }    
        public int SoLuong { get; set; }
        public double DonGia { get; set; }
        public double TienThue { get; set; }
        public double ChietKhau { get; set; }
        public double ThanhTien { get; set; }
        public double TongTien { get; set; }
    }
}
