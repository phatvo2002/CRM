using CRM.Attributes;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using CRM.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhachHangTiemNangController : ControllerBase
    {
        private readonly IKhachHangTiemNangServices _khachHangTiemNangServices;

        public KhachHangTiemNangController(IKhachHangTiemNangServices khachHangTiemNangServices)
        {
            _khachHangTiemNangServices = khachHangTiemNangServices;
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


