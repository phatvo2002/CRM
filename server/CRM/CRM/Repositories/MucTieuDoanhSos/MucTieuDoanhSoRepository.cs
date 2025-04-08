using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using Microsoft.EntityFrameworkCore;

namespace CRM.Repositories.MucTieuDoanhSos
{
    public class MucTieuDoanhSoRepository : BaseRepository<MucTieuDoanhSo, MucTieuDoanhSoModal, Guid, MucTieuDoanhSoDTO>, IMucTieuDoanhSoRepository
    {
        public MucTieuDoanhSoRepository(CrmDbContext crmDbContext, IMapper mapper) : base(crmDbContext, mapper)
        {
        }

        public async Task<ResultModal> CreateMucTieuDoanhSo(MucTieuDoanhSoModal modal, Guid nguoiDungId)
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
                    mucTieuDoanhSo.SoKhachHangTiemNangDaChuyenDoiThucTe = 0;
                    mucTieuDoanhSo.DoanhSo = modal.DoanhSo;
                    mucTieuDoanhSo.DoanhSoThucTe = 0;
                    mucTieuDoanhSo.IsDatMucTieu = false;
                    mucTieuDoanhSo.MaTrangThaiKPI = modal.MaTrangThaiKPI;
                    mucTieuDoanhSo.NguoiDungId = modal.NguoiDungId;
                    mucTieuDoanhSo.PhongBanId = modal.PhongBanId;
                    mucTieuDoanhSo.CreateAt = DateTime.UtcNow;
                    mucTieuDoanhSo.IsDeleted = false;
                    mucTieuDoanhSo.NguoiTaoId = nguoiDungId;
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

        public async Task<List<MucTieuDoanhSoDTO>> GetAll(DateTime tuNgay, DateTime denNgay)
        {
            var db = await _crmDbContext.MucTieuDoanhSos.Where(m => m.CreateAt >= tuNgay && m.CreateAt <= denNgay && m.IsDeleted == false)
                .Include(r => r.KPINhanViens).Include(r => r.Nguoidung).Include(r => r.PhongBan)
                .ThenInclude(r => r.KPINhanViens).ThenInclude(r => r.Nguoidung).ThenInclude(r => r.PhongBan).ToListAsync();

            return _mapper.Map<List<MucTieuDoanhSoDTO>>(db);

        }

        public async Task<List<MucTieuDoanhSoDTO>> GetAllByPhongBan(DateTime tuNgay, DateTime denNgay, Guid phongBanId)
        {
            var db = await _crmDbContext.MucTieuDoanhSos.Where(m => m.PhongBanId == phongBanId && m.CreateAt >= tuNgay && m.CreateAt <= denNgay && m.IsDeleted == false)
                .Include(r => r.KPINhanViens).Include(r => r.Nguoidung).Include(r => r.PhongBan)
                .ThenInclude(r => r.KPINhanViens).ThenInclude(r => r.Nguoidung).ThenInclude(r => r.PhongBan).ToListAsync();
            return _mapper.Map<List<MucTieuDoanhSoDTO>>(db);
        }

        public async Task<ResultModal> UpdateMucTieuDoanhSo(MucTieuDoanhSoModal modal)
        {
            var db = _crmDbContext.MucTieuDoanhSos.Where(r => r.Id == modal.Id).FirstOrDefault();
            if (db != null)
            {
                _mapper.Map(modal, db);
                _crmDbContext.MucTieuDoanhSos.Update(db);
                await _crmDbContext.SaveChangesAsync();
                return new ResultModal() { Status = 200, Message = "Chỉnh sửa dữ liệu thành công", Success = true };
            }
            else return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
        }

        public async Task<ResultModal> UpdateMucTieuDoanhSoData(Guid nguoiDungId, Guid phongBanId, DateTime tuNgay, DateTime denNgay, int type, double? doanhSo)
        {
            var dbNguoiDung = _crmDbContext.Nguoidungs.FirstOrDefault(r => r.Id == nguoiDungId && r.IsDelete == false);
            if ((dbNguoiDung?.CheckIsTruongPhong == false && dbNguoiDung.CheckIsGiamDoc == false) || dbNguoiDung?.MaPhongBan != Guid.Parse("4D086C61-CC35-40D4-B9D9-816063DF1C32"))
            {
                var dbKPi = _crmDbContext.KPINhanViens.FirstOrDefault(r => r.NguoiDungId == nguoiDungId && r.IsDeleted == false && r.CreateAt >= tuNgay && r.CreateAt <= denNgay);
                if (dbKPi != null)
                {
                    switch (type)
                    {
                        case 1:
                            { dbKPi.SoCuocGoiThucTe += 1; }
                            break;
                        case 2:
                            { dbKPi.SoLichHenThucTe += 1; }
                            break;
                        case 3:
                            { dbKPi.SoKhachHangTiemNangDaChuyenDoiThucTe += 1; }
                            break;
                        case 4:
                            { dbKPi.SoEmailBaoGiaThucTe += 1; }
                            break;
                        case 5:
                            { dbKPi.SoEmailTruongTacKhachHangThucTe += 1; }
                            break;
                        case 6:
                            { dbKPi.DoanhSoThucTe += doanhSo; }
                            break;
                        default:
                            break;
                    }

                    _crmDbContext.KPINhanViens.Update(dbKPi);
                }
                else throw new Exception("Không tìm thấy dữ liệu");

                var dbMucTieu = _crmDbContext.MucTieuDoanhSos.FirstOrDefault(r => r.PhongBanId == phongBanId && r.IsDeleted == false && r.CreateAt >= tuNgay && r.CreateAt <= denNgay);
                if (dbMucTieu != null)
                {
                    switch (type)
                    {
                        case 1:
                            { dbMucTieu.SoCuocGoiThucTe += 1; }
                            break;
                        case 2:
                            { dbMucTieu.SoLichHenThucTe += 1; }
                            break;
                        case 3:
                            { dbMucTieu.SoKhachHangTiemNangDaChuyenDoiThucTe += 1; }
                            break;
                        case 4:
                            { dbMucTieu.SoEmailBaoGiaThucTe += 1; }
                            break;
                        case 5:
                            { dbMucTieu.SoEmailTruongTacKhachHangThucTe += 1; }
                            break;
                        case 6:
                            { dbMucTieu.DoanhSoThucTe += doanhSo; }
                            break;
                        default:
                            break;
                    }
                    _crmDbContext.MucTieuDoanhSos.Update(dbMucTieu);
                }
                else throw new Exception("Không tìm thấy dữ liệu");

                await _crmDbContext.SaveChangesAsync();

                return new ResultModal() { Status = 200, Message = "Chỉnh sủa thành công", Success = true };
            }
            else return new ResultModal() { Status = 202, Message = "Dữ liệu không phù hợp", Success = true };
        }
    }
}
