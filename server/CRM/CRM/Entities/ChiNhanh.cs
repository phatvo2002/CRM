namespace CRM.Entities
{
    public class ChiNhanh
    {
        public Guid Id { get; set; }
        public string? TenChiNhanh { get; set; }
        public int SoThuTu { get; set; }
        public string? DiaChi { get; set; }
        public string? MoTa { get ; set; }  
        public bool? IsChiNhanhTong { get; set; }   
        public virtual ICollection<PhongBan> PhongBans { get; set; } = new List<PhongBan>();   
        public virtual ICollection<Nguoidung> Nguoidung { get; set;} = new List<Nguoidung>();
    }
}
