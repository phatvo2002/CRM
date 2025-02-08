namespace CRM.DTO
{
    public class CoHoiDTO
    {
        public string? Id { get; set; }
        public string? TenCoHoi { get; set; }
        public decimal? SoTien { get; set; }
        public int? TiLeThanhCong { get; set; }
        public decimal? DoanhSoKyVong { get; set; }
        public DateTime? NgayKyVongKetThuc { get; set; }
        public string? MaKhachHang { get; set; }
        public string? MaLienHe { get; set; }
        public int? MaLoaiHangHoa { get; set; }
        public int? MaLoaiCoHoi { get; set; }
        public Guid? MaGiaiDoanBanHang { get; set; }
        public int? MaNguonGocKhachHang { get; set; }
        public string? DiaChi { get; set; }
        public DateTime? DeleteAt { get; set; }
        public DateTime? UpdateAt { get; set; }
        public DateTime? CreateAt { get; set; }
        public GiaiDoanBanHangDTO? GiaiDoanBanHang { get; set; }
        public NguoiDungDTO? NguoiDung { get; set; }
    }
}
