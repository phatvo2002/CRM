using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Migrations
{
    /// <inheritdoc />
    public partial class updatedb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DoanhThu",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenDoanhThu = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DoanhThu", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LinhVucNgheNghiep",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenLinhVuc = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LinhVucNgheNghiep", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LoaiHinhNgheNghiep",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenLoaiHinh = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoaiHinhNgheNghiep", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LoaiTiemNang",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenLoaiTiemNang = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoaiTiemNang", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NguonGocKhachHang",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenNguonGoc = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NguonGocKhachHang", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PhongBanKhachHang",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenPhongban = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhongBanKhachhang", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NganhNghe",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TenNganhNghe = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    MaLinhVucNgheNghiep = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NganhNghe", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NganhNghe_LinhVucNgheNghiep",
                        column: x => x.MaLinhVucNgheNghiep,
                        principalTable: "LinhVucNgheNghiep",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "KhachHangTiemNang",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenKhachHang = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    SoDienThoaiDiDong = table.Column<string>(type: "nvarchar(11)", maxLength: 11, nullable: true),
                    SoDienThoaiCoQuan = table.Column<string>(type: "nvarchar(11)", maxLength: 11, nullable: true),
                    ChucDanh = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    SoZalo = table.Column<string>(type: "nvarchar(11)", maxLength: 11, nullable: true),
                    EmailCaNhan = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    EmailCoQuan = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    TenToChuc = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    MaSoThue = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    NgayThanhLap = table.Column<DateTime>(type: "date", nullable: false),
                    DiaChi = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    ThongTinMoTa = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true),
                    MaPhongbanKhachHang = table.Column<int>(type: "int", nullable: true),
                    MaNguonGocKhachHang = table.Column<int>(type: "int", nullable: true),
                    MaLoaiTiemNang = table.Column<int>(type: "int", nullable: true),
                    MaLoaiHinhNgheNghiep = table.Column<int>(type: "int", nullable: true),
                    MaNganhNghe = table.Column<int>(type: "int", nullable: true),
                    MaLinhVuc = table.Column<int>(type: "int", nullable: true),
                    MaDoanhThu = table.Column<int>(type: "int", nullable: true),
                    IsDungChung = table.Column<bool>(type: "bit", nullable: true),
                    NguoiDungId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PhongBanId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KhachHangTiemNang", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DoanhThu_KhachHangTiemNang",
                        column: x => x.MaDoanhThu,
                        principalTable: "DoanhThu",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LinhVuc_KhachHangTiemNang",
                        column: x => x.MaLinhVuc,
                        principalTable: "LinhVucNgheNghiep",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LoaiHinhNgheNghiep_KhachHangTiemNang",
                        column: x => x.MaLoaiHinhNgheNghiep,
                        principalTable: "LoaiHinhNgheNghiep",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LoaiTiemNang_KhachHangTiemNang",
                        column: x => x.MaLoaiTiemNang,
                        principalTable: "LoaiTiemNang",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_NganhNghe_KhachHangTiemNang",
                        column: x => x.MaNganhNghe,
                        principalTable: "NganhNghe",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_NguoiDung_KhachHangTiemNang",
                        column: x => x.NguoiDungId,
                        principalTable: "NguoiDung",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_NguonGocKhachHang_KhachHangTiemNang",
                        column: x => x.MaNguonGocKhachHang,
                        principalTable: "NguonGocKhachHang",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PhongBanKhachhang_KhachHangTiemNang",
                        column: x => x.MaPhongbanKhachHang,
                        principalTable: "PhongBanKhachHang",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PhongBan_KhachHangTiemNang",
                        column: x => x.PhongBanId,
                        principalTable: "PhongBan",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_KhachHangTiemNang_MaDoanhThu",
                table: "KhachHangTiemNang",
                column: "MaDoanhThu");

            migrationBuilder.CreateIndex(
                name: "IX_KhachHangTiemNang_MaLinhVuc",
                table: "KhachHangTiemNang",
                column: "MaLinhVuc");

            migrationBuilder.CreateIndex(
                name: "IX_KhachHangTiemNang_MaLoaiHinhNgheNghiep",
                table: "KhachHangTiemNang",
                column: "MaLoaiHinhNgheNghiep");

            migrationBuilder.CreateIndex(
                name: "IX_KhachHangTiemNang_MaLoaiTiemNang",
                table: "KhachHangTiemNang",
                column: "MaLoaiTiemNang");

            migrationBuilder.CreateIndex(
                name: "IX_KhachHangTiemNang_MaNganhNghe",
                table: "KhachHangTiemNang",
                column: "MaNganhNghe");

            migrationBuilder.CreateIndex(
                name: "IX_KhachHangTiemNang_MaNguonGocKhachHang",
                table: "KhachHangTiemNang",
                column: "MaNguonGocKhachHang");

            migrationBuilder.CreateIndex(
                name: "IX_KhachHangTiemNang_MaPhongbanKhachHang",
                table: "KhachHangTiemNang",
                column: "MaPhongbanKhachHang");

            migrationBuilder.CreateIndex(
                name: "IX_KhachHangTiemNang_NguoiDungId",
                table: "KhachHangTiemNang",
                column: "NguoiDungId");

            migrationBuilder.CreateIndex(
                name: "IX_KhachHangTiemNang_PhongBanId",
                table: "KhachHangTiemNang",
                column: "PhongBanId");

            migrationBuilder.CreateIndex(
                name: "IX_NganhNghe_MaLinhVucNgheNghiep",
                table: "NganhNghe",
                column: "MaLinhVucNgheNghiep");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KhachHangTiemNang");

            migrationBuilder.DropTable(
                name: "DoanhThu");

            migrationBuilder.DropTable(
                name: "LoaiHinhNgheNghiep");

            migrationBuilder.DropTable(
                name: "LoaiTiemNang");

            migrationBuilder.DropTable(
                name: "NganhNghe");

            migrationBuilder.DropTable(
                name: "NguonGocKhachHang");

            migrationBuilder.DropTable(
                name: "PhongBanKhachHang");

            migrationBuilder.DropTable(
                name: "LinhVucNgheNghiep");
        }
    }
}
