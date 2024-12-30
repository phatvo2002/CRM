using AutoMapper;
using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace CRM.Repositories
{
    public class BaseRepository<TContext, TEntity, TModal ,TId ,TDTO > : IBaseRepository<TEntity, TModal, TId > where TEntity : class where TContext : CrmDbContext
    {
        protected readonly CrmDbContext _crmDbContext;
        protected readonly IMapper _mapper;
        public BaseRepository(CrmDbContext crmDbContext, IMapper mapper)
        {
            _crmDbContext = crmDbContext;
            _mapper = mapper;
        }

        public async Task<ResultModal> Create(TModal modal)
        {
            var entity = _mapper.Map<TEntity>(modal);
            await _crmDbContext.Set<TEntity>().AddAsync(entity);
            await _crmDbContext.SaveChangesAsync();
            return new ResultModal {Status = 200, Success = true, Message = "Thêm mới thành công" };
        }
        public async Task<ResultModal> DeleteById(TId id)
        {
            var entity = await GetById(id);
            if(entity != null)
            {
                var propertyInfo = typeof(TEntity).GetProperty("IsDeleted");
                if (propertyInfo != null && propertyInfo.PropertyType == typeof(bool))
                {
                    propertyInfo.SetValue(entity, true);
                    _crmDbContext.Set<TEntity>().Update(entity);
                    await _crmDbContext.SaveChangesAsync();
                    return new ResultModal { Status = 200, Success = true, Message = "Xóa dữ liệu thành công" };
                }
            }
            return new ResultModal { Status = 202, Success = true, Message = "Không tìm thấy dữ liệu" };
        }

        public async Task<List<TEntity>> GetAll()
        {
           return await _crmDbContext.Set<TEntity>().ToListAsync();
        }

        public async Task<TEntity> GetById(TId id)
        {
            return await _crmDbContext.Set<TEntity>().FindAsync(id);
        }

        public async Task<ResultModal> Update(TModal modal)
        {
            var entity = _mapper.Map<TEntity>(modal);
            _crmDbContext.Set<TEntity>().Update(entity);
            await _crmDbContext.SaveChangesAsync();
            return new ResultModal { Success = true, Message = "Updated successfully" };
        }
    }
}
