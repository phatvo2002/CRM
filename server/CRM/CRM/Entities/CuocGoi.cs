namespace CRM.Entities
{
    public partial class CuocGoi : BaseNguoiDung
    {
        public Guid Id { get; set; }
        public string? TieuDe {  get; set; }
        public string? MoTa { get; set; }
        public DateTime? NgayBatDau { get; set; }
        public int? SoPhutGoi { get; set; }
        public int? SoGiayGoi { get; set; }
        public bool? IsHoanThanh {  get; set; }
        public Guid? LoaiCuocGoiId { get; set; }
        public Guid? KhachHangTiemNangId { get; set; }
        public Guid? KetQuaCuocGoiId { get; set; }
        public string? KhachHangMucTieuId {  get; set; }
        public virtual LoaiCuocGoi? LoaiCuocGoi { get;set; }
        public virtual KetQuaCuocGoi? KetQuaCuocGoi { get; set; }
        public virtual KhachHangTiemNang? KhachHangTiemNang { get; set; }
        public virtual KhachHangMucTieu? KhachHangMucTieu { get; set; }
    }
}
