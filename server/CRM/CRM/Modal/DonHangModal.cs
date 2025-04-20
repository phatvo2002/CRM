namespace CRM.Modal
{
    public class DonHangModal
    {
        public Guid Id { get; set; }
        public string? TenDonHang { get; set; }
        public string? MoTaDonHang { get; set; }
        public DateTime? NgayDatHang { get; set; }
        public decimal SoTienConPhaiThu { get; set; }
        public decimal ThucThuDonHang { get; set; }
        public decimal GiaTriDonHang { get; set; }
        public DateTime? HanThanhToan { get; set; }
        public DateTime? HanGiaoHang { get; set; }
        public DateTime? NgayGhiDoanhSo { get; set; }
        public int MaLoaiDonHang { get; set; }
        public Guid? MaBaoGia { get; set; }
        public string? MaKhachHang { get; set; }
        public string? MaLienHe { get; set; }
        public int? MaTinhTrangDonHang { get; set; }
        public int? MaTinhTrangGhiDoanhSo { get; set; }
        public bool IsGhiDoanhSo { get; set; }
        public string? ThongTinHoaDon { get; set; }
        public string? ThongTinGiaoHang { get; set; }
        public string? PhuongThucThanhToan { get; set; }
        public string? SoTaiKhoanNganHang { get; set; }
        public string? ChuTaiKhoan { get; set; }
        public List<HangHoaQuanTamModal>? HangHoaQuanTam { get; set; }
    }
}
