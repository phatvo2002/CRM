namespace CRM.Entities
{
    public partial class CuocGoi : BaseNguoiDung
    {
        public Guid Id { get; set; }
        public string? TieuDe {  get; set; }
        public DateTime NgayBatDau { get; set; }
        public int? SoPhutGoi { get; set; }
        public int? SoGiayGoi { get; set; }
        public bool IsHoanThanh {  get; set; }
        public Guid LoaiCuocGoiId { get; set; }
        public Guid KhachHangTiemNangId { get; set; }
        public virtual LoaiCuocGoi? LoaiCuocGoi { get;set; }
        public virtual KhachHangTiemNang? KhachHangTiemNang { get; set; }
    }
}
