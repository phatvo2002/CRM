namespace CRM.Entities
{
    public class KPINhanVien : BaseNguoiDung
    {
        public Guid Id { get; set; }
        public int Thang { get; set; }
        public int Nam { get; set; }
        public decimal MucTieuDoanhSo { get; set; }
        public decimal DoanhSoThucTe { get; set; }
        public decimal MucDoHoanThanh { get; set; }
        public string? GhiChu { get; set; }

    }
}
