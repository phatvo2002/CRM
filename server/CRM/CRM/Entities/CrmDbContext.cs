using Microsoft.EntityFrameworkCore;

namespace CRM.Entities
{
    public partial class CrmDbContext : DbContext
    {
        public CrmDbContext()
        {

        }

        public CrmDbContext(DbContextOptions<CrmDbContext> options) : base(options) { 

        }

        public virtual DbSet<Nguoidung> Nguoidungs { get; set; }  
        
        public virtual DbSet<PhongBan> PhongBans { get; set; }

        public virtual DbSet<ChucVu> ChucVus { get; set; }

        public virtual  DbSet<TinhTrang> TinhTrangs { get; set; }

        public virtual DbSet<Menu> Menus { get; set; }

        public virtual DbSet<MenuRole> MenuRoles { get; set; }

   
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
      => optionsBuilder.UseSqlServer("Server=tcp:vodangphat2024.database.windows.net;Initial Catalog=CRM;Persist Security Info=False;User ID=vodangphat2024;Password=crm@2024;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");


        protected override void OnModelCreating (ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ChucVu>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_ChucVu");

                entity.ToTable("ChucVu");

                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e=> e.TenChucVu).HasMaxLength(50);
                entity.Property(e => e.MoTa).HasMaxLength(300);

            });

            modelBuilder.Entity<Menu>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_menu");

                entity.ToTable("Menu");

                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e=> e.Name).HasMaxLength(50);
                entity.Property(e=> e.Url).HasMaxLength(50);
                entity.Property(e=> e.Icon).HasMaxLength(50);
                entity.Property(e => e.IsActive).HasColumnType("bit");
                entity.Property(e => e.OrderNumber);
            });

            modelBuilder.Entity<MenuRole>(entity =>
            {
                entity.HasKey(e => new { e.MenuId, e.GroupId });
                entity.ToTable("Menu_Group");

                entity.Property(e => e.Xem);
                entity.Property(e => e.Them);
                entity.Property(e => e.Sua);
                entity.Property(e => e.Xoa);

                entity.HasOne(d => d.ChucVu).WithMany(p => p.MenuRole)
              .HasForeignKey(d => d.GroupId)
              .OnDelete(DeleteBehavior.ClientSetNull)
              .HasConstraintName("FK_Menu_Role_ChucVu");

                entity.HasOne(d => d.Menu).WithMany(p => p.MenuRoles)
                    .HasForeignKey(d => d.MenuId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Menu_Role_Menu");
            });
       
            modelBuilder.Entity<TinhTrang>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_TinhTrang");
                entity.ToTable("TinhTrang");
                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.TenTinhTrang).HasMaxLength(50);
            });
            modelBuilder.Entity<PhongBan>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_PhongBan");
                entity.ToTable("PhongBan");
                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.TenPhongBan).HasMaxLength(50);
            });
            modelBuilder.Entity<Nguoidung>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_NguoiDung");
                entity.ToTable("NguoiDung");
                entity.Property(e => e.HoVaDem).HasMaxLength(50);
                entity.Property(e=>e.Ten).HasMaxLength(50);
                entity.Property(e=> e.DiaChi).HasMaxLength(100);
                entity.Property(e=> e.SoDienThoai).HasMaxLength(11);
                entity.Property(e=> e.Email).HasMaxLength(50);
                entity.Property(e => e.NgayThuViec).HasColumnType("datetime");
                entity.Property(e => e.NgayBatDauLamViec).HasColumnType("datetime");
                entity.Property(e => e.TaiKhoan).HasMaxLength(50);
                entity.Property(e=> e.MatKhau).HasMaxLength(50);

                entity.Property(e=> e.IsActive);

                entity.Property(e => e.CheckIsTruongPhong);

                entity.Property(e => e.CheckIsGiamDoc);

                entity.HasOne(d => d.ChucVu).WithMany(p => p.Nguoidung)
                      .HasForeignKey(d => d.MaChucVu)
                      .OnDelete(DeleteBehavior.ClientSetNull)
                      .HasConstraintName("FK_ChucVu_NguoiDung");

                entity.HasOne(d => d.PhongBan).WithMany(p => p.Nguoidung)
                      .HasForeignKey(d => d.MaPhongBan)
                      .HasConstraintName("FK_PhongBan_NguoiDung");
                entity.HasOne(d => d.TinhTrang).WithMany(p => p.Nguoidung)
                      .HasForeignKey(d => d.MaTinhTrang)
                      .HasConstraintName("FK_TinhTrang_NguoiDung");
            });
        }
        




    }
}
