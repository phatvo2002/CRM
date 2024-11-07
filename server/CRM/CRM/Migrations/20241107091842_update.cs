using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Migrations
{
    /// <inheritdoc />
    public partial class update : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                table: "PhongBan",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MaQuanLy",
                table: "PhongBan",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MoTa",
                table: "PhongBan",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SoThuTu",
                table: "PhongBan",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "TrangThai",
                table: "Menu",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsActive",
                table: "PhongBan");

            migrationBuilder.DropColumn(
                name: "MaQuanLy",
                table: "PhongBan");

            migrationBuilder.DropColumn(
                name: "MoTa",
                table: "PhongBan");

            migrationBuilder.DropColumn(
                name: "SoThuTu",
                table: "PhongBan");

            migrationBuilder.DropColumn(
                name: "TrangThai",
                table: "Menu");
        }
    }
}
