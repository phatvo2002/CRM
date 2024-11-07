using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Migrations
{
    /// <inheritdoc />
    public partial class updatemenu : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ChucVu",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenChucVu = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    MoTa = table.Column<string>(type: "nvarchar(300)", maxLength: 300, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChucVu", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Menu",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Url = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Icon = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    TrangThai = table.Column<bool>(type: "bit", nullable: true),
                    OrderNumber = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_menu", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PhongBan",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SoThuTu = table.Column<int>(type: "int", nullable: false),
                    MaQuanLy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TenPhongBan = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    MoTa = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhongBan", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TinhTrang",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false),
                    TenTinhTrang = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TinhTrang", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Menu_Group",
                columns: table => new
                {
                    MenuId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Xem = table.Column<bool>(type: "bit", nullable: true),
                    Them = table.Column<bool>(type: "bit", nullable: true),
                    Xoa = table.Column<bool>(type: "bit", nullable: true),
                    Sua = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Menu_Group", x => new { x.MenuId, x.GroupId });
                    table.ForeignKey(
                        name: "FK_Menu_Role_ChucVu",
                        column: x => x.GroupId,
                        principalTable: "ChucVu",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Menu_Role_Menu",
                        column: x => x.MenuId,
                        principalTable: "Menu",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "NguoiDung",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    HoVaDem = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Ten = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    DiaChi = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    SoDienThoai = table.Column<string>(type: "nvarchar(11)", maxLength: 11, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    NgayThuViec = table.Column<DateTime>(type: "datetime", nullable: true),
                    NgayBatDauLamViec = table.Column<DateTime>(type: "datetime", nullable: true),
                    TaiKhoan = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    MatKhau = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CheckIsTruongPhong = table.Column<bool>(type: "bit", nullable: false),
                    CheckIsGiamDoc = table.Column<bool>(type: "bit", nullable: false),
                    MaChucVu = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    MaPhongBan = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    MaTinhTrang = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NguoiDung", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChucVu_NguoiDung",
                        column: x => x.MaChucVu,
                        principalTable: "ChucVu",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PhongBan_NguoiDung",
                        column: x => x.MaPhongBan,
                        principalTable: "PhongBan",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TinhTrang_NguoiDung",
                        column: x => x.MaTinhTrang,
                        principalTable: "TinhTrang",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Menu_Group_GroupId",
                table: "Menu_Group",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_NguoiDung_MaChucVu",
                table: "NguoiDung",
                column: "MaChucVu");

            migrationBuilder.CreateIndex(
                name: "IX_NguoiDung_MaPhongBan",
                table: "NguoiDung",
                column: "MaPhongBan");

            migrationBuilder.CreateIndex(
                name: "IX_NguoiDung_MaTinhTrang",
                table: "NguoiDung",
                column: "MaTinhTrang");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Menu_Group");

            migrationBuilder.DropTable(
                name: "NguoiDung");

            migrationBuilder.DropTable(
                name: "Menu");

            migrationBuilder.DropTable(
                name: "ChucVu");

            migrationBuilder.DropTable(
                name: "PhongBan");

            migrationBuilder.DropTable(
                name: "TinhTrang");
        }
    }
}
