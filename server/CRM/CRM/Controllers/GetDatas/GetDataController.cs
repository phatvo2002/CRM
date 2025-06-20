using CRM.Attributes;
using CRM.DTO;
using CRM.Services.GetDatas;
using Microsoft.AspNetCore.Mvc;

namespace CRM.Controllers.GetDatas
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class GetDataController : ControllerBase
    {
        private readonly IGetDataServices _getDataServices;
        private readonly ILogger<GetDataController> _logger;
        public GetDataController(IGetDataServices getDataServices, ILogger<GetDataController> logger)
        {
            _getDataServices = getDataServices;
            _logger = logger;
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
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
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
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
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
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
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
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
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
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
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
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
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
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
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
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
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
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
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
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
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
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getallloaidubao")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllLoaiDuBao()
        {
            try
            {
                List<ClassDTO> result = await _getDataServices.GetAllLoaiDuBao();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getallphanloaidubao")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllPhanLoaiDuBao()
        {
            try
            {
                List<ClassDTO> result = await _getDataServices.GetAllPhanLoaiDuBao();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getallloaicohoi")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllLoaiCoHoi()
        {
            try
            {
                List<ClassDTO> result = await _getDataServices.GetAllLoaiCoHoi();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }

        }
        [HttpGet("getalltinhtrangbaogia")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllTinhTrangBaoGia()
        {
            try
            {
                List<ClassDTO> result = await _getDataServices.GetAllTinhTrangBaoGia();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getalltinhtrangDonHang")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllTinhTrangDonHang()
        {
            try
            {
                List<ClassDTO> result = await _getDataServices.GetAllTinhTrangDonHang();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getallloaidonhang")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllLoaiDonHang()
        {
            try
            {
                List<ClassDTO> result = await _getDataServices.GetAllLoaiDoanhang();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogInformation("{Time}", DateTime.Now);
                _logger.LogError(ex.Message);
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("getalltinhtrangghdoanhso")]
        [JwtAuthorize]
        public async Task<IActionResult> GetAllTinhTrangGhiDoanhSo()
        {
            try
            {
                List<ClassDTO> result = await _getDataServices.GetAllTinhTrangGhiDoanhSo();
                return Ok(result);
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
