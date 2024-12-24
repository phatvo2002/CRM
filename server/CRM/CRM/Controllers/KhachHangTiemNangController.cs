using CRM.Attributes;
using CRM.DTO;
using CRM.Entities;
using CRM.Helper;
using CRM.Modal;
using CRM.Services.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class KhachHangTiemNangController : ControllerBase
    {
        private readonly IKhachHangTiemNangServices _khachHangTiemNangServices;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public KhachHangTiemNangController(IKhachHangTiemNangServices khachHangTiemNangServices , IWebHostEnvironment webHostEnvironment)
        {
            _khachHangTiemNangServices = khachHangTiemNangServices;
            _webHostEnvironment = webHostEnvironment;
        }
        [HttpGet("getallkhachhangtiemnang")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllKhachHangTiemNang()
        {
            try
            {
                List<KhachHangTiemNangDTO> result = await _khachHangTiemNangServices.GetAllKhachHangTiemNangAsync();
                return Ok(result);
            }catch (Exception ex)
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
            }catch
            (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getTemplate")]
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
        public async Task<IActionResult> GetKhachHangTiemNangByNguoiDungId(Guid Id)
        {
            try
            {
                List<KhachHangTiemNangDTO> result = await _khachHangTiemNangServices.GetKhachHangTiemNangByNguoiDungIdAsync(Id);
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
        public async Task<IActionResult> GetKhachHangTiemNangByPhongBanId(Guid phongBanId)
        {
            try
            {
                List<KhachHangTiemNangDTO> result = await _khachHangTiemNangServices.GetKhachHangTiemNangByPhongBanIdAsync(phongBanId);
                return Ok(result);
            }
            catch
            (Exception ex)
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
                ResultModal result = await _khachHangTiemNangServices.ThemMoiKhachHangTiemNangAsync(model);
                return Ok(result);
            }catch (Exception ex)
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
    }
}


