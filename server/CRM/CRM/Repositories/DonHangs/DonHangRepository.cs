using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.DonHangs
{
    public class DonHangRepository : BaseRepository<DonHang, DonHangModal, Guid, DonHangDTO>, IDonHangRepository
    {
        private readonly IMapper _mapper;
        public DonHangRepository(CrmDbContext crmDbContext, IMapper mapper) : base(crmDbContext, mapper)
        {
            _mapper = mapper;
        }

        public async Task<ResultModal> ConvertDonHang(DonHangModal modal, Guid nguoiDungId, Guid phongBanId)
        {
            try
            {
                var db = _crmDbContext.DonHangs.Where(r => r.Id == modal.Id).FirstOrDefault();
                if (db != null)
                {
                    DonHang donHang = new DonHang();
                    _mapper.Map<DonHang>(modal);
                    donHang.Id = Guid.NewGuid();
                    donHang.SoTienConPhaiThu = modal.GiaTriDonHang;
                    donHang.ThucThuDonHang = 0;
                    donHang.NguoiDungId = nguoiDungId;
                    donHang.PhongBanId = phongBanId;
                    donHang.IsDeleted = false;
                    donHang.CreateAt = DateTime.Now;
                    _crmDbContext.DonHangs.Add(donHang);

                    foreach (var item in modal.HangHoaQuanTam)
                    {
                        HangHoaQuanTam hangHoaQuanTam = new HangHoaQuanTam();
                        hangHoaQuanTam.Id = Guid.NewGuid();
                        hangHoaQuanTam.MaHangHoaId = item.MaHangHoaId;
                        hangHoaQuanTam.TenHangHoa = item.TenHangHoa;
                        hangHoaQuanTam.KhachHangId = donHang.MaKhachHang;
                        hangHoaQuanTam.KhachHangTiemNangId = null;
                        hangHoaQuanTam.CoHoiId = null;
                        hangHoaQuanTam.SoLuong = item.SoLuong;
                        hangHoaQuanTam.ThanhTien = item.ThanhTien;
                        hangHoaQuanTam.TongTien = item.TongTien;
                        hangHoaQuanTam.ThueSuat = item.ThueSuat;
                        hangHoaQuanTam.TienThue = item.TienThue;
                        hangHoaQuanTam.DonGia = item.DonGia;
                        hangHoaQuanTam.ChiecKhauDonHang = item.ChiecKhauDonHang;
                        hangHoaQuanTam.HoaDonId = donHang.Id;
                        _crmDbContext.HangHoaQuanTams.Add(hangHoaQuanTam);
                    }
                    await _crmDbContext.SaveChangesAsync();
                    return new ResultModal() { Message = "Tạo đơn hàng thành công", Status = 200, Success = true };
                }
                return new ResultModal() { Message = "Đơn hàng đã tồn tại trong hệ thống", Status = 202, Success = true };
            }
            catch (Exception ex)
            {
                return new ResultModal() { Message = ex.Message, Status = 500, Success = true };
            }
        }
    }
}
