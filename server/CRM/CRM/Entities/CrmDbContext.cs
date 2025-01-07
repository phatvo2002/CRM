using Microsoft.EntityFrameworkCore;

namespace CRM.Entities
{
    public partial class CrmDbContext : DbContext
    {
        public CrmDbContext()
        {

        }

        public CrmDbContext(DbContextOptions<CrmDbContext> options) : base(options)
        {

        }

        public virtual DbSet<Nguoidung> Nguoidungs { get; set; }

        public virtual DbSet<PhongBan> PhongBans { get; set; }

        public virtual DbSet<ChucVu> ChucVus { get; set; }

        public virtual DbSet<TinhTrang> TinhTrangs { get; set; }

        public virtual DbSet<Menu> Menus { get; set; }

        public virtual DbSet<MenuRole> MenuRoles { get; set; }

        public virtual DbSet<KhachHangTiemNang> KhachHangTiemNangs { get; set; }

        public virtual DbSet<PhongBanKhachHang> PhongBanKhachHangs { get; set; }
        public virtual DbSet<NguonGocKhachHang> NguonGocKhachHangs { get; set; }

        public virtual DbSet<LoaiTiemNang> LoaiTiemNangs { get; set; }
        public virtual DbSet<LoaiHinhNgheNghiep> LoaiHinhNgheNghieps { get; set; }

        public virtual DbSet<NganhNghe> NganhNghes { get; set; }
        public virtual DbSet<LinhVucNgheNghiep> LinhVucNgheNghieps { get; set; }

        public virtual DbSet<DoanhThu> DoanhThus { get; set; }

        //Hoạt động 
        public virtual DbSet<CuocGoi> CuocGois { get; set; }
        public virtual DbSet<LoaiCuocGoi> LoaiCuocGois { get; set; }
        public virtual DbSet<LichHen> LichHens { get; set; }
        public virtual DbSet<TrangThaiThucHien> TrangThaiThucHiens { get; set; }
        public virtual DbSet<NhiemVu> NhiemVus { get; set; }
        public virtual DbSet<MucDoUuTien> MucDoUuTiens { get; set; }
        public virtual DbSet<KetQuaCuocGoi> KetQuaCuocGois { get; set; }

        // Hàng hóa
        public virtual DbSet<HangHoa> HangHoas { get; set; }
        public virtual DbSet<LoaiHangHoa> LoaiHangHoas { get; set; }
        public virtual DbSet<DonViTinh> DonViTinhs { get; set; }
        public virtual DbSet<HangHoaQuanTam> HangHoaQuanTams { get; set; }

        // Khách hàng 
        public virtual DbSet<LienHe> LienHes { get; set; }
        public virtual DbSet<KhachHangMucTieu> KhachHangMucTieus { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer("Server=tcp:vodangphat2024.database.windows.net;Initial Catalog=CRM;Persist Security Info=False;User ID=vodangphat2024;Password=crm@2024;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            //Local connection :
            optionsBuilder.UseSqlServer("Server=MSI\\SQLEXPRESS;Database=CRM;Integrated Security=True;Encrypt=True;Trusted_Connection=True;TrustServerCertificate=true;Connection Timeout=1000;");
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ChucVu>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_ChucVu");

                entity.ToTable("ChucVu");

                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.TenChucVu).HasMaxLength(50);
                entity.Property(e => e.MoTa).HasMaxLength(300);

            });

            modelBuilder.Entity<Menu>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_menu");

