namespace CRM.Entities
{
    public partial class BaseNguoiDung
    {
        public Guid? NguoiDungId { get; set; }
        public Guid? PhongBanId { get; set; }
        public DateTime? CreateAt { get; set; }
        public DateTime? UpdateAt { get; set; }
        public Guid? NguoiDungUpdate { get; set; }  
        public bool? IsDeleted { get; set; }
        public virtual Nguoidung? Nguoidung { get; set; }
        public virtual PhongBan? PhongBan { get; set; }
    }
}
