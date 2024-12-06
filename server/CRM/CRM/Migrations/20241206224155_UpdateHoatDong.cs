using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Migrations
{
    /// <inheritdoc />
    public partial class UpdateHoatDong : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LoaiCuocGoi",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TenCuocGoi = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoaiCuocGoi", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TrangThaiThucHien",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrangThaiThucHien", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CuocGoi",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TieuDe = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    NgayBatDau = table.Column<DateTime>(type: "datetime", nullable: false),
                    SoPhutGoi = table.Column<int>(type: "int", nullable: true),
                    SoGiayGoi = table.Column<int>(type: "int", nullable: true),
                    IsHoanThanh = table.Column<bool>(type: "bit", nullable: false),
                    LoaiCuocGoiId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    KhachHangTiemNangId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NguoiDungId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PhongBanId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CuocGoi", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KHTiemNang_CuocGoi",
                        column: x => x.KhachHangTiemNangId,
                        principalTable: "KhachHangTiemNang",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LoaiCuocGoi_CuocGoi",
                        column: x => x.LoaiCuocGoiId,
                        principalTable: "LoaiCuocGoi",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_NguoiDung_CuocGoi",
                        column: x => x.NguoiDungId,
                        principalTable: "NguoiDung",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PhongBan_CuocGoi",
                        column: x => x.PhongBanId,
                        principalTable: "PhongBan",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "LichHen",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TieuDe = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    MoTa = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    NgayBatDau = table.Column<DateTime>(type: "date", nullable: true),
                    NgayKetThuc = table.Column<DateTime>(type: "date", nullable: true),
                    DiaDiem = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    TrangThaiThucHienId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    KhachHangTiemNangId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NguoiDungId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PhongBanId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreateAt = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LichHen", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KhachHangTiemNang_LichHen",
                        column: x => x.KhachHangTiemNangId,
                        principalTable: "KhachHangTiemNang",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_NguoiDung_LichHen",
                        column: x => x.NguoiDungId,
                        principalTable: "NguoiDung",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PhongBan_LichHen",
                        column: x => x.PhongBanId,
                        principalTable: "PhongBan",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TrangThaiThucHien_LichHen",
                        column: x => x.TrangThaiThucHienId,
                        principalTable: "TrangThaiThucHien",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CuocGoi_KhachHangTiemNangId",
                table: "CuocGoi",
                column: "KhachHangTiemNangId");

            migrationBuilder.CreateIndex(
                name: "IX_CuocGoi_LoaiCuocGoiId",
                table: "CuocGoi",
                column: "LoaiCuocGoiId");

            migrationBuilder.CreateIndex(
                name: "IX_CuocGoi_NguoiDungId",
                table: "CuocGoi",
                column: "NguoiDungId");

            migrationBuilder.CreateIndex(
                name: "IX_CuocGoi_PhongBanId",
                table: "CuocGoi",
                column: "PhongBanId");

            migrationBuilder.CreateIndex(
                name: "IX_LichHen_KhachHangTiemNangId",
                table: "LichHen",
                column: "KhachHangTiemNangId");

            migrationBuilder.CreateIndex(
                name: "IX_LichHen_NguoiDungId",
                table: "LichHen",
                column: "NguoiDungId");

            migrationBuilder.CreateIndex(
                name: "IX_LichHen_PhongBanId",
                table: "LichHen",
                column: "PhongBanId");

            migrationBuilder.CreateIndex(
                name: "IX_LichHen_TrangThaiThucHienId",
                table: "LichHen",
                column: "TrangThaiThucHienId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CuocGoi");

            migrationBuilder.DropTable(
                name: "LichHen");

            migrationBuilder.DropTable(
                name: "LoaiCuocGoi");

            migrationBuilder.DropTable(
                name: "TrangThaiThucHien");
        }
    }
}
