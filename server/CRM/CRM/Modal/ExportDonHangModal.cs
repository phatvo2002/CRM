using CRM.DTO;

namespace CRM.Modal
{
    public class ExportDonHangModal
    {
        public DonHangDTO? DonHangDTO { get; set; }
        public List<HangHoaQuanTamDTO>? HangHoas { get; set; }
        public string? Ngay { get; set; }
        public string? Thang { get; set; }
        public string? Nam { get; set; }
    }
}
