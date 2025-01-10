namespace CRM.DTO
{
    public class GiaiDoanBanHangDTO
    {
        public Guid Id { get; set; }
        public int? Stt { get; set; }
        public string? TenGiaiDoan { get; set; }
        public string? TiLeThanhCong { get; set; }
        public int? MaLoaiDuBao { get; set; }
        public int? MaPhanLoaiDuBao { get; set; }
    }
}
