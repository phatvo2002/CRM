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
 
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
      => optionsBuilder.UseSqlServer("Server=MSI\\SQLEXPRESS;Database=CRM;Integrated Security=True;Encrypt=True;Trusted_Connection=True;TrustServerCertificate=true;Connection Timeout=1000;");


        protected override void OnModelCreating (ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ChucVu>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_ChucVu");

                entity.ToTable("ChucVu");

                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e=> e.TenChucVu).HasMaxLength(50);

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
