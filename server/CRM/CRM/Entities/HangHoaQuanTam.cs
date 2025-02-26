namespace CRM.Entities
{
    public partial class HangHoaQuanTam
    {
        public Guid Id { get; set; }
        public string? MaHangHoaId { get; set; }
        //public string? TenHangHoa { get; set; } // dòng mới
        public Guid? KhachHangTiemNangId { get; set; }
        public string? KhachHangId { get; set; }
        public string? CoHoiId { get; set; }
        public Guid? BaoGiaId { get; set; } // đổi string thành guid 
        public string? HoaDonId { get; set; }
        public decimal? DonGia { get; set; }
        public int? SoLuong { get; set; }
        public int? ThueSuat { get; set; }
        public decimal? TienThue { get; set; }
        public decimal? ChiecKhauDonHang { get; set; }
        public decimal? ThanhTien { get; set; }
        public decimal? TongTien { get; set; }
        public virtual HangHoa? HangHoa { get; set; }
    }
}
