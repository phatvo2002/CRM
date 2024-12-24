namespace CRM.DTO
{
    public class CuocGoiDTO
    {
        public Guid Id { get; set; }
        public string? TieuDe { get; set; }
        public DateTime? NgayBatDau { get; set; }
        public int? SoPhutGoi { get; set; }
        public int? SoGiayGoi { get; set; }
        public bool? IsHoanThanh { get; set; }
        public Guid? LoaiCuocGoiId { get; set; }
        public Guid? KhachHangTiemNangId { get; set; }
        public Guid? KetQuaCuocGoiId { get; set; }
    }
}
