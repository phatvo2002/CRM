using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CRM.Entities.StoreProcedure
{

	public class sp_CRM_DanhSachKhachHangMucTieu
	{
		[Key]
		[Column("Id")]
		public string? Id { get; set; }
		public string? TenKhachHang { get; set; }
        public string? TenVietTat { get; set; }
		public string? MaSoThue { get; set; }
		public string? SoDienThoai { get; set; }
		public string? Email { get; set; }
		public string? TaiKhoanNganHang { get; set; }
		public DateTime NgayThanhLap { get; set; }
		public bool IsDungChung { get; set; }
		public bool IsKhachHangCaNhan { get; set; }
		public bool IsNhaPhanPhoi { get; set; }
		public string? ThongTinHoaDon { get; set; }
		public string? ThongTinGiaoHang { get; set; }
		public string? TenPhongban { get; set; }
		public string? PhongBanKhachHang { get; set; }
        public string? TenNguonGoc { get; set; }
		public string? TenLoaiTiemNang { get; set; }
		public string? TenLoaiHinh { get; set; }
		public string? TenNganhNghe { get; set; }
		public string? TenLinhVuc { get; set; }
		public string? TenNhanVien { get; set; }
		public byte[]? HinhAnh { get; set; }
		public string? TenChiNhanh { get; set; }
		public int MaPhanLoaiKhachHang { get; set; }
		public string? TenPhanLoai { get; set; }
		public int MaPhanLoai { get; set; }

    }

}
