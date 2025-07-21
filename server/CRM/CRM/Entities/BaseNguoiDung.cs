namespace CRM.Entities
{
    public partial class BaseNguoiDung
    {
        public DateTime? CreateAt { get; set; }
        public Guid? NguoiDungId { get; set; }
        public Guid? PhongBanId { get; set; }
        public DateTime? UpdateAt { get; set; }
        public string? UpdateUser { get; set; }  
        public DateTime? DeleteAt { get; set; }
        public string? DeleteUser { get; set; }
        public bool? IsDeleted { get; set; }
        public virtual Nguoidung? Nguoidung { get; set; }
        public virtual PhongBan? PhongBan { get; set; }
    }
}
