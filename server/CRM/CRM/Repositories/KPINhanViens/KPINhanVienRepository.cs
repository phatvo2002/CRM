using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;

namespace CRM.Repositories.KPINhanViens
{
    public class KPINhanVienRepository : BaseRepository<KPINhanVien, KPINhanVienModal, Guid, KPINhanVienDTO>, IKPINhanVienRepository
    {
        public KPINhanVienRepository(CrmDbContext crmDbContext, IMapper mapper) : base(crmDbContext, mapper)
        {
        }

        public async Task<ResultModal> CreateKPINhanVien(KPINhanVienModal modal, Guid phongBanId)
        {
            var db = _crmDbContext.KPINhanViens.FirstOrDefault(k => k.Id == modal.Id);
            try
            {
                if (db == null)
                {
                    KPINhanVien data = new KPINhanVien();
                    data.Id = Guid.NewGuid();
                    data.TenKPI = modal.TenKPI;
                    data.MaQuanLy = modal.MaQuanLy;
                    data.TenNhanVien = modal.TenNhanVien;
                    data.NgayBatDau = modal.NgayBatDau;
                    data.NgayKetThuc = modal.NgayKetThuc;
                    data.SoCuocGoi = modal.SoCuocGoi;
                    data.SoCuocGoiThucTe = 0;
                    data.SoLichHen = modal.SoLichHen;
                    data.SoLichHenThucTe = 0;
                    data.SoEmailTuongTacKhachHang = modal.SoEmailTuongTacKhachHang;
                    data.SoEmailTruongTacKhachHangThucTe = 0;
                    data.SoEmailBaoGia = modal.SoEmailBaoGia;
                    data.SoEmailBaoGiaThucTe = 0;
                    data.SoKhachHangTiemNangDaChuyenDoi = modal.SoKhachHangTiemNangDaChuyenDoi;
                    data.SoKhachHangTiemNangDaChuyenDoiThucTe = 0;
                    data.DoanhSo = modal.DoanhSo;
                    data.DoanhSoThucTe = 0;
                    data.GhiChu = modal.GhiChu;
                    data.IsDatMucTieu = false;
                    data.MaTrangThaiKPI = modal.MaTrangThaiKPI;
                    data.MaMucTieuDoanhSo = modal.MaMucTieuDoanhSo;
                    data.TongTiLeThucTe = 0;
                    data.NguoiDungId = modal.NguoiDungId;
                    data.PhongBanId = phongBanId;
                    data.CreateAt = DateTime.Now;
                    data.IsDeleted = false;

                    _crmDbContext.KPINhanViens.Add(data);

                    await _crmDbContext.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Thêm mới thành công", Success = true };
                }
                else
                {
                    return new ResultModal() { Status = 202, Message = "Dữ liệu đã tồn tại trong hệ thống", Success = false };

                }
            }
            catch (Exception ex)
            {
                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };

            }
        }

        public async Task<KPINhanVienDTO> GetByNhanVienId(Guid id, DateTime tuNgay, DateTime denNgay)
        {
            var db = await _crmDbContext.KPINhanViens
                .FirstOrDefaultAsync(r => r.Id == id && r.CreateAt >= tuNgay && r.CreateAt <= denNgay && r.IsDeleted == false);
            return _mapper.Map<KPINhanVienDTO>(db);
        }

        public async Task<ResultModal> UpdateKPINhanVien(KPINhanVienModal modal)
        {
            var db = _crmDbContext.KPINhanViens.FirstOrDefault(r => r.Id == modal.Id);
            if (db != null)
            {
                _mapper.Map(modal, db);
                db.CreateAt = DateTime.Now;
                _crmDbContext.KPINhanViens.Update(db);
                await _crmDbContext.SaveChangesAsync();
                return new ResultModal() { Status = 200, Message = "Chỉnh sửa dữ liệu thành công", Success = true };
            }
            else return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
        }
    }
}
