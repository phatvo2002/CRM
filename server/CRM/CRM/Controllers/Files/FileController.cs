using CRM.Attributes;
using CRM.DTO;
using CRM.Helper;
using CRM.Modal;
using CRM.Services.BaoGias;
using CRM.Services.DonHangs;
using CRM.Services.HangHoaQuanTams;
using Microsoft.AspNetCore.Mvc;
using OpenXmlPowerTools;
using System.Globalization;
namespace CRM.Controllers.Files
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IBaoGiaServices _baoGiaServices;
        private readonly IHangHoaQuanTamServices _hangHoaQuanTamServices;
        private readonly IDonHangServices _donHangServices;
        private readonly IHangHoaQuanTamServices _hoaQuanTamServices;
        private readonly ILogger _logger;   
        public FileController(IWebHostEnvironment webHostEnvironment, IBaoGiaServices baoGiaServices, IHangHoaQuanTamServices hangHoaQuanTamServices, IDonHangServices donHangServices, IHangHoaQuanTamServices hoaQuanTamServices, ILogger logger)
        {
            _webHostEnvironment = webHostEnvironment;
            _baoGiaServices = baoGiaServices;
            _hangHoaQuanTamServices = hangHoaQuanTamServices;
            _donHangServices = donHangServices;
            _hoaQuanTamServices = hoaQuanTamServices;
            _logger = logger;
        }
        [HttpGet("file")]
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

                    //var fileContentResult = new FileContentResult(fileBytes, contentType)
                    //{
                    //    FileDownloadName = filename
                    //};
                    //return fileContentResult;
                    return File(fileBytes, contentType, filename);
                }
                else
                    return Ok(new { Message = "Không tìm thấy file" });
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(new { ex.Message });
            }

        }
        [HttpGet("image")]
        //[JwtAuthorize]
        public IActionResult GetImage(string path)
        {
            if (string.IsNullOrEmpty(path))
                return Ok(new { Messages = "Vui lòng nhập đường dẫn file." });
            string extension;
            extension = Path.GetExtension(path);
            var filePath = Path.Combine(_webHostEnvironment.WebRootPath, path);

            if (System.IO.File.Exists(filePath))
            {
                byte[] fileBytes = System.IO.File.ReadAllBytes(filePath);
                var contentType = Until.GetmimeType(extension);
                if (extension == ".png" || extension == ".jpg" || extension == ".jpeg")
                {
                    return File(fileBytes, contentType);
                }
            }

            return Ok(null);
        }
        [HttpPost("exportbaogia/{baoGiaId}")]
        //[JwtAuthorize]
        public async Task<IActionResult> ExportBaoGia(Guid baoGiaId)
        {
            try
            {
                ExportBaoGiaModal modal = new ExportBaoGiaModal();

                BaoGiaDTO baoGiaResult = await _baoGiaServices.GetBaoGiaById(baoGiaId);

                var hangHoaResult = await _hangHoaQuanTamServices.GetHangHoaQuanTamByBaoGiaId(baoGiaId);
                List<ExportHangHoaQuanTamDTO> hanghoa = new List<ExportHangHoaQuanTamDTO>();
                foreach (var item in hangHoaResult)
                {
                    ExportHangHoaQuanTamDTO h = new ExportHangHoaQuanTamDTO();
                    h.TenHangHoa = item?.TenHangHoa;
                    h.TenDonViTinh = item?.DonViTinh?.Name;
                    h.SoLuong = item?.SoLuong;
                    h.DonGia = item?.DonGia?.ToString("N0", new CultureInfo("vi-VN"));
                    h.ThanhTien = item?.ThanhTien;
                    h.ThueSuat = item?.ThueSuat;
                    h.TongTien = item?.TongTien;
                    h.ThanhTienFormat = item?.ThanhTien?.ToString("N0", new CultureInfo("vi-VN"));
                    h.TongTienFormat = item?.TongTien?.ToString("N0", new CultureInfo("vi-VN"));
                    hanghoa.Add(h);
                }
                DateTime dateTime = DateTime.UtcNow.Date;
                modal.BaoGia = baoGiaResult;
                modal.Ngay = dateTime.Day.ToString();
                modal.Thang = dateTime.Month.ToString();
                modal.Nam = dateTime.Year.ToString();
                modal.HangHoaQuanTam = hanghoa;
                modal.TongTien = hangHoaResult.Sum(r => (decimal)r.TongTien);
                modal.NguoiDung = baoGiaResult.NguoiDung;
                var pathTemplate = $"{_webHostEnvironment.WebRootPath}\\Templates\\baogiadonhang.docx";
                FileInfo templateDoc = new(pathTemplate);
                var obj = Until.ObjectToXml<ExportBaoGiaModal>(modal);
                WmlDocument wmlDoc = new(templateDoc.FullName);
                bool templateError;
                WmlDocument wmlAssembledDoc = DocumentAssembler.AssembleDocument(wmlDoc, obj, out templateError);
                string fileName = $"baogiadonhang.docx";
                byte[] data = wmlAssembledDoc.DocumentByteArray;
                return File(data, "application/vnd.openxmlformats-officedocument.wordprocessingml.document", fileName);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("exportdonhang/{donHangId}")]
        //[JwtAuthorize]
        public async Task<IActionResult> ExportDonhang(Guid donHangId)
        {
            ExportDonHangModal modal = new ExportDonHangModal();
            DonHangDTO result = await _donHangServices.GetDonHangId(donHangId);
            List<ExportHangHoaQuanTamDTO> hanghoas = new List<ExportHangHoaQuanTamDTO>();
            var hangHoa = await _hangHoaQuanTamServices.GetHangHoaQuanTamByDonHangid(donHangId);
            modal.DonHang = result;
            int stt = 1;
            try
            {
                foreach (var item in hangHoa)
                {
                    ExportHangHoaQuanTamDTO hangHoaDTO = new ExportHangHoaQuanTamDTO();
                    hangHoaDTO.STT = stt;
                    hangHoaDTO.TenHangHoa = item.TenHangHoa;
                    hangHoaDTO.TenDonViTinh = item?.DonViTinh?.Name;
                    hangHoaDTO.SoLuong = item?.SoLuong;
                    hangHoaDTO.DonGia = item?.DonGia?.ToString("N0", new CultureInfo("vi-VN"));
                    hangHoaDTO.ThanhTienFormat = item?.ThanhTien?.ToString("N0", new CultureInfo("vi-VN"));
                    hangHoaDTO.TongTienFormat = item?.TongTien?.ToString("N0", new CultureInfo("vi-VN"));
                    hangHoaDTO.TienThue = item?.TienThue;
                    hanghoas.Add(hangHoaDTO);
                    stt++;
                }
                modal.HangHoas = hanghoas;
                modal.TongTienHang = hangHoa.Sum(r => r.ThanhTien)?.ToString("N0", new CultureInfo("vi-VN"));
                modal.TongTienThue = hangHoa.Sum(r => r.TienThue)?.ToString("N0", new CultureInfo("vi-VN"));
                modal.TongChietKhau = hangHoa.Sum(r => r.ChiecKhauDonHang)?.ToString("N0", new CultureInfo("vi-VN"));
                modal.TongTienThanhToan = Math.Round(
                (decimal)((hangHoa.Sum(r => r.ThanhTien ?? 0) + hangHoa.Sum(r => r.TienThue ?? 0)) - hangHoa.Sum(r => r.ChiecKhauDonHang ?? 0))).ToString("N0", new CultureInfo("vi-VN"));
                modal.ThoiGianGiaoHang = result.HanGiaoHang?.ToString("yyyy-MM-dd HH:mm:ss");
                modal.ThoiGianThanhToan = result.HanThanhToan?.ToString("yyyy-MM-dd HH:mm:ss");
                var ngaytao = DateTime.Now;
                modal.Ngay = ngaytao.ToString("dd");
                modal.Thang = ngaytao.ToString("mm");
                modal.Nam = ngaytao.ToString("yyyy");
                var pathTemplate = $"{_webHostEnvironment.WebRootPath}\\Templates\\dondathang.docx";
                FileInfo templateDoc = new(pathTemplate);
                var obj = Until.ObjectToXml<ExportDonHangModal>(modal);
                WmlDocument wmlDoc = new(templateDoc.FullName);
                bool templateError;
                WmlDocument wmlAssembledDoc = DocumentAssembler.AssembleDocument(wmlDoc, obj, out templateError);
                string fileName = $"dondathang.docx";
                byte[] data = wmlAssembledDoc.DocumentByteArray;
                return File(data, "application/vnd.openxmlformats-officedocument.wordprocessingml.document", fileName);


            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
    }

}

