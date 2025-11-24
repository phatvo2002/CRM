using Microsoft.EntityFrameworkCore;
using System;

namespace CRM.Entities.StoreProcedure
{
    public partial class AppCrmContext : DbContext
    {

        public AppCrmContext()
        {
        }
        public AppCrmContext(DbContextOptions<AppCrmContext> options)
        : base(options)
        {
            Database.SetCommandTimeout(36000);
        }
        public virtual DbSet<crm_getmenugroup_by_id> crm_getmenugroup_by_id { get; set; }
        public virtual DbSet<sp_CRM_DanhSachKhachHangMucTieu> sp_CRM_DanhSachKhachHangMucTieu { get; set; }
    }
}
