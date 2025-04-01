using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.MucTieuDoanhSos
{
    public class MucTieuDoanhSoRepository : BaseRepository<MucTieuDoanhSo, MucTieuDoanhSoModal, Guid, MucTieuDoanhSoDTO>, IMucTieuDoanhSoRepository
    {
        public MucTieuDoanhSoRepository(CrmDbContext crmDbContext, IMapper mapper) : base(crmDbContext, mapper)
        {
        }

        public async Task<ResultModal> CreateMucTieuDoanhSo(MucTieuDoanhSoModal modal)
        {
            var db = _crmDbContext.MucTieuDoanhSos.FirstOrDefault(m => m.Id == modal.Id);
            try
            {
                if (db == null)
                {
                    MucTieuDoanhSo mucTieuDoanhSo = new MucTieuDoanhSo();
                    mucTieuDoanhSo.Id = Guid.NewGuid();
                    mucTieuDoanhSo.TenKPI = modal.TenKPI;
                    mucTieuDoanhSo.MaQuanLy = modal.MaQuanLy;
                    mucTieuDoanhSo.TenPhongBan = modal.TenPhongBan;
                    mucTieuDoanhSo.NgayBatDau = modal.NgayBatDau;
                    mucTieuDoanhSo.NgayKetThuc = modal.NgayKetThuc;
                    mucTieuDoanhSo.SoCuocGoi = modal.SoCuocGoi;
                    mucTieuDoanhSo.SoCuocGoiThucTe = 0;
                    mucTieuDoanhSo.SoLichHen = modal.SoLichHen;
                    mucTieuDoanhSo.SoLichHenThucTe = 0;
                    mucTieuDoanhSo.SoEmailTuongTacKhachHang = modal.SoEmailTuongTacKhachHang;
                    mucTieuDoanhSo.SoEmailTruongTacKhachHangThucTe = 0;
                    mucTieuDoanhSo.SoEmailBaoGia = modal.SoEmailBaoGia;
                    mucTieuDoanhSo.SoEmailBaoGiaThucTe = 0;
                    mucTieuDoanhSo.SoKhachHangTiemNangDaChuyenDoi = modal.SoKhachHangTiemNangDaChuyenDoi;
                    mucTieuDoanhSo.DoanhSo = modal.DoanhSo;
                    mucTieuDoanhSo.DoanhSoThucTe = 0;
                    mucTieuDoanhSo.IsDatMucTieu = false;
                    mucTieuDoanhSo.MaTrangThaiKPI = modal.MaTrangThaiKPI;
                    mucTieuDoanhSo.TongTiLeThucTe = 0;
                    mucTieuDoanhSo.NguoiDungId = modal.NguoiDungId;
                    mucTieuDoanhSo.PhongBanId = modal.PhongBanId;
                    mucTieuDoanhSo.CreateAt = DateTime.UtcNow;
                    mucTieuDoanhSo.IsDeleted = false;
                    _crmDbContext.MucTieuDoanhSos.Add(mucTieuDoanhSo);
                    await _crmDbContext.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Thêm mục tiêu thành công", Success = true };
                }
                else return new ResultModal() { Status = 200, Message = "Dữ liệu đã tồn tại", Success = true };
            }
            catch (Exception ex)
            {
                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };
            }
        }
    }
}
