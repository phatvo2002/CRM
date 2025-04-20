using CRM.DTO;

namespace CRM.Modal
{
    public class ExportDonHangModal
    {
        public DonHangDTO? DonHang { get; set; }
        public List<ExportHangHoaQuanTamDTO>? HangHoas { get; set; }
        public string? Ngay { get; set; }
        public string? Thang { get; set; }
        public string? Nam { get; set; }
        public string? TongTienHang { get; set; }
        public string? TongTienThue { get; set; }
        public string? TongChietKhau { get; set; }
        public string? TongTienThanhToan { get; set; }
        public string? ThoiGianGiaoHang { get; set; }
        public string? ThoiGianThanhToan { get; set; }

    }
}
