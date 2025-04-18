using CRM.DTO;

namespace CRM.Modal
{
    public class ExportBaoGiaModal
    {
        public string? Ngay { get; set; }
        public string? Thang { get; set; }
        public string? Nam { get; set; }
        public BaoGiaDTO? BaoGia { get; set; }
        public List<ExportHangHoaQuanTamDTO>? HangHoaQuanTam { get; set; }
        public NguoiDungExportDTO? NguoiDung { get; set; }
        public decimal TongTien { get; set; }
    }
}
