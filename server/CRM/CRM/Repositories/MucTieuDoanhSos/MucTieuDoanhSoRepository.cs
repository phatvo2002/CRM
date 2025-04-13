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
            List<MucTieuDoanhSoDTO> result = new List<MucTieuDoanhSoDTO>();
            var db = await _crmDbContext.MucTieuDoanhSos.Where(m => m.CreateAt >= tuNgay && m.CreateAt <= denNgay && m.IsDeleted == false)
                .Include(r => r.KPINhanViens).Include(r => r.Nguoidung).Include(r => r.PhongBan)
                .ThenInclude(r => r.KPINhanViens).ThenInclude(r => r.Nguoidung).ThenInclude(r => r.PhongBan).ToListAsync();
            var dbXepLoai = await _crmDbContext.XepLoais.ToListAsync();
            foreach (var item in db)
            {
                MucTieuDoanhSoDTO mucTieu = new MucTieuDoanhSoDTO();
                mucTieu.Id = item.Id;
                mucTieu.TenKPI = item.TenKPI;
                mucTieu.MaQuanLy = item.MaQuanLy;
                mucTieu.TenPhongBan = item.TenPhongBan;
                mucTieu.NgayBatDau = item.NgayBatDau;
                mucTieu.NgayKetThuc = item.NgayKetThuc;
                mucTieu.SoCuocGoi = item.SoCuocGoi;
                mucTieu.SoCuocGoiThucTe = item.SoCuocGoiThucTe;
                mucTieu.TileCuocGoiThucTe = item.TileCuocGoiThucTe;
                mucTieu.SoLichHen = item.SoLichHen;
                mucTieu.SoLichHenThucTe = item.SoLichHenThucTe;
                mucTieu.TileLichHenThucTe = item.TileLichHenThucTe;
                mucTieu.SoEmailTuongTacKhachHang = item.SoEmailTuongTacKhachHang;
                mucTieu.SoEmailTruongTacKhachHangThucTe = item.SoEmailTruongTacKhachHangThucTe;
                mucTieu.TileEmailTuongTacThucTe = item.TileEmailTuongTacThucTe;
                mucTieu.SoEmailBaoGia = item.SoEmailBaoGia;
                mucTieu.SoEmailBaoGiaThucTe = item.SoEmailBaoGiaThucTe;
                mucTieu.TiLeEmailBaoGiaThucTe = item.TileEmailTuongTacThucTe;
                mucTieu.SoKhachHangTiemNangDaChuyenDoi = item.SoKhachHangTiemNangDaChuyenDoi;
                mucTieu.SoKhachHangTiemNangDaChuyenDoiThucTe = item.SoKhachHangTiemNangDaChuyenDoiThucTe;
                mucTieu.DoanhSo = item.DoanhSo;
                mucTieu.DoanhSoThucTe = item.DoanhSoThucTe;
                mucTieu.TiLeDoanhSoThucTe = item.TiLeDoanhSoThucTe;
                mucTieu.TongTiLeThucTe = item.TongTiLeThucTe;
                foreach (var item1 in dbXepLoai)
                {
                    if (item.TongTiLeThucTe >= (decimal)item1.TuDiem && item.TongTiLeThucTe <= (decimal)item1.DenDiem)
                    {
                        mucTieu.XepLoai = item1.TenXepLoai;
                        mucTieu.Color = item1.MaMau;
                    }

                }
                if (item.Nguoidung != null)
                {
                    mucTieu.NguoiDung = new NguoiDungDTO
                    {
                        Id = item.Nguoidung.Id,
                        HinhAnh = item.Nguoidung.HinhAnh,
                        Ten = item.Nguoidung.Ten,
                        HoVaDem = item.Nguoidung.HoVaDem,
                    };
                }
                if (item.PhongBan != null)
                {
                    mucTieu.PhongBan = new PhongBanDTO
                    {
                        Id = item.PhongBan.Id,
                        TenPhongBan = item.PhongBan.TenPhongBan,
                        SoThuTu = item.PhongBan.SoThuTu
                    };

                }
                mucTieu.KPINhanViens = item.KPINhanViens?
                        .Select(item2 => new KPINhanVienDTO
                        {
                            Id = item2.Id,
                            TenKPI = item2.TenKPI,
                            MaQuanLy = item2.MaQuanLy,
                            TenNhanVien = item2.TenNhanVien,
                            NgayBatDau = item2.NgayBatDau ?? DateTime.MinValue,
                            NgayKetThuc = item2.NgayKetThuc ?? DateTime.MinValue,
                            SoCuocGoi = item2.SoCuocGoi,
                            SoCuocGoiThucTe = item2.SoCuocGoiThucTe,
                            TileCuocGoiThucTe = item2.TileCuocGoiThucTe,
                            SoLichHen = item2.SoLichHen,
                            SoLichHenThucTe = item2.SoLichHenThucTe,
                            TileLichHenThucTe = item2.TileLichHenThucTe,
                            SoEmailTuongTacKhachHang = item2.SoEmailTuongTacKhachHang,
                            SoEmailTruongTacKhachHangThucTe = item2.SoEmailTruongTacKhachHangThucTe,
                            TileEmailTuongTacThucTe = item2.TileEmailTuongTacThucTe,
                            SoEmailBaoGia = item2.SoEmailBaoGia,
                            SoEmailBaoGiaThucTe = item2.SoEmailBaoGiaThucTe,
                            TiLeEmailBaoGiaThucTe = item2.TileEmailTuongTacThucTe,
                            DoanhSo = item2.DoanhSo,
                            DoanhSoThucTe = item2.DoanhSoThucTe,
                            TiLeDoanhSoThucTe = item2.TiLeDoanhSoThucTe,
                            SoKhachHangTiemNangDaChuyenDoi = item2.SoKhachHangTiemNangDaChuyenDoi,
                            SoKhachHangTiemNangDaChuyenDoiThucTe = item2.SoKhachHangTiemNangDaChuyenDoiThucTe,
                            TiLeSoKhachHangTiemNangDaChuyenDoiThucTe = item2.TiLeSoKhachHangTiemNangDaChuyenDoiThucTe,
                            TongTiLeThucTe = item2.TongTiLeThucTe,
                            IsDatMucTieu = item2.IsDatMucTieu,
                            MaMucTieuDoanhSo = item2.MaMucTieuDoanhSo,
                            XepLoai = null,
                            Color = null,
                            NguoiDung = new NguoiDungDTO { Id = item2.Nguoidung.Id, HoVaDem = item2.Nguoidung.HoVaDem, Ten = item2.Nguoidung.Ten, HinhAnh = item2.Nguoidung.HinhAnh },
                            PhongBan = new PhongBanDTO { Id = item2.PhongBan.Id, TenPhongBan = item2.PhongBan.TenPhongBan }
                        }).ToList();

                if (mucTieu.KPINhanViens != null)
                {
                    foreach (var item2 in mucTieu.KPINhanViens)
                    {

                        foreach (var xeploaiNhanVien in dbXepLoai)
                        {
                            if (item2.TongTiLeThucTe >= (decimal)xeploaiNhanVien.TuDiem && item.TongTiLeThucTe <= (decimal)xeploaiNhanVien.DenDiem)
                            {
                                item2.XepLoai = xeploaiNhanVien.TenXepLoai;
                                item2.Color = xeploaiNhanVien.MaMau;
                            }
                        }
                    }
                }
                result.Add(mucTieu);



            }
            return result;

        }

        public async Task<List<MucTieuDoanhSoDTO>> GetAllByPhongBan(DateTime tuNgay, DateTime denNgay, Guid phongBanId)
        {
            List<MucTieuDoanhSoDTO> result = new List<MucTieuDoanhSoDTO>();
            var db = await _crmDbContext.MucTieuDoanhSos.Where(m => m.PhongBanId == phongBanId && m.CreateAt >= tuNgay && m.CreateAt <= denNgay && m.IsDeleted == false)
                .Include(r => r.KPINhanViens).Include(r => r.Nguoidung).Include(r => r.PhongBan)
                .ThenInclude(r => r.KPINhanViens).ThenInclude(r => r.Nguoidung).ThenInclude(r => r.PhongBan).ToListAsync();
            var dbXepLoai = await _crmDbContext.XepLoais.ToListAsync();
            foreach (var item in db)
            {
                MucTieuDoanhSoDTO mucTieu = new MucTieuDoanhSoDTO();
                mucTieu.Id = item.Id;
                mucTieu.TenKPI = item.TenKPI;
                mucTieu.MaQuanLy = item.MaQuanLy;
                mucTieu.TenPhongBan = item.TenPhongBan;
                mucTieu.NgayBatDau = item.NgayBatDau;
                mucTieu.NgayKetThuc = item.NgayKetThuc;
                mucTieu.SoCuocGoi = item.SoCuocGoi;
                mucTieu.SoCuocGoiThucTe = item.SoCuocGoiThucTe;
                mucTieu.TileCuocGoiThucTe = item.TileCuocGoiThucTe;
                mucTieu.SoLichHen = item.SoLichHen;
                mucTieu.SoLichHenThucTe = item.SoLichHenThucTe;
                mucTieu.TileLichHenThucTe = item.TileLichHenThucTe;
                mucTieu.SoEmailTuongTacKhachHang = item.SoEmailTuongTacKhachHang;
                mucTieu.SoEmailTruongTacKhachHangThucTe = item.SoEmailTruongTacKhachHangThucTe;
                mucTieu.TileEmailTuongTacThucTe = item.TileEmailTuongTacThucTe;
                mucTieu.SoEmailBaoGia = item.SoEmailBaoGia;
                mucTieu.SoEmailBaoGiaThucTe = item.SoEmailBaoGiaThucTe;
                mucTieu.TiLeEmailBaoGiaThucTe = item.TileEmailTuongTacThucTe;
                mucTieu.SoKhachHangTiemNangDaChuyenDoi = item.SoKhachHangTiemNangDaChuyenDoi;
                mucTieu.SoKhachHangTiemNangDaChuyenDoiThucTe = item.SoKhachHangTiemNangDaChuyenDoiThucTe;
                mucTieu.DoanhSo = item.DoanhSo;
                mucTieu.DoanhSoThucTe = item.DoanhSoThucTe;
                mucTieu.TiLeDoanhSoThucTe = item.TiLeDoanhSoThucTe;
                mucTieu.TongTiLeThucTe = item.TongTiLeThucTe;
                foreach (var item1 in dbXepLoai)
                {
                    if (item.TongTiLeThucTe >= (decimal)item1.TuDiem && item.TongTiLeThucTe <= (decimal)item1.DenDiem)
                    {
                        mucTieu.XepLoai = item1.TenXepLoai;
                        mucTieu.Color = item1.MaMau;
                    }

                }
                if (item.Nguoidung != null)
                {
                    mucTieu.NguoiDung = new NguoiDungDTO
                    {
                        Id = item.Nguoidung.Id,
                        HinhAnh = item.Nguoidung.HinhAnh,
                        Ten = item.Nguoidung.Ten,
                        HoVaDem = item.Nguoidung.HoVaDem,
                    };
                }
                if (item.PhongBan != null)
                {
                    mucTieu.PhongBan = new PhongBanDTO
                    {
                        Id = item.PhongBan.Id,
                        TenPhongBan = item.PhongBan.TenPhongBan,
                        SoThuTu = item.PhongBan.SoThuTu
                    };

                }
                mucTieu.KPINhanViens = item.KPINhanViens?
                        .Select(item2 => new KPINhanVienDTO
                        {
                            Id = item2.Id,
                            TenKPI = item2.TenKPI,
                            MaQuanLy = item2.MaQuanLy,
                            TenNhanVien = item2.TenNhanVien,
                            NgayBatDau = item2.NgayBatDau ?? DateTime.MinValue,
                            NgayKetThuc = item2.NgayKetThuc ?? DateTime.MinValue,
                            SoCuocGoi = item2.SoCuocGoi,
                            SoCuocGoiThucTe = item2.SoCuocGoiThucTe,
                            TileCuocGoiThucTe = item2.TileCuocGoiThucTe,
                            SoLichHen = item2.SoLichHen,
                            SoLichHenThucTe = item2.SoLichHenThucTe,
                            TileLichHenThucTe = item2.TileLichHenThucTe,
                            SoEmailTuongTacKhachHang = item2.SoEmailTuongTacKhachHang,
                            SoEmailTruongTacKhachHangThucTe = item2.SoEmailTruongTacKhachHangThucTe,
                            TileEmailTuongTacThucTe = item2.TileEmailTuongTacThucTe,
                            SoEmailBaoGia = item2.SoEmailBaoGia,
                            SoEmailBaoGiaThucTe = item2.SoEmailBaoGiaThucTe,
                            TiLeEmailBaoGiaThucTe = item2.TileEmailTuongTacThucTe,
                            DoanhSo = item2.DoanhSo,
                            DoanhSoThucTe = item2.DoanhSoThucTe,
                            TiLeDoanhSoThucTe = item2.TiLeDoanhSoThucTe,
                            SoKhachHangTiemNangDaChuyenDoi = item2.SoKhachHangTiemNangDaChuyenDoi,
                            SoKhachHangTiemNangDaChuyenDoiThucTe = item2.SoKhachHangTiemNangDaChuyenDoiThucTe,
                            TiLeSoKhachHangTiemNangDaChuyenDoiThucTe = item2.TiLeSoKhachHangTiemNangDaChuyenDoiThucTe,
                            TongTiLeThucTe = item2.TongTiLeThucTe,
                            IsDatMucTieu = item2.IsDatMucTieu,
                            MaMucTieuDoanhSo = item2.MaMucTieuDoanhSo,
                            XepLoai = null,
                            Color = null,
                            NguoiDung = new NguoiDungDTO { Id = item2.Nguoidung.Id, HoVaDem = item2.Nguoidung.HoVaDem, Ten = item2.Nguoidung.Ten, HinhAnh = item2.Nguoidung.HinhAnh },
                            PhongBan = new PhongBanDTO { Id = item2.PhongBan.Id, TenPhongBan = item2.PhongBan.TenPhongBan }
                        }).ToList();

                if (mucTieu.KPINhanViens != null)
                {
                    foreach (var item2 in mucTieu.KPINhanViens)
                    {

                        foreach (var xeploaiNhanVien in dbXepLoai)
                        {
                            if (item2.TongTiLeThucTe >= (decimal)xeploaiNhanVien.TuDiem && item.TongTiLeThucTe <= (decimal)xeploaiNhanVien.DenDiem)
                            {
                                item2.XepLoai = xeploaiNhanVien.TenXepLoai;
                                item2.Color = xeploaiNhanVien.MaMau;
                            }
                        }
                    }
                }
                result.Add(mucTieu);



            }

            return result;
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

        public async Task<ResultModal> UpdateMucTieuDoanhSoData(Guid nguoiDungId, Guid phongBanId, int type, double? doanhSo)
        {
            DateTime now = DateTime.Now;
            DateTime firstDayOfMonth = new DateTime(now.Year, now.Month, 1);
            DateTime lastDayOfMonth = new DateTime(now.Year, now.Month, DateTime.DaysInMonth(now.Year, now.Month));
            var dbNguoiDung = _crmDbContext.Nguoidungs.FirstOrDefault(r => r.Id == nguoiDungId && r.IsDelete == false);
            if ((dbNguoiDung?.CheckIsTruongPhong == false && dbNguoiDung.CheckIsGiamDoc == false) || dbNguoiDung?.MaPhongBan != Guid.Parse("4D086C61-CC35-40D4-B9D9-816063DF1C32"))
            {
                var dbKPi = _crmDbContext.KPINhanViens.FirstOrDefault(r => r.NguoiDungId == nguoiDungId && r.IsDeleted == false && r.CreateAt >= firstDayOfMonth && r.CreateAt <= lastDayOfMonth);
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

                var dbMucTieu = _crmDbContext.MucTieuDoanhSos.FirstOrDefault(r => r.PhongBanId == phongBanId && r.IsDeleted == false && r.CreateAt >= firstDayOfMonth && r.CreateAt <= lastDayOfMonth);
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

                await _crmDbContext.SaveChangesAsync();

                return new ResultModal() { Status = 200, Message = "Chỉnh sủa thành công", Success = true };
            }
            else return new ResultModal() { Status = 202, Message = "Vai trò không hợp lệ", Success = true };
        }
    }
}
