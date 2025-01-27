using CRM.Attributes;
using CRM.DTO;
using CRM.Entities;
using CRM.Extensions;
using CRM.Modal;
using CRM.Services.KhachHangMucTieus;
using ExcelDataReader;
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
        public KhachHangMucTieuController(IKhacHangMucTieuServices khacHangMucTieuServices, CrmDbContext context, IWebHostEnvironment webHostEnvironment)
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
        [HttpGet("getkhachhangmuctieubyid/{id}")]
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
                var db = await _context.Nguoidungs.Where(r => r.Id == nguoiDungId && r.MaPhongBan == phongBanId).FirstOrDefaultAsync();
                if (db?.CheckIsTruongPhong == true)
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
        [HttpGet("getkhachhangmuctieubynguoidungidquery/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetKhachHangMucTieuByIdQuery(Guid id)
        {
            try
            {
                var result = await _khacHangMucTieuServices.GetKhachHangMucTieuByNguoiDungIdQuery(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getkhachhangmuctieudaxoa")]
        [JwtAuthorize]
        public async Task<IActionResult> GetKhachHangDaXoa()
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                Guid phongBanId = HttpContext.GetPhongBanId();
                var userData = _context.Nguoidungs.FirstOrDefault(r=> r.Id == nguoiDungId);
                if(userData.CheckIsTruongPhong == true)
                {
                    List<KhachHangMucTieuDTO> result = await _khacHangMucTieuServices.GetKhachHangMucTieuDaXoaByNguoiDungId(nguoiDungId);
                    return Ok(result);
                }    
                else
                {
                    List<KhachHangMucTieuDTO> result = await _khacHangMucTieuServices.GetKhachHangMucTieuDaXoaByPhongBanId(phongBanId);
                    return Ok(result);
                }    
            }catch (Exception ex)
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
        [HttpPost("bangiaokhachhangmuctieu")]
        [JwtAuthorize]
        public async Task<IActionResult> BanGiaoKhachHangMucTieu(BanGiaoModal modal)
        {
            try
            {
                ResultModal result = await _khacHangMucTieuServices.BanGiaoKhachHangMucTieu(modal);
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
                            Random random = new Random();
                            int rowIndex = 0;
                            while (reader.Read())
                            {
                                bool isRowEmpty = true;
                                for (int i = 0; i < reader.FieldCount; i++)
                                {
                                    if (!string.IsNullOrWhiteSpace(reader.GetValue(i)?.ToString()))
                                    {
                                        isRowEmpty = false;
                                        break;
                                    }
                                }
                                if (isRowEmpty) continue;
                                rowIndex++;
                                if (rowIndex == 1)
                                    continue;
                                KhachHangMucTieu khachHangMucTieu = new KhachHangMucTieu();
                                khachHangMucTieu.Id = $"KH{random.Next(100000, 1000000)}";
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
                                khachHangMucTieu.MaNguonGocKhachHang = nguonGocKhachHang switch
                                {
                                    "Nhân viên kinh doanh tự tìm kiếm" => 1,
                                    "Khách hàng hoặc đối tác giới thiệu" => 2,
                                    "Thông qua sự kiện hội thảo , tập huấn" => 3,
                                    "Khách hàng tự tìm đến" => 4,
                                    "Marketing" => 5,
                                    "Khác" => 6,
                                    _ => null,
                                };
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
                                khachHangMucTieu.MaLinhVuc = linhVucNgheNghiep switch
                                {
                                    "Thương mại" => 1,
                                    _ => null,
                                };
                                var nganhNghe = !string.IsNullOrEmpty(reader.GetValue(8)?.ToString()) ? reader.GetValue(8).ToString() : null;
                                khachHangMucTieu.MaNganhNghe = nganhNghe switch
                                {
                                    "Kinh doanh thực phẩm" => 1,
                                    "Kinh doanh hóa mĩ phẩm " => 2,
                                    "Kinh doanh điện tử điện lạnh" => 3,
                                    "Kinh doanh đồ gỗ , thiết bị nội thất" => 4,
                                    "Kinh doanh hàng gia dụng" => 5,
                                    "Kinh doanh nông lâm sản" => 6,
                                    "Kinh doanh sắt thép" => 7,
                                    "Kinh doanh thương mại khác" => 8,
                                    _ => null,
                                };
                                var taiKhoanNganHang = !string.IsNullOrEmpty(reader.GetValue(9)?.ToString()) ? reader.GetValue(9).ToString() : null;
                                khachHangMucTieu.TaiKhoanNganHang = taiKhoanNganHang;
                                var doanhThu = !string.IsNullOrEmpty(reader.GetValue(10)?.ToString()) ? reader.GetValue(10).ToString() : null;
                                khachHangMucTieu.MaDoanhThu = doanhThu switch
                                {
                                    "Dưới 1 tỉ đồng" => 1,
                                    "Từ 1 tỉ đồng đến 3 tỉ đồng" => 2,
                                    "Từ 3 tỉ đến 5 tỉ đồng" => 3,
                                    "Trên 5 tỉ đồng" => 4,
                                    _ => null,
                                };
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
                                khachHangMucTieu.IsDungChung = khachHangDungChung switch
                                {
                                    "1" => true,
                                    "0" => false,
                                    _ => (bool?)false,
                                };
                                var khachHangPhanPhoi = !string.IsNullOrEmpty(reader.GetValue(16)?.ToString()) ? reader.GetValue(16).ToString() : null;
                                khachHangMucTieu.IsNhaPhanPhoi = khachHangPhanPhoi switch
                                {
                                    "1" => true,
                                    "0" => false,
                                    _ => (bool?)false,
                                };
                                var khachHangCaNhan = !string.IsNullOrEmpty(reader.GetValue(17)?.ToString()) ? reader.GetValue(17).ToString() : null;
                                khachHangMucTieu.IsKhachHangCaNhan = khachHangPhanPhoi switch
                                {
                                    "1" => true,
                                    "0" => false,
                                    _ => (bool?)false,
                                };
                                khachHangMucTieu.IsDeleted = false;
                                khachHangMucTieu.CreateAt = DateTime.Now;
                                khachHangMucTieu.NguoiDungId = userId;
                                khachHangMucTieu.PhongBanId = phongBanId;
                                _context.KhachHangMucTieus.Add(khachHangMucTieu);
                            };
                            await _context.SaveChangesAsync();
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
        [HttpPut("khoiphuckhachhang")]
        [JwtAuthorize]
        public async Task<IActionResult> KhoiPhucKhachHangMucTieu(List<KhachHangMucTieuModal> modal)
        {
            try
            {
                ResultModal result = await _khacHangMucTieuServices.KhoiPhucKhachHang(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("deletekhachhangmuctieu/{id}")]
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
        [HttpDelete("deletehangloatkhachhangmuctieu")]
        [JwtAuthorize]
        public async Task<IActionResult> DeleteHangLoatKhachHangMucTieu(List<KhachHangMucTieuModal> modal)
        {
            try
            {
                var result = await _khacHangMucTieuServices.DeleteMultiple(modal);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
