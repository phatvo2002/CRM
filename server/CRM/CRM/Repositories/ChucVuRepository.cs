using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CRM.Repositories
{
    public class ChucVuRepository : IChucVuRepository
    {
        private readonly CrmDbContext _context;
        private readonly IMapper _mapper;


        public ChucVuRepository(CrmDbContext context ,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<ResultModal> CreateChucVu(ChucVuModal chucVuModal)
        {
            var db = await _context.ChucVus.FirstOrDefaultAsync(r => r.Id == chucVuModal.Id);
            try {
                if (db != null)
                {
                    return new ResultModal() { Status = 202, Message = "Chức vụ đã tồn tại", Success = false };
                }
                else
                {
                    ChucVu chucVu = new ChucVu();
                    chucVu.Id =  Guid.NewGuid();
                    chucVu.TenChucVu = chucVuModal.TenChucVu;
                    _context.ChucVus.Add(chucVu);
                    return new ResultModal() { Status = 200, Message = "Thêm chức vụ thành công", Success = true };
                }
            }
            catch (Exception ex) 
            {
                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };
            }
         
        }

        public async Task<ResultModal> DeleteChucVu(Guid Id)
        {
            try
            {
                var db = _context.ChucVus.FirstOrDefault(r => r.Id == Id);
                if (db != null)
                {
                    _context.ChucVus.Remove(db);
                    await _context.SaveChangesAsync();
                    return new ResultModal() { Message = "Xóa thành công ", Status = 200, Success = true };
                }
                return new ResultModal() { Message = "Không tìm thấy", Status = 202, Success = false };
            }
            catch (Exception ex)
            {
                return new ResultModal() { Message = ex.ToString(), Success = false, Status = 500 };
            }
        }

        public async Task<List<ChucVuDTO>> GetAllChucVu()
        {
           var db = await _context.ChucVus.ToListAsync();
            return _mapper.Map<List<ChucVuDTO>>(db);
        }
    }
}
