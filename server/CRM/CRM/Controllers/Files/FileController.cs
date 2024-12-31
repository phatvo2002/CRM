using CRM.Helper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.Files
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        public FileController(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }
        [HttpGet("file")]
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
    }
}
