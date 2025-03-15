using CRM.Attributes;
using CRM.DTO;
using CRM.Helper;
using CRM.Modal;
using CRM.Services.BaoGias;
using CRM.Services.DonHangs;
using CRM.Services.HangHoaQuanTams;
using Microsoft.AspNetCore.Mvc;
using OpenXmlPowerTools;
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
        public FileController(IWebHostEnvironment webHostEnvironment, IBaoGiaServices baoGiaServices, IHangHoaQuanTamServices hangHoaQuanTamServices, IDonHangServices donHangServices, IHangHoaQuanTamServices hoaQuanTamServices)
        {
            _webHostEnvironment = webHostEnvironment;
            _baoGiaServices = baoGiaServices;
            _hangHoaQuanTamServices = hangHoaQuanTamServices;
            _donHangServices = donHangServices;
            _hoaQuanTamServices = hoaQuanTamServices;
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
        [JwtAuthorize]
        public async Task<IActionResult> ExportBaoGia(Guid baoGiaId)
        {
            try
            {
                ExportBaoGiaModal modal = new ExportBaoGiaModal();

                BaoGiaDTO baoGiaResult = await _baoGiaServices.GetBaoGiaById(baoGiaId);

                var hangHoaResult = await _hangHoaQuanTamServices.GetHangHoaQuanTamByBaoGiaId(baoGiaId);
                List<HangHoaQuanTamDTO> hanghoa = new List<HangHoaQuanTamDTO>();
                foreach (var item in hangHoaResult)
                {
                    HangHoaQuanTamDTO h = new HangHoaQuanTamDTO();
                    h.MaHangHoaId = item.MaHangHoaId;
                    h.SoLuong = item.SoLuong;
                    h.DonGia = item.DonGia;
                    hanghoa.Add(h);
                }
                DateTime dateTime = DateTime.UtcNow.Date;
                modal.BaoGia = baoGiaResult;
                modal.Ngay = dateTime.Day.ToString();
                modal.Thang = dateTime.Month.ToString();
                modal.Nam = dateTime.Year.ToString();
                modal.HangHoaQuanTam = hanghoa;
                modal.TongTien = hangHoaResult.Sum(r => (decimal)r.ThanhTien);
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
                return BadRequest(ex.Message);
            }
        }
        //[HttpGet("exportdonhang")]
        ////[JwtAuthorize]
        //public async Task<IActionResult> ExportDonhang(Guid donHangId, int type)
        //{
        //    try
        //    {
        //        ExportDonHangModal modal = new ExportDonHangModal();
        //        DonHangDTO result = await _donHangServices.GetDonHangId(donHangId);
        //        List<HangHoaQuanTamDTO> hangHoa = await _hangHoaQuanTamServices.GetHangHoaQuanTamByDonHangid(donHangId);
        //        modal.DonHangDTO = result;
        //        var pathTemplate = $"{_webHostEnvironment.WebRootPath}\\Templates\\dondathang.docx";
        //        if (type == 0)
        //        {
        //            FileInfo templateDoc = new(pathTemplate);
        //            var obj = Until.ObjectToXml<ExportDonHangModal>(modal);
        //            WmlDocument wmlDoc = new(templateDoc.FullName);
        //            bool templateError;
        //            WmlDocument wmlAssembledDoc = DocumentAssembler.AssembleDocument(wmlDoc, obj, out templateError);
        //            string fileName = $"dondathang.docx";
        //            byte[] data = wmlAssembledDoc.DocumentByteArray;
        //            return File(data, "application/vnd.openxmlformats-officedocument.wordprocessingml.document", fileName);
        //        }
        //        else
        //        {
        //            var report = new XLTemplate(pathTemplate);
        //            report.AddVariable("info", result);
        //            report.AddVariable("data", hangHoa);
        //        }

        //    }
        //    catch (Exception ex)
        //    {

        //        return BadRequest(ex.Message);
        //    }
        //}
    }

}

