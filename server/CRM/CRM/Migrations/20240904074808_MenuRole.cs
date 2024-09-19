using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CRM.Migrations
{
    /// <inheritdoc />
    public partial class MenuRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Menu",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Url = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Icon = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_menu", x => x.Id);
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

            migrationBuilder.CreateIndex(
                name: "IX_Menu_Group_GroupId",
                table: "Menu_Group",
                column: "GroupId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Menu_Group");

            migrationBuilder.DropTable(
                name: "Menu");
        }
    }
}
