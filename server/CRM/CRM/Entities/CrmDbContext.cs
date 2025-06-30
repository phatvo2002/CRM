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
        public virtual DbSet<ThongBao> ThongBaos { get; set; }
        public virtual DbSet<PhanLoaiKhachHang> PhanLoaiKhachHangs { get; set; }

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

        // Giai đoạn bán hàng 
        public virtual DbSet<LoaiDuBao> LoaiDuBaos { get; set; }
        public virtual DbSet<PhanLoaiDuBao> PhanLoaiDuBaos { get; set; }
        public virtual DbSet<GiaiDoanBanHang> GiaiDoanBanHangs { get; set; }
        public virtual DbSet<LyDo> LyDos { get; set; }
        public virtual DbSet<ChiTietKetQua> ChiTietKetQuas { get; set; }
        // Cơ hội
        public virtual DbSet<LoaiCoHoi> LoaiCoHois { get; set; }
        public virtual DbSet<CoHoi> CoHois { get; set; }
        // Báo giá
        public virtual DbSet<BaoGia> BaoGias { get; set; }
        public virtual DbSet<TinhTrangBaoGia> TinhTrangBaoGias { get; set; }
        // Đơn hàng
        public virtual DbSet<LoaiDonHang> LoaiDonHangs { get; set; }
        public virtual DbSet<TinhTrangDonHang> TinhTrangDonHangs { get; set; }
        public virtual DbSet<TinhTrangGhiDoanhSo> TinhTrangGhiDoanhSos { get; set; }
        public virtual DbSet<DonHang> DonHangs { get; set; }

        // email
        public virtual DbSet<EmailDaGui> EmailDaGuis { get; set; }

        // kpi 
        public virtual DbSet<MucTieuDoanhSo> MucTieuDoanhSos { get; set; }
        public virtual DbSet<TinhTrangKPI> TinhTrangKPIs { get; set; }
        public virtual DbSet<KPINhanVien> KPINhanViens { get; set; }
        public virtual DbSet<XepLoai> XepLoais { get; set; }

        public virtual DbSet<KhaoSat> KhaoSats { get; set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer("Server=DESKTOP-S9B3N7M;Database=CRM;User Id=sa;Password=abc@123;Encrypt=True;TrustServerCertificate=true;Connection Timeout=1000;");
        //}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ThongBao>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_ThongBao");

                entity.ToTable("ThongBao");

                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.TieuDe).HasMaxLength(100);
                entity.Property(e => e.NoiDung).HasMaxLength(300);
                entity.Property(e => e.Type).HasMaxLength(300);
                entity.Property(e => e.DuongDan).HasMaxLength(300);
                entity.Property(e => e.IsDelete).HasColumnType("bit");
                entity.Property(e => e.CreateAt).HasColumnType("datetime");
                entity.Property(e => e.NguoiDungId).HasColumnType("uniqueidentifier");

            });
            modelBuilder.Entity<ChucVu>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_ChucVu");

                entity.ToTable("ChucVu");

                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.TenChucVu).HasMaxLength(50);
                entity.Property(e => e.MoTa).HasMaxLength(300);

            });
             #region Menu
            modelBuilder.Entity<Menu>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_menu");

                entity.ToTable("Menu");

                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.Name).HasMaxLength(50);
                entity.Property(e => e.Url).HasMaxLength(50);
                entity.Property(e => e.Icon).HasMaxLength(50);
                entity.Property(e => e.ParentId).HasColumnType("uniqueidentifier");
                entity.Property(e => e.IsActive).HasColumnType("bit");
                entity.Property(e => e.OrderNumber);
                entity.HasOne(d => d.Parent).WithMany(p => p.MenuChildrent)
                .HasForeignKey(d => d.ParentId)
                .HasConstraintName("FK_Menu_Menu");
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
            #endregion


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
                entity.Property(e => e.DoanhSoDuKien).HasMaxLength(50);
                entity.Property(e => e.DoanhSoThucTe).HasMaxLength(50);
                entity.Property(e => e.TaiKhoan).HasMaxLength(50);
                entity.Property(e => e.MatKhau).HasMaxLength(50);
                entity.Property(e => e.HinhAnh).HasColumnType("varbinary(MAX)");
                entity.Property(e => e.DisplayName).HasMaxLength(100);
                entity.Property(e => e.Password).HasMaxLength(100);
                entity.Property(e => e.IsActive);
                entity.Property(e => e.IsDelete).HasColumnType("bit");
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
            modelBuilder.Entity<PhanLoaiKhachHang>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_PhanLoaiKhachHang");

                entity.ToTable("PhanLoaiKhachHang");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Name).HasMaxLength(50);

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
                entity.Property(e => e.DeleteAt).HasColumnType("datetime");
                entity.Property(e => e.UpdateAt).HasColumnType("datetime");
                entity.Property(e => e.NguoiDungUpdate).HasColumnType("uniqueidentifier");
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
            #region
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
                entity.Property(e => e.UpdateAt).HasColumnType("datetime");
                entity.Property(e => e.NguoiDungUpdate).HasColumnType("uniqueidentifier");
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
                entity.HasOne(d => d.CoHoi).WithMany(p => p.CuocGois)
             .HasForeignKey(d => d.CoHoiId)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK_CoHoi_CuocGoi");
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
                entity.Property(e => e.UpdateAt).HasColumnType("datetime");
                entity.Property(e => e.NguoiDungUpdate).HasColumnType("uniqueidentifier");
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
                entity.HasOne(d => d.CoHoi).WithMany(p => p.LichHens)
                .HasForeignKey(d => d.CoHoiId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                 .HasConstraintName("FK_CoHoi_LichHen");
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
                entity.Property(e => e.IsThongBao).HasColumnType("bit");
                entity.Property(e => e.HanHoanThanh).HasColumnType("datetime");
                entity.Property(e => e.UpdateAt).HasColumnType("datetime");
                entity.Property(e => e.NguoiDungUpdate).HasColumnType("uniqueidentifier");
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
                entity.HasOne(d => d.CoHoi).WithMany(r => r.NhiemVus)
                .HasForeignKey(r => r.CoHoiId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CoHoi_NhiemVu");
                entity.HasOne(d => d.Nguoidung).WithMany(r => r.NhiemVus).HasForeignKey(r => r.NguoiDungId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_NguoiDung_NhiemVu");
                entity.HasOne(d => d.PhongBan).WithMany(r => r.NhiemVus).HasForeignKey(r => r.PhongBanId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PhongBan_NhiemVu");
            });
            #endregion

            #region Hàng hóa
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
                entity.Property(e => e.TenHangHoa).HasMaxLength(100);
                entity.Property(e => e.KhachHangTiemNangId).HasColumnType("uniqueidentifier");
                entity.Property(e => e.MaHangHoaId).HasMaxLength(100);
                entity.Property(e => e.CoHoiId).HasMaxLength(100);
                entity.Property(e => e.BaoGiaId).HasColumnType("uniqueidentifier");
                entity.Property(e => e.HoaDonId).HasMaxLength(100);
                entity.Property(e => e.SoLuong).HasColumnType("int");
                entity.Property(e => e.ThueSuat).HasColumnType("int");
                entity.Property(e => e.MaDonViTinh).HasColumnType("int");
                entity.Property(e => e.TienThue).HasColumnType("decimal");
                entity.Property(e => e.DonGia).HasColumnType("decimal");
                entity.Property(e => e.ThanhTien).HasColumnType("decimal");
                entity.Property(e => e.TongTien).HasColumnType("decimal");
                entity.HasOne(d => d.HangHoa).WithMany(r => r.HangHoaQuanTams).HasForeignKey(r => r.MaHangHoaId).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_HangHoa_HangHoaQuanTam");
                entity.HasOne(d => d.DonViTinh).WithMany(r => r.HangHoaQuanTams).HasForeignKey(r => r.MaDonViTinh).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_DonViTinh_HangHoaQuanTam");
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
                entity.Property(e => e.SoLuongTon).HasColumnType("integer");
                entity.Property(e => e.DonGia).HasColumnType("decimal");
                entity.Property(e => e.MoTa).HasMaxLength(100);
                entity.HasOne(d => d.DonViTinh).WithMany(r => r.HangHoas).HasForeignKey(r => r.MaDonViTinh)
               .OnDelete(DeleteBehavior.ClientSetNull)
               .HasConstraintName("FK_DonViTinh_HangHoa");
                entity.HasOne(d => d.LoaiHangHoa).WithMany(r => r.HangHoas).HasForeignKey(r => r.MaLoaiHangHoa)
               .OnDelete(DeleteBehavior.ClientSetNull)
               .HasConstraintName("FK_LoaiHangHoa_HangHoa");
            });
            #endregion

            #region Liên hệ
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
                entity.Property(e => e.UpdateAt).HasColumnType("datetime");
                entity.Property(e => e.NguoiDungUpdate).HasColumnType("uniqueidentifier");
                entity.HasOne(d => d.Nguoidung).WithMany(r => r.LienHes).HasForeignKey(r => r.NguoiDungId)
               .OnDelete(DeleteBehavior.ClientSetNull)
               .HasConstraintName("FK_NguoiDung_LienHe");
                entity.HasOne(d => d.PhongBan).WithMany(r => r.LienHes).HasForeignKey(r => r.PhongBanId)
               .OnDelete(DeleteBehavior.ClientSetNull)
               .HasConstraintName("FK_PhongBan_PhongBan");
            });
            #endregion

            #region Khách hàng mục tiêu
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
                entity.Property(e => e.DeleteAt).HasColumnType("datetime");
                entity.Property(e => e.UpdateAt).HasColumnType("datetime");
                entity.Property(e => e.NguoiDungUpdate).HasColumnType("uniqueidentifier");
                entity.Property(e => e.NamGuiMailSinhNhat).HasColumnType("int");
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
                entity.HasOne(d => d.PhanLoaiKhachHang).WithMany(p => p.KhachHangMucTieus)
                .HasForeignKey(d => d.MaPhanLoaiKhachHang)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PhanLoaiKhachHang_KhachHangMucTieu");
            });
            #endregion

            #region  Giai đoạn bán hàng
            modelBuilder.Entity<LoaiDuBao>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_LoaiDuBao");
                entity.ToTable("LoaiDuBao");
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Name).HasMaxLength(50);

            });
            modelBuilder.Entity<PhanLoaiDuBao>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_PhanLoaiDuBao");
                entity.ToTable("PhanLoaiDuBao");
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Name).HasMaxLength(50);

            });
            modelBuilder.Entity<GiaiDoanBanHang>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_GiaiDoanBanHang");
                entity.ToTable("GiaiDoanBanhang");
                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.Stt).HasColumnType("int");
                entity.Property(e => e.TenGiaiDoan).HasMaxLength(100);
                entity.Property(e => e.TiLeThanhCong).HasMaxLength(100);
                entity.HasOne(d => d.LoaiDuBao).WithMany(p => p.GiaiDoanBanHangs)
               .HasForeignKey(d => d.MaLoaiDuBao)
               .OnDelete(DeleteBehavior.ClientSetNull)
               .HasConstraintName("FK_LoaiDuBao_GiaiDoanBanHang");
                entity.HasOne(d => d.PhanLoaiDuBao).WithMany(p => p.GiaiDoanBanHangs)
             .HasForeignKey(d => d.MaPhanLoaiDuBao)
             .OnDelete(DeleteBehavior.ClientSetNull)
             .HasConstraintName("FK_PhanLoaiDuBao_GiaiDoanBanHang");
            });
            modelBuilder.Entity<LyDo>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_LyDo");
                entity.ToTable("LyDo");
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Name).HasMaxLength(50);

            });
            modelBuilder.Entity<ChiTietKetQua>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_ChiTietKetQua");
                entity.ToTable("ChiTietKetQua");
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.SoTien).HasColumnType("decimal");
                entity.Property(e => e.NgayKyVongKetThuc).HasColumnType("datetime");
                entity.HasOne(d => d.CoHoi).WithOne(p => p.ChiTietKetQua)
               .HasForeignKey<ChiTietKetQua>(d => d.MaCoHoi)
               .OnDelete(DeleteBehavior.ClientSetNull)
               .HasConstraintName("FK_CoHoi_ChiTietKetQua");
                entity.HasOne(d => d.GiaiDoanBanHang).WithMany(p => p.ChiTietKetQuas)
            .HasForeignKey(d => d.MaGiaiDoan)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK_GiaiDoanBanHang_ChiTietKetQua");
                entity.HasOne(d => d.LyDo).WithMany(p => p.ChiTietKetQuas)
            .HasForeignKey(d => d.MaLyDo)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK_LyDo_ChiTietKetQua");
            });
            #endregion

            #region Cơ hội
            modelBuilder.Entity<LoaiCoHoi>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_LoaiCoHoi");

                entity.ToTable("LoaiCoHoi");
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Name).HasMaxLength(50);
            });
            modelBuilder.Entity<CoHoi>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_CoHoi");

                entity.ToTable("CoHoi");
                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.TenCoHoi).HasMaxLength(100);
                entity.Property(e => e.SoTien).HasColumnType("decimal");
                entity.Property(e => e.TiLeThanhCong).HasColumnType("interger");
                entity.Property(e => e.NgayKyVongKetThuc).HasColumnType("datetime");
                entity.Property(e => e.DiaChi).HasMaxLength(300);
                entity.Property(e => e.CreateAt).HasColumnType("datetime");
                entity.Property(e => e.DeleteAt).HasColumnType("datetime");
                entity.Property(e => e.UpdateAt).HasColumnType("datetime");
                entity.Property(e => e.NguoiDungUpdate).HasColumnType("uniqueidentifier");
                entity.Property(e => e.IsDeleted).HasColumnType("bit");
                entity.HasOne(d => d.LoaiCoHoi).WithMany(p => p.CoHois)
              .HasForeignKey(d => d.MaLoaiCoHoi)
              .OnDelete(DeleteBehavior.ClientSetNull)
              .HasConstraintName("FK_LoaiCoHoi_CoHoi");
                entity.HasOne(d => d.LoaiHangHoa).WithMany(p => p.CoHois)
            .HasForeignKey(d => d.MaLoaiHangHoa)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK_LoaiHangHoa_CoHoi");
                entity.HasOne(d => d.KhachHangMucTieu).WithMany(p => p.CoHois)
            .HasForeignKey(d => d.MaKhachHang)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK_KhachHangMucTieu_CoHoi");
                entity.HasOne(d => d.LienHe).WithMany(p => p.CoHois)
            .HasForeignKey(d => d.MaLienHe)
            .OnDelete(DeleteBehavior.ClientSetNull)
            .HasConstraintName("FK_LienHe_CoHoi");
                entity.HasOne(d => d.GiaiDoanBanHang).WithMany(p => p.CoHois)
           .HasForeignKey(d => d.MaGiaiDoanBanHang)
           .OnDelete(DeleteBehavior.ClientSetNull)
           .HasConstraintName("FK_GiaiDoanBanHang_CoHoi");
                entity.HasOne(d => d.NguonGocKhachHang).WithMany(p => p.CoHois)
        .HasForeignKey(d => d.MaNguonGocKhachHang)
        .OnDelete(DeleteBehavior.ClientSetNull)
        .HasConstraintName("FK_NguonGocKhachHang_CoHoi");
                entity.HasOne(d => d.Nguoidung).WithMany(p => p.CoHois)
       .HasForeignKey(d => d.NguoiDungId)
       .OnDelete(DeleteBehavior.ClientSetNull)
       .HasConstraintName("FK_NguoiDung_CoHoi");
                entity.HasOne(d => d.PhongBan).WithMany(p => p.CoHois)
       .HasForeignKey(d => d.PhongBanId)
       .OnDelete(DeleteBehavior.ClientSetNull)
       .HasConstraintName("FK_PhongBan_CoHoi");
            });
            #endregion

            #region Báo giá
            modelBuilder.Entity<TinhTrangBaoGia>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_TinhTrangBaoGia");

                entity.ToTable("TinhTrangBaoGia");
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Name).HasMaxLength(50);
            });
            modelBuilder.Entity<BaoGia>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_BaoGia");

                entity.ToTable("BaoGia");
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.TenBaoGia).HasMaxLength(50);
                entity.Property(e => e.MoTa).HasMaxLength(300);
                entity.Property(e => e.NgayBaoGia).HasColumnType("datetime");
                entity.Property(e => e.NgayHetHan).HasColumnType("datetime");
                entity.Property(e => e.DiaChi).HasMaxLength(100);
                entity.Property(e => e.MaSoThue).HasMaxLength(50);
                entity.Property(e => e.TongTien).HasColumnType("decimal");
                entity.Property(e => e.UpdateAt).HasColumnType("datetime");
                entity.Property(e => e.NguoiDungUpdate).HasColumnType("uniqueidentifier");
                entity.HasOne(d => d.TinhTrangBaoGia).WithMany(p => p.BaoGias)
                                     .HasForeignKey(d => d.MaTinhTrangBaoGia)
                                     .OnDelete(DeleteBehavior.ClientSetNull)
                                     .HasConstraintName("FK_TinhTrangBaoGia_BaoGia");
                                                entity.HasOne(d => d.CoHoi).WithMany(p => p.BaoGias)
                                       .HasForeignKey(d => d.MaCoHoi)
                                       .OnDelete(DeleteBehavior.ClientSetNull)
                                       .HasConstraintName("FK_CoHoi_BaoGia");
                                                    entity.HasOne(d => d.KhachHangMucTieu).WithMany(p => p.BaoGias)
                                     .HasForeignKey(d => d.MaKhachHang)
                                     .OnDelete(DeleteBehavior.ClientSetNull)
                                     .HasConstraintName("FK_KhachHang_BaoGia");
                                                    entity.HasOne(d => d.Nguoidung).WithMany(p => p.BaoGias)
                                    .HasForeignKey(d => d.NguoiDungId)
                                    .OnDelete(DeleteBehavior.ClientSetNull)
                                    .HasConstraintName("FK_NguoiDung_BaoGia");
                                                    entity.HasOne(d => d.PhongBan).WithMany(p => p.BaoGias)
                                    .HasForeignKey(d => d.PhongBanId)
                                    .OnDelete(DeleteBehavior.ClientSetNull)
                                    .HasConstraintName("FK_PhongBan_BaoGia");
                                      });
            #endregion

            #region Mail đã gửi
            modelBuilder.Entity<EmailDaGui>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_EmailDaGui");

                entity.ToTable("EmailDaGui");
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.TieuDe).HasMaxLength(50);
                entity.Property(e => e.DiaChiGui).HasMaxLength(50);
                entity.Property(e => e.DiaChiNhan).HasMaxLength(50);
                entity.Property(e => e.BaoGiaId).HasColumnType("uniqueidentifier");
                entity.HasOne(d => d.KhachHangMucTieu).WithMany(p => p.EmailDaGuis)
 .HasForeignKey(d => d.KhachHangMucTieuId)
 .OnDelete(DeleteBehavior.ClientSetNull)
 .HasConstraintName("FK_KhachHangMucTieu_EmailDaGui");
                entity.HasOne(d => d.KhachHangTiemNang).WithMany(p => p.EmailDaGuis)
