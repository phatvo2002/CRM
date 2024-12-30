using Microsoft.AspNetCore.Http.HttpResults;

namespace CRM.Modal
{
    public class BaseModel
    {
        public Guid NguoiDungId { get; set; }
        public Guid PhongBanId { get; set; }
        public DateTime CreateAt { get; set; }
        public bool IsDeleted { get; set; }
    public BaseModel()
    {
        CreateAt = DateTime.UtcNow; 
        IsDeleted = false;         
    }
    }
}
