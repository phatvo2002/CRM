using CRM.Attributes;
using CRM.DTO;
using CRM.Services.GetDatas;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.GetDatas
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class GetDataController : ControllerBase
    {
        private readonly IGetDataServices _getDataServices;
        public GetDataController(IGetDataServices getDataServices)
        {
            _getDataServices = getDataServices;
        }
        [HttpGet("getallphongbankhachhang")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllPhongBanKhachHang()
        {
            try
            {
                List<PhongBanKhachHangDTO> result = await _getDataServices.GetAllPhongBanKhachHang();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getallnguongockhachhang")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllNguonGocKhachHang()
        {
            try
            {
                List<NguonGocKhachHangDTO> result = await _getDataServices.GetAllNguonGocKhachHang();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getallloaitiemnang")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllLoaiTiemNang()
        {
            try
            {
                List<LoaiTiemNangDTO> result = await _getDataServices.GetAllLoaiTiemNang();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getallloaihinhnghenghiep")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllLoaiHinhNgheNghiep()
        {
            try
            {
                List<LoaiHinhNgheNghiepDTO> result = await _getDataServices.GetAllLoaiHinhNgheNghiep();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getallnganhnghebylinhvuc/{maLinhVuc}")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllNganhNgheByLinhVucid(int maLinhVuc)
        {
            try
            {
                List<NganhNgheDTO> result = await _getDataServices.GetAllNganhNgheByLinhVucId(maLinhVuc);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getalllinhvucnghenghiep")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllLinhVucNgheNghiep()
        {
            try
            {
                List<LinhVucNgheNghiepDTO> result = await _getDataServices.GetAllLinhVucNgheNghiep();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getalldoanhthu")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllDoanhThu()
        {
            try
            {
                List<DoanhThuDTO> result = await _getDataServices.GetAllDoanhThu();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getalltrangthaithuchien")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllTrangThaiThucHien()
        {
            try
            {
                List<TrangThaiThucHienDTO> result = await _getDataServices.GetAllTrangThaiThucHien();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getallmucdouutien")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllMucDoUuTien()
        {
            try
            {
                List<MucDoUuTienDTO> result = await _getDataServices.GetAllMucDoUuTien();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getallloaicuocgoi")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllLoaiCuocGoi()
        {
            try
            {
                List<LoaiCuocGoiDTO> result = await _getDataServices.GetAllLoaiCuocGoi();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getallketquacuocgoi")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllKetQuaCuocGoi()
        {
            try
            {
                List<KetQuaCuocGoiDTO> result = await _getDataServices.GetAllKetQuaCuocGoi();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