.HasForeignKey(d => d.KhachHangTiemNangId)
.OnDelete(DeleteBehavior.ClientSetNull)
.HasConstraintName("FK_KhachHangTiemNang_EmailDaGui");
                entity.HasOne(d => d.Nguoidung).WithMany(p => p.EmailDaGuis)
.HasForeignKey(d => d.NguoiDungId)
.OnDelete(DeleteBehavior.ClientSetNull)
.HasConstraintName("FK_NguoiDung_EmailDaGui");
                entity.HasOne(d => d.PhongBan).WithMany(p => p.EmailDaGuis)
.HasForeignKey(d => d.PhongBanId)
.OnDelete(DeleteBehavior.ClientSetNull)
.HasConstraintName("FK_PhongBan_EmailDaGui");

            });
            #endregion 

            #region Đơn hàng
            modelBuilder.Entity<LoaiDonHang>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_LoaiDonhang");

                entity.ToTable("LoaiDonHang");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Name).HasMaxLength(50);

            });
            modelBuilder.Entity<TinhTrangDonHang>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_TinhTrangDonHang");

                entity.ToTable("TinhTrangDonHang");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Name).HasMaxLength(50);

            });
            modelBuilder.Entity<TinhTrangGhiDoanhSo>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_TinhTrangGhiDoanhSo");

                entity.ToTable("TinhTrangGhiDoanhSo");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Name).HasMaxLength(50);

            });
            modelBuilder.Entity<DonHang>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_DonHang");

                entity.ToTable("DonHang");

                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.TenDonHang).HasMaxLength(100);
                entity.Property(e => e.MoTaDonHang).HasMaxLength(300);
                entity.Property(e => e.NgayDatHang).HasColumnType("datetime");
                entity.Property(e => e.GiaTriDonHang).HasColumnType("decimal");
                entity.Property(e => e.HanThanhToan).HasColumnType("datetime");
                entity.Property(e => e.HanGiaoHang).HasColumnType("datetime");
                entity.Property(e => e.NgayGhiDoanhSo).HasColumnType("datetime");
                entity.Property(e => e.HanThanhToan).HasColumnType("datetime");
                entity.Property(e => e.IsGhiDoanhSo).HasColumnType("bit");
                entity.Property(e => e.ThongTinHoaDon).HasMaxLength(150);
                entity.Property(e => e.ThongTinGiaoHang).HasMaxLength(150);
                entity.Property(e => e.MaBaoGia).HasColumnType("uniqueidentifier");
                entity.Property(e => e.CreateAt).HasColumnType("datetime");
                entity.Property(e => e.IsDeleted).HasColumnType("bit");
                entity.Property(e => e.UpdateAt).HasColumnType("datetime");
                entity.Property(e => e.NguoiDungUpdate).HasColumnType("uniqueidentifier");
                entity.HasOne(d => d.LoaiDonHang).WithMany(p => p.DonHangs)
                 .HasForeignKey(d => d.MaLoaiDonHang)
                 .OnDelete(DeleteBehavior.ClientSetNull)
                 .HasConstraintName("FK_LoaiDonHang_DonHang");
                entity.HasOne(d => d.TinhTrangDonHang).WithMany(p => p.DonHangs)
                 .HasForeignKey(d => d.MaTinhTrangDonHang)
                 .OnDelete(DeleteBehavior.ClientSetNull)
                 .HasConstraintName("FK_TinhTrangDonHang_DonHang");
                entity.HasOne(d => d.TinhTrangGhiDoanhSo).WithMany(p => p.DonHangs)
                 .HasForeignKey(d => d.MaTinhTrangGhiDoanhSo)
                 .OnDelete(DeleteBehavior.ClientSetNull)
                 .HasConstraintName("FK_TinhTrangGhiDoanhSo_DonHang");
                entity.HasOne(d => d.KhachHangMucTieu).WithMany(p => p.DonHangs)
                 .HasForeignKey(d => d.MaKhachHang)
                 .OnDelete(DeleteBehavior.ClientSetNull)
                 .HasConstraintName("FK_KhachHangMucTieu_DonHang");
                entity.HasOne(d => d.LienHe).WithMany(p => p.DonHangs)
                 .HasForeignKey(d => d.MaLienHe)
                 .OnDelete(DeleteBehavior.ClientSetNull)
                 .HasConstraintName("FK_LienHe_DonHang");
                entity.HasOne(d => d.PhongBan).WithMany(p => p.DonHangs)
                .HasForeignKey(d => d.PhongBanId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PhongBan_DonHang");
                entity.HasOne(d => d.Nguoidung).WithMany(p => p.DonHangs)
               .HasForeignKey(d => d.NguoiDungId)
               .OnDelete(DeleteBehavior.ClientSetNull)
               .HasConstraintName("FK_NguoiDung_DonHang");
            });
            #endregion
            #region KPI
            modelBuilder.Entity<TinhTrangKPI>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_TinhTrangKPI");

                entity.ToTable("TinhTrangKPI");
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.Name).HasMaxLength(50);
            });

            modelBuilder.Entity<MucTieuDoanhSo>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_MucTieuDoanhSoId");

                entity.ToTable("MucTieuDoanhSo");
                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.TenKPI).HasMaxLength(100);
                entity.Property(e => e.MaQuanLy).HasMaxLength(50);
                entity.Property(e => e.TenPhongBan).HasMaxLength(100);
                entity.Property(e => e.NgayBatDau).HasColumnType("datetime");
                entity.Property(e => e.NgayKetThuc).HasColumnType("datetime");
                entity.Property(e => e.SoCuocGoi).HasColumnType("int");
                entity.Property(e => e.SoCuocGoiThucTe).HasColumnType("int");
                entity.Property(e => e.TileCuocGoiThucTe).HasColumnType("decimal");
                entity.Property(e => e.SoLichHen).HasColumnType("int");
                entity.Property(e => e.SoLichHenThucTe).HasColumnType("int");
                entity.Property(e => e.TileLichHenThucTe).HasColumnType("decimal");
                entity.Property(e => e.SoEmailTuongTacKhachHang).HasColumnType("int");
                entity.Property(e => e.SoEmailTruongTacKhachHangThucTe).HasColumnType("int");
                entity.Property(e => e.TileEmailTuongTacThucTe).HasColumnType("decimal");
                entity.Property(e => e.SoKhachHangTiemNangDaChuyenDoi).HasColumnType("int");
                entity.Property(e => e.SoKhachHangTiemNangDaChuyenDoiThucTe).HasColumnType("int");
                entity.Property(e => e.TiLeSoKhachHangTiemNangDaChuyenDoiThucTe).HasColumnType("decimal");
                entity.Property(e => e.DoanhSo).HasColumnType("int");
                entity.Property(e => e.DoanhSoThucTe).HasColumnType("int");
                entity.Property(e => e.TiLeDoanhSoThucTe).HasColumnType("decimal");
                entity.Property(e => e.IsDatMucTieu).HasColumnType("bit");
                entity.Property(e => e.TongTiLeThucTe).HasColumnType("decimal");
                entity.Property(e => e.IsDeleted).HasColumnType("bit");
                entity.Property(e => e.CreateAt).HasColumnType("datetime");
                entity.Property(e => e.UpdateAt).HasColumnType("datetime");
                entity.Property(e => e.NguoiDungUpdate).HasColumnType("uniqueidentifier");
                entity.Property(e => e.NguoiTaoId).HasColumnType("uniqueidentifier");
                entity.Property(e => e.TenNguoiTao).HasMaxLength(50);
                entity.HasOne(d => d.Nguoidung).WithMany(r => r.MucTieuDoanhSos).HasForeignKey(r => r.NguoiDungId)
               .OnDelete(DeleteBehavior.ClientSetNull)
               .HasConstraintName("FK_NguoiDung_MucTieuDoanhSo");
                entity.HasOne(d => d.PhongBan).WithMany(r => r.MucTieuDoanhSos).HasForeignKey(r => r.PhongBanId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PhongBan_MucTieuDoanhSo");
                entity.HasOne(d => d.TinhTrangKPI).WithMany(r => r.MucTieuDoanhSos).HasForeignKey(r => r.MaTrangThaiKPI)
               .OnDelete(DeleteBehavior.ClientSetNull)
               .HasConstraintName("FK_TinhTrangKPI_MucTieuDoanhSo");
            });

            modelBuilder.Entity<KPINhanVien>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_KPINhanVien");

                entity.ToTable("KPINhanVien");
                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.TenKPI).HasMaxLength(100);
                entity.Property(e => e.MaQuanLy).HasMaxLength(50);
                entity.Property(e => e.TenNhanVien).HasMaxLength(100);
                entity.Property(e => e.NgayBatDau).HasColumnType("datetime");
                entity.Property(e => e.NgayKetThuc).HasColumnType("datetime");
                entity.Property(e => e.SoCuocGoi).HasColumnType("int");
                entity.Property(e => e.SoCuocGoiThucTe).HasColumnType("int");
                entity.Property(e => e.TileCuocGoiThucTe).HasColumnType("decimal");
                entity.Property(e => e.SoLichHen).HasColumnType("int");
                entity.Property(e => e.SoLichHenThucTe).HasColumnType("int");
                entity.Property(e => e.TileLichHenThucTe).HasColumnType("decimal");
                entity.Property(e => e.SoEmailTuongTacKhachHang).HasColumnType("int");
                entity.Property(e => e.SoEmailTruongTacKhachHangThucTe).HasColumnType("int");
                entity.Property(e => e.TileEmailTuongTacThucTe).HasColumnType("decimal");
                entity.Property(e => e.SoKhachHangTiemNangDaChuyenDoi).HasColumnType("int");
                entity.Property(e => e.SoKhachHangTiemNangDaChuyenDoiThucTe).HasColumnType("int");
                entity.Property(e => e.TiLeSoKhachHangTiemNangDaChuyenDoiThucTe).HasColumnType("decimal");
                entity.Property(e => e.DoanhSo).HasColumnType("int");
                entity.Property(e => e.DoanhSoThucTe).HasColumnType("int");
                entity.Property(e => e.TiLeDoanhSoThucTe).HasColumnType("decimal");
                entity.Property(e => e.IsDatMucTieu).HasColumnType("bit");
                entity.Property(e => e.TongTiLeThucTe).HasColumnType("decimal");
                entity.Property(e => e.IsDeleted).HasColumnType("bit");
                entity.Property(e => e.CreateAt).HasColumnType("datetime");
                entity.Property(e => e.UpdateAt).HasColumnType("datetime");
                entity.Property(e => e.NguoiDungUpdate).HasColumnType("uniqueidentifier");
                entity.HasOne(d => d.Nguoidung).WithMany(r => r.KPINhanViens).HasForeignKey(r => r.NguoiDungId)
               .OnDelete(DeleteBehavior.ClientSetNull)
               .HasConstraintName("FK_NguoiDung_KPINhanVien");
                entity.HasOne(d => d.PhongBan).WithMany(r => r.KPINhanViens).HasForeignKey(r => r.PhongBanId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PhongBan_KPINhanVien");
                entity.HasOne(d => d.TinhTrangKPI).WithMany(r => r.KPINhanViens).HasForeignKey(r => r.MaTrangThaiKPI)
               .OnDelete(DeleteBehavior.ClientSetNull)
               .HasConstraintName("FK_TinhTrangKPI_KPINhanVien");
                entity.HasOne(d => d.MucTieuDoanhSo).WithMany(r => r.KPINhanViens).HasForeignKey(r => r.MaMucTieuDoanhSo).OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_MucTieuDoanhSo_KPINhanVien");
            });

            modelBuilder.Entity<XepLoai>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_XepLoai");

                entity.ToTable("XepLoai");
                entity.Property(e => e.Id).ValueGeneratedOnAdd();
                entity.Property(e => e.TenXepLoai).HasMaxLength(50);
                entity.Property(e => e.TuDiem).HasColumnType("float");
                entity.Property(e => e.DenDiem).HasColumnType("float");
                entity.Property(e => e.MaMau).HasMaxLength(50);
            });
            #endregion
            modelBuilder.Entity<KhaoSat>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK_KhaoSat");

                entity.ToTable("KhaoSat");

                entity.Property(e => e.Id).ValueGeneratedNever();
                entity.Property(e => e.NhanVienId).HasMaxLength(50);
                entity.Property(e => e.TenNhanVien).HasMaxLength(50);
                entity.Property(e => e.PhongBanId).HasColumnType("uniqueidentifier");
                entity.Property(e => e.DonHangId).HasColumnType("uniqueidentifier");
                entity.Property(e => e.NhanVienId).HasColumnType("uniqueidentifier");
                entity.Property(e => e.TenNhanVien).HasMaxLength(50);
                entity.Property(e => e.TraiNghiemMuaSam).HasMaxLength(50);
                entity.Property(e => e.TraiNghiemTuVan).HasMaxLength(50);
                entity.Property(e => e.TraiNghiemTiepTheo).HasMaxLength(50);
                entity.Property(e => e.DanhGiaTongThe).HasColumnType("int");
                entity.Property(e => e.YKienKhac).HasMaxLength(50);
                entity.Property(e => e.CreateAt).HasColumnType("datetime");

            });

        }

    }
}
