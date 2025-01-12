using CRM.Attributes;
using CRM.DTO;
using CRM.Entities;
using CRM.Extensions;
using CRM.Modal;
using CRM.Services.KhachHangMucTieus;
using ExcelDataReader;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace CRM.Controllers.KhachHangMucTieus
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class KhachHangMucTieuController : ControllerBase
    {
        private readonly IKhacHangMucTieuServices _khacHangMucTieuServices;
        private readonly CrmDbContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public KhachHangMucTieuController(IKhacHangMucTieuServices khacHangMucTieuServices , CrmDbContext context , IWebHostEnvironment  webHostEnvironment) 
        {
            _khacHangMucTieuServices = khacHangMucTieuServices;
            _context = context;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet("getallkhachhangmuctieu")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllKhachHangMucTieu()
        {
            try
            {
                var result = await _khacHangMucTieuServices.GetAll();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getkhachhangmuctieubyid")]
        [JwtAuthorize]
        public async Task<IActionResult> GetKhachHangMucTieuById(string id)
        {
            try
            {
                var result = await _khacHangMucTieuServices.GetById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getkhachhangmuctieubynguoidungid")]
        [JwtAuthorize]
        public async Task<IActionResult> GetKhachHangMucTieuByNguoiDungId()
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                Guid phongBanId = HttpContext.GetPhongBanId();
                var db = await _context.Nguoidungs.Where(r=> r.Id == nguoiDungId && r.MaPhongBan == phongBanId).FirstOrDefaultAsync();
                if(db?.CheckIsTruongPhong == true)
                {
                    List<KhachHangMucTieuDTO> result = await _khacHangMucTieuServices.GetKhachHangMucTieuByPhongBanId(phongBanId);
                    return Ok(result);
                }    
                else
                {
                   List<KhachHangMucTieuDTO> result = await _khacHangMucTieuServices.GetKhachHangMucTieuByNguoiDungId(nguoiDungId);
                    return Ok(result);
                }    
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //[HttpGet("getkhachhangmuctieubyphongbanid")]
        //[JwtAuthorize]
        //public async Task<IActionResult> GetKhachHangMucTieuByPhongBanId()
        //{
        //    try
        //    {
        //        Guid phongBanId = HttpContext.GetPhongBanId();
        //        List<KhachHangMucTieuDTO> result = await _khacHangMucTieuServices.GetKhachHangMucTieuByPhongBanId(phongBanId);
        //        return Ok(result);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
        [HttpPost("convertkhachhangmuctieu")]
        [JwtAuthorize]
        public async Task<IActionResult> ConvertKhachHangMucTieu(ConvertKhachHangModal modal)
        {
            try
            {
                Guid phongBanId = HttpContext.GetPhongBanId();
                Guid nguoiDungId = HttpContext.GetUserId();
                ResultModal result = await _khacHangMucTieuServices.ConvertKhachHangMucTieu(modal, nguoiDungId, phongBanId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("createkhachhangmuctieu")]
        [JwtAuthorize]
        public async Task<IActionResult> CreateKhachHangMucTieu(KhachHangMucTieuModal modal)
        {
            try
            {
                Guid phongBanId = HttpContext.GetPhongBanId();
                Guid nguoiDungId = HttpContext.GetUserId();
                ResultModal result = await _khacHangMucTieuServices.CreateKhachHangMucTieu(modal, nguoiDungId, phongBanId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("UploadExcel")]
        [JwtAuthorize]
        public async Task<IActionResult> UploadExcel([FromForm] IFormFile file)
        {
            Guid userId = HttpContext.GetUserId();
            Guid phongBanId = HttpContext.GetPhongBanId();
            Random random = new Random();
            try
            {
                if (file == null || file.Length == 0)
                {
                    return BadRequest("Không tìm thấy file");
                }
                var uploadFolder = $"{_webHostEnvironment.WebRootPath}\\UploadFiles";

                var filePath = Path.Combine(uploadFolder, file.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                using (var stream = System.IO.File.Open(filePath, FileMode.Open, FileAccess.Read))
                {
                    using (var reader = ExcelReaderFactory.CreateReader(stream))
                    {
                        do
                        {
                            int rowIndex = 0;
                            while (reader.Read())
                            {
                                rowIndex++;
                                if (rowIndex == 1)
                                    continue;
                                KhachHangMucTieu khachHangMucTieu = new KhachHangMucTieu();
                                khachHangMucTieu.Id = random.Next(100000, 1000000).ToString();
                                var tenKhacHang = !string.IsNullOrEmpty(reader.GetValue(0)?.ToString()) ? reader.GetValue(0).ToString() : null;
                                khachHangMucTieu.TenKhachHang = tenKhacHang;
                                var tenVietTat = !string.IsNullOrEmpty(reader.GetValue(1)?.ToString()) ? reader.GetValue(1).ToString() : null;
                                khachHangMucTieu.TenVietTat = tenVietTat;
                                var maSoThue = !string.IsNullOrEmpty(reader.GetValue(2)?.ToString()) ? reader.GetValue(2).ToString() : null;
                                khachHangMucTieu.MaSoThue = maSoThue;
                                var soDienThoai = !string.IsNullOrEmpty(reader.GetValue(3)?.ToString()) ? reader.GetValue(3).ToString() : null;
                                khachHangMucTieu.SoDienThoai = soDienThoai;
                                var email = !string.IsNullOrEmpty(reader.GetValue(4)?.ToString()) ? reader.GetValue(4).ToString() : null;
                                khachHangMucTieu.Email = email;
                                var nguonGocKhachHang = !string.IsNullOrEmpty(reader.GetValue(5)?.ToString()) ? reader.GetValue(5).ToString() : null;
                                switch (nguonGocKhachHang)
                                {
                                    case "Nhân viên kinh doanh tự tìm kiếm":
                                        khachHangMucTieu.MaNguonGocKhachHang = 1;
                                        break;
                                    case "Khách hàng hoặc đối tác giới thiệu":
                                        khachHangMucTieu.MaNguonGocKhachHang = 2;
                                        break;
                                    case "Thông qua sự kiện hội thảo , tập huấn":
                                        khachHangMucTieu.MaNguonGocKhachHang = 3;
                                        break;
                                    case "Khách hàng tự tìm đến":
                                        khachHangMucTieu.MaNguonGocKhachHang = 4;
                                        break;
                                    case "Marketing":
                                        khachHangMucTieu.MaNguonGocKhachHang = 5;
                                        break;
                                    case "Khác":
                                        khachHangMucTieu.MaNguonGocKhachHang = 6;
                                        break;
                                    default:
                                        khachHangMucTieu.MaNguonGocKhachHang = null;
                                        break;
                                }
                                var loaiTiemNang = !string.IsNullOrEmpty(reader.GetValue(6)?.ToString()) ? reader.GetValue(6).ToString() : null;
                                switch (loaiTiemNang)
                                {
                                    case "Khách hàng bán lẻ":
                                        khachHangMucTieu.MaLoaiTiemNang = 1;
                                        break;
                                    case "Khách hàng doanh nghiệp":
                                        khachHangMucTieu.MaLoaiTiemNang = 2;
                                        break;
                                    default:
                                        khachHangMucTieu.MaNguonGocKhachHang = null;
                                        break;
                                }
                                var linhVucNgheNghiep = !string.IsNullOrEmpty(reader.GetValue(7)?.ToString()) ? reader.GetValue(7).ToString() : null;
                                switch (linhVucNgheNghiep)
                                {
                                    case "Thương mại":
                                        khachHangMucTieu.MaLinhVuc = 1;
                                        break;
                                    default:
                                        khachHangMucTieu.MaLinhVuc = null;
                                        break;
                                }
                                var nganhNghe = !string.IsNullOrEmpty(reader.GetValue(8)?.ToString()) ? reader.GetValue(8).ToString() : null;
                                switch (nganhNghe)
                                {
                                    case "Kinh doanh thực phẩm":
                                        khachHangMucTieu.MaNganhNghe = 1;
                                        break;
                                    case "Kinh doanh hóa mĩ phẩm ":
                                        khachHangMucTieu.MaNganhNghe = 2;
                                        break;
                                    case "Kinh doanh điện tử điện lạnh":
                                        khachHangMucTieu.MaNganhNghe = 3;
                                        break;
                                    case "Kinh doanh đồ gỗ , thiết bị nội thất":
                                        khachHangMucTieu.MaNganhNghe = 4;
                                        break;
                                    case "Kinh doanh hàng gia dụng":
                                        khachHangMucTieu.MaNganhNghe = 5;
                                        break;
                                    case "Kinh doanh nông lâm sản":
                                        khachHangMucTieu.MaNganhNghe = 6;
                                        break;
                                    case "Kinh doanh sắt thép":
                                        khachHangMucTieu.MaNganhNghe = 7;
                                        break;
                                    case "Kinh doanh thương mại khác":
                                        khachHangMucTieu.MaNganhNghe = 8;
                                        break;
                                    default:
                                        khachHangMucTieu.MaNganhNghe = null;
                                        break;
                                }
                                var taiKhoanNganHang = !string.IsNullOrEmpty(reader.GetValue(9)?.ToString()) ? reader.GetValue(9).ToString() : null;
                                khachHangMucTieu.TaiKhoanNganHang = taiKhoanNganHang;
                                var doanhThu = !string.IsNullOrEmpty(reader.GetValue(10)?.ToString()) ? reader.GetValue(10).ToString() : null;
                                switch (doanhThu)
                                {
                                    case "Dưới 1 tỉ đồng":
                                        khachHangMucTieu.MaDoanhThu = 1;
                                        break;
                                    case "Từ 1 tỉ đồng đến 3 tỉ đồng":
                                        khachHangMucTieu.MaDoanhThu = 2;
                                        break;
                                    case "Từ 3 tỉ đến 5 tỉ đồng":
                                        khachHangMucTieu.MaDoanhThu = 3;
                                        break;
                                    case "Trên 5 tỉ đồng":
                                        khachHangMucTieu.MaDoanhThu = 4;
                                        break;
                                    default:
                                        khachHangMucTieu.MaDoanhThu = null;
                                        break;
                                }
                                string ngayThanhLap = !string.IsNullOrEmpty(reader.GetValue(11)?.ToString()) ? reader.GetValue(11).ToString() : null;
                                if (ngayThanhLap == null)
                                    khachHangMucTieu.NgayThanhLap = null;
                                else
                                {
                                    DateTime dateValue = DateTime.ParseExact(ngayThanhLap, "M/d/yyyy h:mm:ss tt", CultureInfo.InvariantCulture);
                                    khachHangMucTieu.NgayThanhLap = dateValue;
                                }
                                var website = !string.IsNullOrEmpty(reader.GetValue(12)?.ToString()) ? reader.GetValue(12).ToString() : null;
                                khachHangMucTieu.Website = website;
                                var thongTinGiaoHang = !string.IsNullOrEmpty(reader.GetValue(13)?.ToString()) ? reader.GetValue(13).ToString() : null;
                                khachHangMucTieu.ThongTinGiaoHang = thongTinGiaoHang;
                                var thongTinHoaDon = !string.IsNullOrEmpty(reader.GetValue(14)?.ToString()) ? reader.GetValue(14).ToString() : null;
                                khachHangMucTieu.ThongTinHoaDon = thongTinHoaDon;
                                var khachHangDungChung = !string.IsNullOrEmpty(reader.GetValue(15)?.ToString()) ? reader.GetValue(15).ToString() : null;
                                switch (khachHangDungChung)
                                {
                                    case "1":
                                        khachHangMucTieu.IsDungChung = true;
                                        break;
                                    case "0":
                                        khachHangMucTieu.IsDungChung = false;
                                        break;
                                    default:
                                        khachHangMucTieu.IsDungChung = false;
                                        break;
                                }
                                var khachHangPhanPhoi = !string.IsNullOrEmpty(reader.GetValue(16)?.ToString()) ? reader.GetValue(16).ToString() : null;
                                switch (khachHangPhanPhoi)
                                {
                                    case "1":
                                        khachHangMucTieu.IsNhaPhanPhoi = true;
                                        break;
                                    case "0":
                                        khachHangMucTieu.IsNhaPhanPhoi = false;
                                        break;
                                    default:
                                        khachHangMucTieu.IsNhaPhanPhoi = false;
                                        break;
                                }
                                var khachHangCaNhan = !string.IsNullOrEmpty(reader.GetValue(17)?.ToString()) ? reader.GetValue(17).ToString() : null;
                                switch (khachHangPhanPhoi)
                                {
                                    case "1":
                                        khachHangMucTieu.IsKhachHangCaNhan = true;
                                        break;
                                    case "0":
                                        khachHangMucTieu.IsKhachHangCaNhan = false;
                                        break;
                                    default:
                                        khachHangMucTieu.IsKhachHangCaNhan = false;
                                        break;
                                }
                                khachHangMucTieu.IsDeleted = false;
                                khachHangMucTieu.CreateAt = DateTime.Now;
                                khachHangMucTieu.NguoiDungId = userId;
                                khachHangMucTieu.PhongBanId = phongBanId;
                                _context.KhachHangMucTieus.Add(khachHangMucTieu);
                                await _context.SaveChangesAsync();

                            };
                        } while (reader.NextResult());
                    }
                }

                return Ok(new ResultModal() { Status = 200, Message = "Thêm mới thành công", Success = true });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpPut("updatekhachhangmuctieu")]
        [JwtAuthorize]
        public async Task<IActionResult> CupdateKhachHangMucTieu(KhachHangMucTieuModal modal)
        {
            try
            {
                Guid phongBanId = HttpContext.GetPhongBanId();
                Guid nguoiDungId = HttpContext.GetUserId();
                ResultModal result = await _khacHangMucTieuServices.UpdateKhachHangMucTieu(modal, nguoiDungId, phongBanId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("deletekhachhangmuctieu")]
        [JwtAuthorize]
        public async Task<IActionResult> DeleteKhachHangMucTieu(string id)
        {
            try
            {
                var result = await _khacHangMucTieuServices.DeleteById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
