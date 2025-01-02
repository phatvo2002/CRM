using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Helper;
using CRM.Modal;
using Microsoft.EntityFrameworkCore;

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
            var db = _context.HangHoas.FirstOrDefault(r=> r.MaLoaiHangHoa == modal.MaLoaiHangHoa);
            try
            {
                if (db == null)
                {
                    HangHoa hangHoa = new HangHoa();
                    hangHoa.MaHangHoa = modal.MaHangHoa;
                    hangHoa.MaLoaiHangHoa = modal.MaLoaiHangHoa;
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
            catch(Exception ex) { 
               return new ResultModal() { Status = 500 , Message = ex.Message  ,Success = true};
            }
        
            throw new NotImplementedException();
        }
    }
}
