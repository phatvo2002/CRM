namespace CRM.Entities
{
    public class TinhTrangKPI
    {
        public int Id { get; set; }
        public string? Name { get; set; }

        public virtual ICollection<MucTieuDoanhSo> MucTieuDoanhSos { get; set; } = new List<MucTieuDoanhSo>();
        public virtual ICollection<KPINhanVien> KPINhanViens { get; set; } = new List<KPINhanVien>();
    }
}
