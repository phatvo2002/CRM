using CRM.Attributes;
using CRM.DTO;
using CRM.Entities;
using CRM.Extensions;
using CRM.Helper;
using CRM.Modal;
using CRM.Services.KhahHangTiemNangs;
using ExcelDataReader;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;

namespace CRM.Controllers.KhachHangTiemnangs
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class KhachHangTiemNangController : ControllerBase
    {
        private readonly IKhachHangTiemNangServices _khachHangTiemNangServices;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly CrmDbContext _dbContext;
        public KhachHangTiemNangController(IKhachHangTiemNangServices khachHangTiemNangServices, IWebHostEnvironment webHostEnvironment, CrmDbContext dbContext)
        {
            _khachHangTiemNangServices = khachHangTiemNangServices;
            _webHostEnvironment = webHostEnvironment;
            _dbContext = dbContext;
        }
        [HttpGet("getallkhachhangtiemnang")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllKhachHangTiemNang(DateTime tuNgay, DateTime denNgay)
        {
            try
            {
                List<KhachHangTiemNangDTO> result = await _khachHangTiemNangServices.GetAllKhachHangTiemNangAsync(tuNgay, denNgay);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getkhachhangtiemnangbyid/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetKhachHangTiemNangById(Guid Id)
        {
            try
            {
                KhachHangTiemNangDTO result = await _khachHangTiemNangServices.GetKhachHangTiemNangByIdAsync(Id);
                return Ok(result);
            }
            catch
            (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //[HttpGet("getkhachhangtiemnangdaxoa")]
        //[JwtAuthorize]
        //public async Task<IActionResult> GetKhachHangTiemNangDaXoa()
        //{
        //    try
        //    {
        //        Guid nguoiDungId = HttpContext.GetUserId();
        //        List<KhachHangTiemNangDTO> result = await _khachHangTiemNangServices.GetKhachHangTiemNangDaXoaAsync(nguoiDungId);
        //        return Ok(result);
        //    }
        //    catch
        //    (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
        [HttpPost("getTemplate")]
        [JwtAuthorize]
        public IActionResult GetFile(string path, string filename)
        {
            try
            {
                if (string.IsNullOrEmpty(path))
                    return Ok(new { Messages = "Vui lòng nhập đường dẫn file." });

                string extension;
                extension = Path.GetExtension(path);
                var filePath = Path.Combine(_webHostEnvironment.WebRootPath, path);

                if (System.IO.File.Exists(filePath))
                {
                    // Read the file content
                    byte[] fileBytes = System.IO.File.ReadAllBytes(filePath);

                    // Set the content type and file name for the response
                    var contentType = Until.GetmimeType(extension);


                    return File(fileBytes, contentType, filename);
                }
                else
                    return Ok(new { Message = "Không tìm thấy file" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { ex.Message });
            }

        }
        [HttpGet("getkhachhangtiemnangbynguoidungid/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetKhachHangTiemNangByNguoiDungId(Guid Id, DateTime tuNgay, DateTime denNgay)
        {
            try
            {
                List<KhachHangTiemNangDTO> result = await _khachHangTiemNangServices.GetKhachHangTiemNangByNguoiDungIdAsync(Id, tuNgay, denNgay);
                return Ok(result);
            }
            catch
            (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getkhachhangtiemnangbyPhongbanId/{phongBanId}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetKhachHangTiemNangByPhongBanId(Guid phongBanId, DateTime tuNgay, DateTime denNgay)
        {
            try
            {
                List<KhachHangTiemNangDTO> result = await _khachHangTiemNangServices.GetKhachHangTiemNangByPhongBanIdAsync(phongBanId, tuNgay, denNgay);
                return Ok(result);
            }
            catch
            (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getkhachhangtiemnangbyphongbanidcontext")]
        [JwtAuthorize]
        public async Task<IActionResult> GetKhachHangTiemNangByPhongBanIdContext(DateTime tuNgay, DateTime denNgay)
        {
            try
            {
                Guid phongBanId = HttpContext.GetPhongBanId();
                List<KhachHangTiemNangDTO> result = await _khachHangTiemNangServices.GetKhachHangTiemNangByPhongBanIdAsync(phongBanId, tuNgay, denNgay);
                return Ok(result);
            }
            catch
            (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getkhachhangbyrole")]
        [JwtAuthorize]
        public async Task<IActionResult> GetKhachHangTiemNangByRole(DateTime tuNgay, DateTime denNgay)
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                Guid phongBanId = HttpContext.GetPhongBanId();
                var db = _dbContext.Nguoidungs.FirstOrDefault(r => r.Id == nguoiDungId);
                if (db.CheckIsTruongPhong == true)
                {
                    List<KhachHangTiemNangDTO> result = await _khachHangTiemNangServices.GetKhachHangTiemNangByPhongBanIdAsync(phongBanId, tuNgay, denNgay);
                    return Ok(result);
                }
                else
                {
                    List<KhachHangTiemNangDTO> result = await _khachHangTiemNangServices.GetKhachHangTiemNangByNguoiDungIdAsync(nguoiDungId, tuNgay, denNgay);
                    return Ok(result);
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet("getkhachhangtiemnangdaxoa")]
        [JwtAuthorize]
        public async Task<IActionResult> GetKhachHangTiemNangDaXoa()
        {
            try
            {
                Guid nguoiDungId = HttpContext.GetUserId();
                Guid phongBanId = HttpContext.GetPhongBanId();
                var db = _dbContext.Nguoidungs.FirstOrDefault(r => r.Id == nguoiDungId);
                if (db.CheckIsTruongPhong == true)
                {
                    List<KhachHangTiemNangDTO> result = await _khachHangTiemNangServices.GetKhachHangTiemNangDaXoaByPhongBanAsync(phongBanId);
                    return Ok(result);
                }
                else
                {
                    List<KhachHangTiemNangDTO> result = await _khachHangTiemNangServices.GetKhachHangTiemNangDaXoaAsync(nguoiDungId);
                    return Ok(result);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        [HttpPost("createkhachhangtiemnang")]
        [JwtAuthorize]
        public async Task<IActionResult> CreateKhachHangTiemNang(KhachHangTiemNangModel model)
        {
            try
            {
                Guid userId = HttpContext.GetUserId();
                Guid phongBanId = HttpContext.GetPhongBanId();
                ResultModal result = await _khachHangTiemNangServices.ThemMoiKhachHangTiemNangAsync(model, userId, phongBanId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("ImportKhachHang")]
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
                            int rowIndex = 0;
                            while (reader.Read())
                            {
                                rowIndex++;
                                if (rowIndex == 1)
                                    continue;
                                KhachHangTiemNang khachHangTiemNang = new KhachHangTiemNang();
                                khachHangTiemNang.Id = Guid.NewGuid();
                                var tenKhacHang = !string.IsNullOrEmpty(reader.GetValue(0)?.ToString()) ? reader.GetValue(0).ToString() : null;
                                khachHangTiemNang.TenKhachHang = tenKhacHang;
                                var phongBanKhachHang = !string.IsNullOrEmpty(reader.GetValue(1)?.ToString()) ? reader.GetValue(1).ToString() : null;
                                khachHangTiemNang.MaPhongbanKhachHang = phongBanKhachHang switch
                                {
                                    "Phòng giám đốc" => 1,
                                    "Phòng tài chính" => 2,
                                    "Phòng nhân sự" => 3,
                                    "Phòng marketing" => 4,
                                    "Phòng chăm sóc khách hàng " => 5,
                                    "Phòng kinh doanh " => 6,
                                    _ => null,
                                };
                                var sdtDiDong = !string.IsNullOrEmpty(reader.GetValue(2)?.ToString()) ? reader.GetValue(2).ToString() : null;
                                khachHangTiemNang.SoDienThoaiDiDong = sdtDiDong;

                                khachHangTiemNang.SoDienThoaiCoQuan = !string.IsNullOrEmpty(reader.GetValue(3)?.ToString()) ? reader.GetValue(3).ToString() : null;
                                var nguonGocKhachHang = !string.IsNullOrEmpty(reader.GetValue(4)?.ToString()) ? reader.GetValue(4).ToString() : null;
                                khachHangTiemNang.MaNguonGocKhachHang = nguonGocKhachHang switch
                                {
                                    "Nhân viên kinh doanh tự tìm kiếm" => 1,
                                    "Khách hàng hoặc đối tác giới thiệu" => 2,
                                    "Thông qua sự kiện hội thảo , tập huấn" => 3,
                                    "Khách hàng tự tìm đến" => 4,
                                    "Marketing" => 5,
                                    "Khác" => 6,
                                    _ => null,
                                };
                                var loaiTiemNang = !string.IsNullOrEmpty(reader.GetValue(5)?.ToString()) ? reader.GetValue(5).ToString() : null;
                                switch (loaiTiemNang)
                                {
                                    case "Khách hàng bán lẻ":
                                        khachHangTiemNang.MaLoaiTiemNang = 1;
                                        break;
                                    case "Khách hàng doanh nghiệp":
                                        khachHangTiemNang.MaLoaiTiemNang = 2;
                                        break;
                                    default:
                                        khachHangTiemNang.MaNguonGocKhachHang = null;
                                        break;
                                }
                                khachHangTiemNang.SoZalo = !string.IsNullOrEmpty(reader.GetValue(6)?.ToString()) ? reader.GetValue(6).ToString() : null;
                                khachHangTiemNang.EmailCaNhan = !string.IsNullOrEmpty(reader.GetValue(7)?.ToString()) ? reader.GetValue(7).ToString() : null;
                                khachHangTiemNang.EmailCoQuan = !string.IsNullOrEmpty(reader.GetValue(8)?.ToString()) ? reader.GetValue(8).ToString() : null;
                                khachHangTiemNang.MaSoThue = !string.IsNullOrEmpty(reader.GetValue(9)?.ToString()) ? reader.GetValue(9).ToString() : null;
                                khachHangTiemNang.TenToChuc = !string.IsNullOrEmpty(reader.GetValue(10)?.ToString()) ? reader.GetValue(10).ToString() : null;
                                var loaiHinhNgheNghiep = !string.IsNullOrEmpty(reader.GetValue(11)?.ToString()) ? reader.GetValue(11).ToString() : null;
                                switch (loaiHinhNgheNghiep)
                                {
                                    case "Doanh nghiệp":
                                        khachHangTiemNang.MaLoaiHinhNgheNghiep = 1;
                                        break;
                                    case "Cá nhân":
                                        khachHangTiemNang.MaLoaiHinhNgheNghiep = 2;
                                        break;
                                    case "Khác":
                                        khachHangTiemNang.MaLoaiHinhNgheNghiep = 3;
                                        break;
                                    default:
                                        khachHangTiemNang.MaLoaiHinhNgheNghiep = null;
                                        break;
                                }
                                var linhVucNgheNghiep = !string.IsNullOrEmpty(reader.GetValue(12)?.ToString()) ? reader.GetValue(12).ToString() : null;
                                switch (linhVucNgheNghiep)
                                {
                                    case "Thương mại":
                                        khachHangTiemNang.MaLinhVuc = 1;
                                        break;
                                    default:
                                        khachHangTiemNang.MaLinhVuc = null;
                                        break;
                                }
                                var nganhNghe = !string.IsNullOrEmpty(reader.GetValue(13)?.ToString()) ? reader.GetValue(13).ToString() : null;
                                switch (nganhNghe)
                                {
                                    case "Kinh doanh thực phẩm":
                                        khachHangTiemNang.MaNganhNghe = 1;
                                        break;
                                    case "Kinh doanh hóa mĩ phẩm ":
                                        khachHangTiemNang.MaNganhNghe = 2;
                                        break;
                                    case "Kinh doanh điện tử điện lạnh":
                                        khachHangTiemNang.MaNganhNghe = 3;
                                        break;
                                    case "Kinh doanh đồ gỗ , thiết bị nội thất":
                                        khachHangTiemNang.MaNganhNghe = 4;
                                        break;
                                    case "Kinh doanh hàng gia dụng":
                                        khachHangTiemNang.MaNganhNghe = 5;
                                        break;
                                    case "Kinh doanh nông lâm sản":
                                        khachHangTiemNang.MaNganhNghe = 6;
                                        break;
                                    case "Kinh doanh sắt thép":
                                        khachHangTiemNang.MaNganhNghe = 7;
                                        break;
                                    case "Kinh doanh thương mại khác":
                                        khachHangTiemNang.MaNganhNghe = 8;
                                        break;
                                    default:
                                        khachHangTiemNang.MaNganhNghe = null;
                                        break;
                                }
                                var doanhThu = !string.IsNullOrEmpty(reader.GetValue(14)?.ToString()) ? reader.GetValue(14).ToString() : null;
                                switch (doanhThu)
                                {
                                    case "Dưới 1 tỉ đồng":
                                        khachHangTiemNang.MaDoanhThu = 1;
                                        break;
                                    case "Từ 1 tỉ đồng đến 3 tỉ đồng":
                                        khachHangTiemNang.MaDoanhThu = 2;
                                        break;
                                    case "Từ 3 tỉ đến 5 tỉ đồng":
                                        khachHangTiemNang.MaDoanhThu = 3;
                                        break;
                                    case "Trên 5 tỉ đồng":
                                        khachHangTiemNang.MaDoanhThu = 4;
                                        break;
                                    default:
                                        khachHangTiemNang.MaDoanhThu = null;
                                        break;
                                }
                                string ngayThanhLap = !string.IsNullOrEmpty(reader.GetValue(15)?.ToString()) ? reader.GetValue(15).ToString() : null;
                                if (ngayThanhLap == null)
                                    khachHangTiemNang.NgayThanhLap = null;
                                else
                                {
                                    DateTime dateValue = DateTime.ParseExact(ngayThanhLap, "M/d/yyyy h:mm:ss tt", CultureInfo.InvariantCulture);
                                    khachHangTiemNang.NgayThanhLap = dateValue;
                                }

                                khachHangTiemNang.DiaChi = !string.IsNullOrEmpty(reader.GetValue(16)?.ToString()) ? reader.GetValue(16).ToString() : null;
                                khachHangTiemNang.ThongTinMoTa = !string.IsNullOrEmpty(reader.GetValue(17)?.ToString()) ? reader.GetValue(17).ToString() : null;
                                khachHangTiemNang.PhongBanId = phongBanId;
                                khachHangTiemNang.NguoiDungId = userId;
                                khachHangTiemNang.IsDungChung = false;
                                khachHangTiemNang.CreateAt = DateTime.Now;
                                khachHangTiemNang.IsDeleted = false;
                                khachHangTiemNang.IsChuyenDoi = false;
                                _dbContext.KhachHangTiemNangs.Add(khachHangTiemNang);
                                await _dbContext.SaveChangesAsync();

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
        [HttpPut("updatekhachhangtiemnang")]
        [JwtAuthorize]
        public async Task<IActionResult> UpdateKhachHangTiemNang(KhachHangTiemNangModel model)
        {
            try
            {
                ResultModal result = await _khachHangTiemNangServices.ChinhSuaKhachHangTiemNangAsync(model);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("bangiaokhachhangtiemnang")]
        [JwtAuthorize]
        public async Task<IActionResult> BanGiaoKhachHangTiemNang(Guid id, Guid userId)
        {
            try
            {
                ResultModal result = await _khachHangTiemNangServices.BanGiaoKhachHangTiemNang(id, userId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("phuchoihangloat")]
        [JwtAuthorize]
        public async Task<IActionResult> PhucHoiHangLoatKhachHangTiemNang(List<KhachHangTiemNangModel> models)
        {
            try
            {
                ResultModal result = await _khachHangTiemNangServices.PhucHoiLoatKhTiemNangAsync(models);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut("bangiaohangloat/{UserId}")]
        [JwtAuthorize]
        public async Task<IActionResult> BanGiaoHangLoat(List<BanGiaoList> modals, Guid UserId)
        {
            try
            {
                ResultModal result = await _khachHangTiemNangServices.BanGiaoHangLoat(modals, UserId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("deletekhachhangtiemnang/{id}")]
        [JwtAuthorize]
        public async Task<IActionResult> DeleteKhachHangTiemNang(Guid id)
        {
            try
            {
                ResultModal result = await _khachHangTiemNangServices.XoaKhachHangTiemNangAsync(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("deletehangloat")]
        [JwtAuthorize]
        public async Task<IActionResult> DeleteHangLoatKhachHangTiemNang(List<KhachHangTiemNangModel> models)
        {
            try
            {
                ResultModal result = await _khachHangTiemNangServices.XoaHangLoatKhTiemNangAssync(models);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }



    }
}


