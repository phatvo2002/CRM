namespace CRM.Modal
{
    public class BaseModel
    {
        public Guid NguoiDungId { get; set; }
        public Guid PhongBanId { get; set; }

        public DateTime CreateAt { get; set; }

        public bool IsDeleted { get; set; }
    }
}