                entity.ToTable("Menu");

                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.Name).HasMaxLength(50);
                entity.Property(e => e.Url).HasMaxLength(50);
                entity.Property(e => e.Icon).HasMaxLength(50);
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
                entity.Property(e => e.Ten).HasMaxLength(50);
                entity.Property(e => e.DiaChi).HasMaxLength(100);
                entity.Property(e => e.SoDienThoai).HasMaxLength(11);
                entity.Property(e => e.Email).HasMaxLength(50);
                entity.Property(e => e.NgayThuViec).HasColumnType("datetime");
                entity.Property(e => e.NgayBatDauLamViec).HasColumnType("datetime");
                entity.Property(e => e.TaiKhoan).HasMaxLength(50);
                entity.Property(e => e.MatKhau).HasMaxLength(50);

                entity.Property(e => e.IsActive);

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
            // Khách hàng tiềm năng 
            modelBuilder.Entity<PhongBanKhachHang>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_PhongBanKhachhang");

                entity.ToTable("PhongBanKhachHang");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.TenPhongban).HasMaxLength(50);

            });
            modelBuilder.Entity<NguonGocKhachHang>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_NguonGocKhachHang");

                entity.ToTable("NguonGocKhachHang");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.TenNguonGoc).HasMaxLength(50);

            });

            modelBuilder.Entity<LoaiTiemNang>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_LoaiTiemNang");

                entity.ToTable("LoaiTiemNang");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.TenLoaiTiemNang).HasMaxLength(50);

            });
            modelBuilder.Entity<LoaiHinhNgheNghiep>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_LoaiHinhNgheNghiep");

                entity.ToTable("LoaiHinhNgheNghiep");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.TenLoaiHinh).HasMaxLength(50);

            });
            modelBuilder.Entity<LinhVucNgheNghiep>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_LinhVucNgheNghiep");

                entity.ToTable("LinhVucNgheNghiep");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.TenLinhVuc).HasMaxLength(50);

            });
            modelBuilder.Entity<NganhNghe>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_NganhNghe");

                entity.ToTable("NganhNghe");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.TenNganhNghe).HasMaxLength(50);
                entity.HasOne(d => d.LinhVucNgheNghiep).WithMany(p => p.NganhNghes)
                      .HasForeignKey(d => d.MaLinhVucNgheNghiep)
                      .OnDelete(DeleteBehavior.ClientSetNull)
                      .HasConstraintName("FK_NganhNghe_LinhVucNgheNghiep");

            });
            modelBuilder.Entity<DoanhThu>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_DoanhThu");

                entity.ToTable("DoanhThu");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.TenDoanhThu).HasMaxLength(50);

            });
            modelBuilder.Entity<KhachHangTiemNang>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_KhachHangTiemNang");

                entity.ToTable("KhachHangTiemNang");

                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.TenKhachHang).HasMaxLength(50);
                entity.Property(e => e.SoDienThoaiDiDong).HasMaxLength(11);
                entity.Property(e => e.SoDienThoaiCoQuan).HasMaxLength(11);
                entity.Property(e => e.ChucDanh).HasMaxLength(50);
                entity.Property(e => e.SoZalo).HasMaxLength(11);
                entity.Property(e => e.EmailCoQuan).HasMaxLength(50);
                entity.Property(e => e.EmailCaNhan).HasMaxLength(50);
                entity.Property(e => e.TenToChuc).HasMaxLength(50);
                entity.Property(e => e.MaSoThue).HasMaxLength(20);
                entity.Property(e => e.NgayThanhLap).HasColumnType("date");
                entity.Property(e => e.DiaChi).HasMaxLength(100);
                entity.Property(e => e.ThongTinMoTa).HasMaxLength(300);
                entity.Property(e => e.IsDungChung).HasColumnType("bit");
                entity.Property(e => e.IsDeleted).HasColumnType("bit");
                entity.Property(e => e.CreateAt).HasColumnType("datetime");
                entity.HasOne(d => d.Nguoidung).WithMany(p => p.KhachHangTiemNangs)
                   .HasForeignKey(d => d.NguoiDungId)
                   .OnDelete(DeleteBehavior.ClientSetNull)
                   .HasConstraintName("FK_NguoiDung_KhachHangTiemNang");
                entity.HasOne(d => d.PhongBan).WithMany(p => p.KhachHangTiemNangs)
                   .HasForeignKey(d => d.PhongBanId)
                   .OnDelete(DeleteBehavior.ClientSetNull)
                   .HasConstraintName("FK_PhongBan_KhachHangTiemNang");
                entity.HasOne(d => d.PhongBanKhachHang).WithMany(p => p.KhachHangTiemNangs)
                 .HasForeignKey(d => d.MaPhongbanKhachHang)
                 .OnDelete(DeleteBehavior.ClientSetNull)
                 .HasConstraintName("FK_PhongBanKhachhang_KhachHangTiemNang");
                entity.HasOne(d => d.NguonGocKhachHang).WithMany(p => p.KhachHangTiemNangs)
                 .HasForeignKey(d => d.MaNguonGocKhachHang)
                 .OnDelete(DeleteBehavior.ClientSetNull)
                 .HasConstraintName("FK_NguonGocKhachHang_KhachHangTiemNang");
                entity.HasOne(d => d.LoaiTiemNang).WithMany(p => p.KhachHangTiemNangs)
                  .HasForeignKey(d => d.MaLoaiTiemNang)
                  .OnDelete(DeleteBehavior.ClientSetNull)
                  .HasConstraintName("FK_LoaiTiemNang_KhachHangTiemNang");
                entity.HasOne(d => d.LoaiHinhNgheNghiep).WithMany(p => p.KhachHangTiemNangs)
                  .HasForeignKey(d => d.MaLoaiHinhNgheNghiep)
                  .OnDelete(DeleteBehavior.ClientSetNull)
                  .HasConstraintName("FK_LoaiHinhNgheNghiep_KhachHangTiemNang");
                entity.HasOne(d => d.NganhNghe).WithMany(p => p.KhachHangTiemNangs)
                 .HasForeignKey(d => d.MaNganhNghe)
                 .OnDelete(DeleteBehavior.ClientSetNull)
                 .HasConstraintName("FK_NganhNghe_KhachHangTiemNang");
                entity.HasOne(d => d.LinhVucNgheNghiep).WithMany(p => p.KhachHangTiemNangs)
                 .HasForeignKey(d => d.MaLinhVuc)
                 .OnDelete(DeleteBehavior.ClientSetNull)
                 .HasConstraintName("FK_LinhVuc_KhachHangTiemNang");
                entity.HasOne(d => d.DoanhThu).WithMany(p => p.KhachHangTiemNangs)
                .HasForeignKey(d => d.MaDoanhThu)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DoanhThu_KhachHangTiemNang");
            });
            modelBuilder.Entity<LoaiCuocGoi>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_LoaiCuocGoi");

                entity.ToTable("LoaiCuocGoi");

                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.TenCuocGoi).HasMaxLength(50);

            });
            modelBuilder.Entity<TrangThaiThucHien>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_TrangThaiThucHien");

                entity.ToTable("TrangThaiThucHien");

                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.Name).HasMaxLength(50);

            });
            modelBuilder.Entity<KetQuaCuocGoi>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_KetQuaCuocGoi");

                entity.ToTable("KetQuaCuocGoi");

                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.Name).HasMaxLength(50);

            });
            modelBuilder.Entity<CuocGoi>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_CuocGoi");

                entity.ToTable("CuocGoi");

                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.TieuDe).HasMaxLength(50);
                entity.Property(e => e.MoTa).HasMaxLength(100);
                entity.Property(e => e.NgayBatDau).HasColumnType("datetime");
                entity.Property(e => e.SoPhutGoi).HasColumnType("int");
                entity.Property(e => e.SoGiayGoi).HasColumnType("int");
                entity.Property(e => e.IsHoanThanh).HasColumnType("bit");
                entity.Property(e => e.IsDeleted).HasColumnType("bit");
                entity.Property(e => e.CreateAt).HasColumnType("datetime");
                entity.HasOne(d => d.LoaiCuocGoi).WithMany(p => p.CuocGois)
               .HasForeignKey(d => d.LoaiCuocGoiId)
               .OnDelete(DeleteBehavior.ClientSetNull)
               .HasConstraintName("FK_LoaiCuocGoi_CuocGoi");
                entity.HasOne(d => d.KhachHangTiemNang).WithMany(p => p.CuocGois)
                .HasForeignKey(d => d.KhachHangTiemNangId)
               .OnDelete(DeleteBehavior.ClientSetNull)
               .HasConstraintName("FK_KHTiemNang_CuocGoi");
                entity.HasOne(d => d.KhachHangMucTieu).WithMany(p => p.CuocGois)
              .HasForeignKey(d => d.KhachHangMucTieuId)
             .OnDelete(DeleteBehavior.ClientSetNull)
             .HasConstraintName("FK_KHMucTieu_CuocGoi");
                entity.HasOne(d => d.Nguoidung).WithMany(p => p.CuocGois)
             .HasForeignKey(d => d.NguoiDungId)
             .OnDelete(DeleteBehavior.ClientSetNull)
             .HasConstraintName("FK_NguoiDung_CuocGoi");
                entity.HasOne(d => d.PhongBan).WithMany(p => p.CuocGois)
             .HasForeignKey(d => d.PhongBanId)
             .OnDelete(DeleteBehavior.ClientSetNull)
             .HasConstraintName("FK_PhongBan_CuocGoi");
                entity.HasOne(d => d.KetQuaCuocGoi).WithMany(p => p.CuocGois)
        .HasForeignKey(d => d.KetQuaCuocGoiId)
        .OnDelete(DeleteBehavior.ClientSetNull)
        .HasConstraintName("FK_KetQuaCuocGoi_CuocGoi");
            });
            modelBuilder.Entity<LichHen>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_LichHen");

                entity.ToTable("LichHen");

                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.TieuDe).HasMaxLength(50);
                entity.Property(e => e.MoTa).HasMaxLength(50);
                entity.Property(e => e.NgayBatDau).HasColumnType("date");
                entity.Property(e => e.NgayKetThuc).HasColumnType("date");
                entity.Property(e => e.DiaDiem).HasMaxLength(50);
                entity.Property(e => e.IsDeleted).HasColumnType("bit");
                entity.Property(e => e.CreateAt).HasColumnType("datetime");
                entity.HasOne(d => d.TrangThaiThucHien).WithMany(p => p.LichHens)
                 .HasForeignKey(d => d.TrangThaiThucHienId)
                 .OnDelete(DeleteBehavior.ClientSetNull)
                  .HasConstraintName("FK_TrangThaiThucHien_LichHen");
                entity.HasOne(d => d.KhachHangTiemNang).WithMany(p => p.LichHens)
               .HasForeignKey(d => d.KhachHangTiemNangId)
               .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_KhachHangTiemNang_LichHen");
                entity.HasOne(d => d.KhachHangMucTieu).WithMany(p => p.LichHens)
          .HasForeignKey(d => d.KhachHangMucTieuId)
         .OnDelete(DeleteBehavior.ClientSetNull)
         .HasConstraintName("FK_KHMucTieu_LichHen");
                entity.HasOne(d => d.Nguoidung).WithMany(p => p.LichHens)
           .HasForeignKey(d => d.NguoiDungId)
           .OnDelete(DeleteBehavior.ClientSetNull)
           .HasConstraintName("FK_NguoiDung_LichHen");
                entity.HasOne(d => d.PhongBan).WithMany(p => p.LichHens)
             .HasForeignKey(d => d.PhongBanId)
             .OnDelete(DeleteBehavior.ClientSetNull)
             .HasConstraintName("FK_PhongBan_LichHen");

            });


            modelBuilder.Entity<MucDoUuTien>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_MucDoUuTien");

                entity.ToTable("MucDoUuTien");

                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.Name).HasMaxLength(50);

            });

            modelBuilder.Entity<NhiemVu>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_NhiemVu");

                entity.ToTable("NhiemVu");

                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.TieuDe).HasMaxLength(100);
                entity.Property(e => e.MoTa).HasMaxLength(300);
                entity.Property(e => e.HanHoanThanh).HasColumnType("datetime");
                entity.HasOne(d => d.TrangThaiThucHien).WithMany(r => r.NhiemVus).
                HasForeignKey(r => r.TrangThaiThucHienId).
                OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TrangThaiThucHien_NhiemVu");
                entity.HasOne(d => d.MucDoUuTien).WithMany(r => r.NhiemVus)
                .HasForeignKey(r => r.MucDoUuTienId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MucDoUuTien_NhiemVu");
                entity.HasOne(d => d.KhachHangTiemNang).WithMany(r => r.NhiemVus)
                .HasForeignKey(r => r.KhachHangTiemNangId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_KhachHangTiemNang_NhiemVu");
                entity.HasOne(d => d.KhachHangMucTieu).WithMany(r => r.NhiemVus)
                .HasForeignKey(r => r.KhachHangMucTieuId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_KhachHangMucTieu_NhiemVu");
                entity.HasOne(d => d.Nguoidung).WithMany(r => r.NhiemVus).HasForeignKey(r => r.NguoiDungId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_NguoiDung_NhiemVu");
                entity.HasOne(d => d.PhongBan).WithMany(r => r.NhiemVus).HasForeignKey(r => r.PhongBanId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PhongBan_NhiemVu");
            });
            // hàng hóa
            modelBuilder.Entity<LoaiHangHoa>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_LoaiHangHoa");

                entity.ToTable("LoaiHangHoa");
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Name).HasMaxLength(50);
            });
            modelBuilder.Entity<HangHoaQuanTam>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_HangHoaQuanTam");
                entity.ToTable("HangHoaQuanTam");
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.MaHangHoaId).HasMaxLength(100);
                entity.Property(e => e.KhachHangTiemNangId).HasColumnType("uniqueidentifier");
                entity.Property(e => e.MaHangHoaId).HasMaxLength(100);
                entity.Property(e => e.CoHoiId).HasMaxLength(100);
                entity.Property(e => e.HoaDonId).HasMaxLength(100);
                entity.Property(e => e.SoLuong).HasColumnType("int");
                entity.Property(e => e.ThanhTien).HasColumnType("decimal");
                entity.Property(e => e.TongTien).HasColumnType("decimal");
                entity.HasOne(d => d.HangHoa).WithMany(r => r.HangHoaQuanTams).HasForeignKey(r => r.MaHangHoaId)
              .OnDelete(DeleteBehavior.ClientSetNull)
              .HasConstraintName("FK_HangHoa_HangHoaQuanTam");
            });
            modelBuilder.Entity<DonViTinh>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_DonViTinh");

                entity.ToTable("DonViTinh");
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Name).HasMaxLength(50);
            });
            modelBuilder.Entity<HangHoa>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_HangHoaId");

                entity.ToTable("HangHoa");
                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.TenHangHoa).HasMaxLength(100);
                entity.Property(e => e.DuongDanHinhAnh).HasMaxLength(100);
                entity.Property(e => e.NguonGoc).HasMaxLength(100);
                entity.Property(e => e.DonGia).HasColumnType("decimal");
                entity.Property(e => e.MoTa).HasMaxLength(100);
                entity.HasOne(d => d.DonViTinh).WithMany(r => r.HangHoas).HasForeignKey(r => r.MaDonViTinh)
               .OnDelete(DeleteBehavior.ClientSetNull)
               .HasConstraintName("FK_DonViTinh_HangHoa");
                entity.HasOne(d => d.LoaiHangHoa).WithMany(r => r.HangHoas).HasForeignKey(r => r.MaLoaiHangHoa)
               .OnDelete(DeleteBehavior.ClientSetNull)
               .HasConstraintName("FK_LoaiHangHoa_HangHoa");
            });

            // bảng liên hệ 
            modelBuilder.Entity<LienHe>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_LienHe");
                entity.ToTable("LienHe");
                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.TenLienHe).HasMaxLength(50);
                entity.Property(e => e.XungHo).HasMaxLength(50);
                entity.Property(e => e.Email).HasMaxLength(50);
                entity.Property(e => e.SoDienThoai).HasMaxLength(11);
                entity.Property(e => e.KhachHangTiemNangId).HasColumnType("uniqueidentifier");
                entity.Property(e => e.KhachHangId).HasMaxLength(100);
                entity.Property(e => e.IsDeleted).HasColumnType("bit");
                entity.Property(e => e.CreateAt).HasColumnType("datetime");
                entity.HasOne(d => d.Nguoidung).WithMany(r => r.LienHes).HasForeignKey(r => r.NguoiDungId)
               .OnDelete(DeleteBehavior.ClientSetNull)
               .HasConstraintName("FK_NguoiDung_LienHe");
                entity.HasOne(d => d.PhongBan).WithMany(r => r.LienHes).HasForeignKey(r => r.PhongBanId)
               .OnDelete(DeleteBehavior.ClientSetNull)
               .HasConstraintName("FK_PhongBan_PhongBan");
            });
            //bảng khách hàng mục tiêu
            modelBuilder.Entity<KhachHangMucTieu>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_KhachHangMucTieu");
                entity.ToTable("KhachHangMucTieu");
                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.TenKhachHang).HasMaxLength(50);
                entity.Property(e => e.TenVietTat).HasMaxLength(50);
                entity.Property(e => e.MaSoThue).HasMaxLength(50);
                entity.Property(e => e.SoDienThoai).HasMaxLength(50);
                entity.Property(e => e.Email).HasMaxLength(50);
                entity.Property(e => e.TaiKhoanNganHang).HasMaxLength(50);
                entity.Property(e => e.NgayThanhLap).HasColumnType("date");
                entity.Property(e => e.Website).HasMaxLength(50);
                entity.Property(e => e.MoTa).HasMaxLength(50);
                entity.Property(e => e.IsDungChung).HasColumnType("bit");
                entity.Property(e => e.IsKhachHangCaNhan).HasColumnType("bit");
                entity.Property(e => e.IsNhaPhanPhoi).HasColumnType("bit");
                entity.Property(e => e.ThongTinHoaDon).HasMaxLength(300);
                entity.Property(e => e.ThongTinGiaoHang).HasMaxLength(300);
                entity.Property(e => e.IsDeleted).HasColumnType("bit");
                entity.Property(e => e.CreateAt).HasColumnType("datetime");
                entity.HasOne(d => d.Nguoidung).WithMany(p => p.KhachHangMucTieus)
                  .HasForeignKey(d => d.NguoiDungId)
                  .OnDelete(DeleteBehavior.ClientSetNull)
                  .HasConstraintName("FK_NguoiDung_KhachHangMucTieu");
                entity.HasOne(d => d.PhongBan).WithMany(p => p.KhachHangMucTieus)
                   .HasForeignKey(d => d.PhongBanId)
                   .OnDelete(DeleteBehavior.ClientSetNull)
                   .HasConstraintName("FK_PhongBan_KhachHangMucTieu");
                entity.HasOne(d => d.PhongBanKhachHang).WithMany(p => p.KhachHangMucTieus)
               .HasForeignKey(d => d.MaPhongbanKhachHang)
               .OnDelete(DeleteBehavior.ClientSetNull)
               .HasConstraintName("FK_PhongBanKhachhang_KhachHangMucTieu");
                entity.HasOne(d => d.NguonGocKhachHang).WithMany(p => p.KhachHangMucTieus)
                 .HasForeignKey(d => d.MaNguonGocKhachHang)
                 .OnDelete(DeleteBehavior.ClientSetNull)
                 .HasConstraintName("FK_NguonGocKhachHang_KhachHangMucTieu");
                entity.HasOne(d => d.LoaiTiemNang).WithMany(p => p.KhachHangMucTieus)
                  .HasForeignKey(d => d.MaLoaiTiemNang)
                  .OnDelete(DeleteBehavior.ClientSetNull)
                  .HasConstraintName("FK_LoaiTiemNang_KhachHangMucTieu");
                entity.HasOne(d => d.LoaiHinhNgheNghiep).WithMany(p => p.KhachHangMucTieus)
                  .HasForeignKey(d => d.MaLoaiHinhNgheNghiep)
                  .OnDelete(DeleteBehavior.ClientSetNull)
                  .HasConstraintName("FK_LoaiHinhNgheNghiep_KhachHangMucTieu");
                entity.HasOne(d => d.NganhNghe).WithMany(p => p.KhachHangMucTieus)
                 .HasForeignKey(d => d.MaNganhNghe)
                 .OnDelete(DeleteBehavior.ClientSetNull)
                 .HasConstraintName("FK_NganhNghe_KhachHangMucTieu");
                entity.HasOne(d => d.LinhVucNgheNghiep).WithMany(p => p.KhachHangMucTieus)
                 .HasForeignKey(d => d.MaLinhVuc)
                 .OnDelete(DeleteBehavior.ClientSetNull)
                 .HasConstraintName("FK_LinhVuc_KhachHangMucTieu");
                entity.HasOne(d => d.DoanhThu).WithMany(p => p.KhachHangMucTieus)
                .HasForeignKey(d => d.MaDoanhThu)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DoanhThu_KhachHangMucTieu");
            });

        }

    }
}
