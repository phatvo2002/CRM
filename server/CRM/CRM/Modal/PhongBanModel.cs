namespace CRM.Modal
{
    public class PhongBanModel
    {
        public Guid Id { get; set; }

        public int Stt {  get; set; }
        public string? MaQuanLy { get; set; }
        public string? TenPhongban { get; set; }

        public string? MoTa { get; set; }

        public bool IsAcTive { get; set; } 
    }
}
