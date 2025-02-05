
namespace CRM.Modal
{
    public class CoHoiModal
    {
        public string? Id { get; set; }
        public string? TenCoHoi { get; set; }
        public decimal? SoTien { get; set; }
        public int? TiLeThanhCong { get; set; }
        public decimal? DoanhSoKyVong { get; set; }
        public DateTime? NgayKyVongKetThuc { get; set; }
        public string? MaKhachHang { get; set; } = null;
        public string? MaLienHe { get; set; } = null;
        public int? MaLoaiHangHoa { get; set; } = null;
        public int? MaLoaiCoHoi { get; set; } = null;
        public Guid? MaGiaiDoanBanHang { get; set; } = null;
        public int? MaNguonGocKhachHang { get; set; } = null;
        public string? DiaChi { get; set; }
        public DateTime? DeleteAt { get; set; }
        public DateTime? UpdateAt { get; set; }

        public List<HangHoaQuanTamModal>? HangHoaQuanTams { get; set; }
    }
}
