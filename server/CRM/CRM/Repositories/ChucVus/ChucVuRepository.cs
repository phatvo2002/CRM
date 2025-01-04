using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Entities.StoreProcedure;
using CRM.Modal;
using Microsoft.EntityFrameworkCore;

namespace CRM.Repositories.ChucVus
{
    public class ChucVuRepository : IChucVuRepository
    {
        private readonly CrmDbContext _context;
        private readonly IMapper _mapper;
        private readonly AppCrmContext _appCrmContext;
        private readonly ILogger<ChucVuRepository> _logger;


        public ChucVuRepository(CrmDbContext context, IMapper mapper, AppCrmContext appCrmContext, ILogger<ChucVuRepository> logger)
        {
            _context = context;
            _mapper = mapper;
            _appCrmContext = appCrmContext;
            _logger = logger;
        }
        public async Task<ResultModal> CreateChucVu(ChucVuModal chucVuModal)
        {
            try
            {
                ChucVu chucVu = new ChucVu();
                chucVu.Id = Guid.NewGuid();
                chucVu.TenChucVu = chucVuModal.TenChucVu;
                chucVu.MoTa = chucVuModal.MoTa;
                _context.ChucVus.Add(chucVu);
                await _context.SaveChangesAsync();
                return new ResultModal() { Status = 200, Message = "Thêm chức vụ thành công", Success = true };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
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
                _logger.LogError(ex, ex.Message);
                return new ResultModal() { Message = ex.ToString(), Success = false, Status = 500 };
            }
        }

        public async Task<List<ChucVuDTO>> GetAllChucVu()
        {
            var db = await _context.ChucVus.ToListAsync();
            return _mapper.Map<List<ChucVuDTO>>(db);
        }

        public async Task<List<crm_getmenugroup_by_id>> GetMenuTroleById(Guid id)
        {
            return await _appCrmContext.crm_getmenugroup_by_id.FromSql($"Execute dbo.crm_getmenugroup_by_id @Id={id}").ToListAsync();
        }

        public async Task<ResultModal> UpdateChucVu(ChucVuModal chucVuModal, Guid id)
        {
            var db = _context.ChucVus.FirstOrDefault(r => r.Id == id);
            try
            {
                if (db != null)
                {
                    db.TenChucVu = chucVuModal.TenChucVu;
                    db.MoTa = chucVuModal.MoTa;
                    _context.ChucVus.Update(db);
                    await _context.SaveChangesAsync();
                    return new ResultModal() { Status = 200, Message = "Sửa thành công", Success = true };
                }
                else
                {
                    return new ResultModal() { Status = 202, Message = "Có lỗi đã xảy ra", Success = false };
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                return new ResultModal() { Status = 500, Message = ex.Message, Success = false };
            }


        }
    }
}
