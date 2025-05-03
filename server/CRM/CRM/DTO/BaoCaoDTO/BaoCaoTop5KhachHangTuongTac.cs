namespace CRM.DTO.BaoCaoDTO
{
    public class BaoCaoTop5KhachHangTuongTac
    {
        public Guid Id { get; set; }
        public int STT { get; set; }
        public string? TenKhachHang { get; set; }
        public string? TenHoatDong { get; set; }
        public DateTime ThoiGian { get; set; }
        public string? TrangThaiThucHien { get; set; }
    }
}
