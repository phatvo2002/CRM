namespace CRM.Modal
{
    public class BaseModel
    {
        public Guid NguoiDungId { get; set; }
        public Guid PhongBanId { get; set; }
        public DateTime CreateAt { get; set; }
        public bool IsDeleted { get; set; }

        private readonly IHttpContextAccessor? _httpContextAccessor;

        public BaseModel() : this(null) 
        {
        }

        public BaseModel(IHttpContextAccessor? httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;

            if (_httpContextAccessor?.HttpContext?.User != null)
            {
                var user = _httpContextAccessor.HttpContext.User;
                NguoiDungId = Guid.Parse(user.FindFirst("UserId")?.Value ?? Guid.Empty.ToString());
                PhongBanId = Guid.Parse(user.FindFirst("PhongBan")?.Value ?? Guid.Empty.ToString());
            }

            CreateAt = DateTime.UtcNow;
            IsDeleted = false;
        }
    }

}
