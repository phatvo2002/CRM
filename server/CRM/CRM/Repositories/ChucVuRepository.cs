using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CRM.Repositories
{
    public class ChucVuRepository : IChucVuRepository
    {
        private readonly CrmDbContext _context;

        public ChucVuRepository(CrmDbContext context)
        {
            _context = context;
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
    }
}
