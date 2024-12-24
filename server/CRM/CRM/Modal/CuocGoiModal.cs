namespace CRM.Modal
{
    public class CuocGoiModal
    {
        public Guid Id { get; set; }
        public string? TieuDe { get; set; }
        public string? MoTa { get; set; }
        public DateTime? NgayBatDau { get; set; }
        public int? SoPhutGoi { get; set; }
        public int? SoGiayGoi { get; set; }
        public bool? IsHoanThanh { get; set; }
        public Guid? LoaiCuocGoiId { get; set; }
        public Guid? KhachHangTiemNangId { get; set; }
        public Guid? KetQuaCuocGoiId { get; set; }
    }
}
