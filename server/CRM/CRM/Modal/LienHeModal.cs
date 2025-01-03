
namespace CRM.Modal
{
    public class LienHeModal : BaseModel
    {
        public LienHeModal(IHttpContextAccessor httpContextAccessor) : base(httpContextAccessor)
        {
        }

        public string? Id { get; set; }
        public string? TenLienHe { get; set; }
        public string? XungHo { get; set; }
        public string? Email { get; set; }
        public Guid? KhachHangTiemNangId { get; set; }
        public string? KhachHangId { get; set; }
    }
}
