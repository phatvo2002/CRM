namespace CRM.Entities
{
    public class GiaiDoanBanHang
    {
        public Guid Id { get; set; }
        public int? Stt { get; set; }
        public string? TenGiaiDoan { get; set; }
        public string? TiLeThanhCong { get; set; }
        public int? MaLoaiDuBao { get; set; }
        public int? MaPhanLoaiDuBao { get; set; }
        public virtual LoaiDuBao? LoaiDuBao { get; set; }
        public virtual PhanLoaiDuBao? PhanLoaiDuBao { get; set; }

    }
}
