using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Helper;
using CRM.Modal;

namespace CRM.Repositories.HangHoas
{
    public class HangHoaRepository : BaseRepository<HangHoa, HangHoaModal, Guid, HangHoaDTO>, IHangHoaRepository
    {
        private readonly CrmDbContext _context;
        public HangHoaRepository(CrmDbContext crmDbContext, IMapper mapper) : base(crmDbContext, mapper)
        {
            _context = crmDbContext;
        }

        public async Task<ResultModal> CreateHangHoa(HangHoaModal modal)
        {
            var db = _context.HangHoas.FirstOrDefault(r => r.Id == modal.MaHangHoa);
            try
            {
                if (db == null)
                {
                    HangHoa hangHoa = new HangHoa();
                    hangHoa.Id = modal.MaHangHoa;
                    hangHoa.MaLoaiHangHoa = modal.MaLoaiHangHoa;
                    hangHoa.MaDonViTinh = modal.MaDonViTinh;
                    hangHoa.TenHangHoa = modal.TenHangHoa;
                    hangHoa.MoTa = modal.MoTa;
                    hangHoa.NguonGoc = modal.NguonGoc;
                    hangHoa.DonGia = modal.DonGia;
                    if (modal.File != null && modal.File.Length > 0)
                    {
                        var res = Until.UploadFileImage(modal.File);
                        if (!string.IsNullOrEmpty(res))
                        {
                            hangHoa.DuongDanHinhAnh = res;
                        }
                    }
                    _context.HangHoas.Add(hangHoa);
                    await _context.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Thêm hàng hóa thành công", Success = true };
                }
                else
                    return new ResultModal() { Status = 202, Message = "Hàng hóa đã tồn tại trong hệ thống", Success = true };
            }
            catch (Exception ex)
            {
                return new ResultModal() { Status = 500, Message = ex.Message, Success = true };
            }

            throw new NotImplementedException();
        }

        public async Task<ResultModal> UpdateHangHoa(HangHoaModal modal)
        {
            var db = _context.HangHoas.FirstOrDefault(r => r.Id == modal.MaHangHoa);
            try
            {
                if (db != null)
                {
                    if (modal.File != null && modal.File.Length > 0)
                    {
                        db.MaLoaiHangHoa = modal.MaLoaiHangHoa;
                        db.MaDonViTinh = modal.MaDonViTinh;
                        db.MoTa = modal.MoTa;
                        db.TenHangHoa = modal.TenHangHoa;
                        db.NguonGoc = modal.NguonGoc;
                        db.DonGia = modal.DonGia;
                        string url = db.DuongDanHinhAnh!;
                        if (!string.IsNullOrEmpty(db.DuongDanHinhAnh))
                        {
                            try
                            {
                                Until.DeleteFile(db.DuongDanHinhAnh!);
                            }
                            catch { }
                            var res = Until.UploadFileImage(modal.File!);
                            if (!string.IsNullOrEmpty(res))
                                url = res;
                        }
                        _context.HangHoas.Update(db);
                        await _context.SaveChangesAsync();
                        return new ResultModal() { Status = 200, Message = "Chỉnh sửa thành công ", Success = true };
                    }
                    else
                    {
                        db.MaLoaiHangHoa = modal.MaLoaiHangHoa;
                        db.MaDonViTinh = modal.MaDonViTinh;
                        db.MoTa = modal.MoTa;
                        db.TenHangHoa = modal.TenHangHoa;
                        db.NguonGoc = modal.NguonGoc;
                        db.DonGia = modal.DonGia;
                        _context.HangHoas.Update(db);
                        await _context.SaveChangesAsync();
                        return new ResultModal() { Status = 200, Message = "Chỉnh sửa thành công ", Success = true };
                    }
                }
                else
                {
                    return new ResultModal() { Status = 202, Message = "Không tìm thấy dữ liệu", Success = false };
                }
            }
            catch (Exception ex)
            {
                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };
            }
        }
    }
}
