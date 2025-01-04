namespace CRM.Modal
{
    public class BaseModel
    {
        public Guid NguoiDungId { get; set; }
        public Guid PhongBanId { get; set; }
        public DateTime CreateAt { get; set; }
        public bool IsDeleted { get; set; }
        public BaseModel(IHttpContextAccessor httpContextAccessor)
        {
            var user = httpContextAccessor.HttpContext?.User;

            if (user != null)
            {
                NguoiDungId = Guid.Parse(user.FindFirst("UserId")?.Value ?? Guid.Empty.ToString());
                PhongBanId = Guid.Parse(user.FindFirst("PhongBan")?.Value ?? Guid.Empty.ToString());
            }

            CreateAt = DateTime.UtcNow;
            IsDeleted = false;
        }
    }
}
