namespace CRM.DTO
{
    public class ChiNhanhDTO
    {
        public Guid Id { get; set; }
        public string? TenChiNhanh { get; set; }
        public string? DiaChi { get; set; }
        public string? MoTa { get; set; }
        public bool? IsChiNhanhTong { get; set; }
        public int SoThuTu { get; set; }
    }
}
