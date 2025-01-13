using AutoMapper;
using CRM.Entities;
using CRM.Modal;
using Microsoft.EntityFrameworkCore;

namespace CRM.Repositories
{
    public class BaseRepository<TEntity, TModal, TId, TDto> : IBaseRepository<TEntity, TModal, TId, TDto> where TEntity : class where TDto : class
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
            try
            {
                var entity = _mapper.Map<TEntity>(modal);
                await _crmDbContext.Set<TEntity>().AddAsync(entity);
                await _crmDbContext.SaveChangesAsync();
                return new ResultModal { Status = 200, Success = true, Message = "Thêm mới thành công" };
            }
            catch (Exception ex)
            {
                return new ResultModal { Status = 500, Success = false, Message = ex.Message };
            }

        }
        public async Task<ResultModal> DeleteById(TId id)
        {
            try
            {
                var entity = await GetById(id);
                if (entity != null)
                {
                    var propertyInfo = typeof(TEntity).GetProperty("IsDeleted");
                    if (propertyInfo != null && propertyInfo.PropertyType == typeof(bool))
                    {
                        propertyInfo.SetValue(entity, true);
                        _crmDbContext.Set<TEntity>().Update(entity);
                        await _crmDbContext.SaveChangesAsync();
                        return new ResultModal { Status = 200, Success = true, Message = "Xóa dữ liệu thành công" };
                    }
                    else
                    {
                        _crmDbContext.Set<TEntity>().Remove(entity);
                        await _crmDbContext.SaveChangesAsync();
                        return new ResultModal { Status = 200, Success = true, Message = "Xóa dữ liệu thành công" };
                    }
                }
                return new ResultModal { Status = 202, Success = true, Message = "Không tìm thấy dữ liệu" };
            }
            catch (Exception ex)
            {
                return new ResultModal { Status = 500, Success = false, Message = ex.Message };
            }

        }
        public async Task<ResultModal> DeleteById(int id)
        {
            try
            {
                var entity = await GetById(id);
                if (entity != null)
                {
                    var propertyInfo = typeof(TEntity).GetProperty("IsDeleted");
                    if (propertyInfo != null && propertyInfo.PropertyType == typeof(bool))
                    {
                        propertyInfo.SetValue(entity, true);
                        _crmDbContext.Set<TEntity>().Update(entity);
                        await _crmDbContext.SaveChangesAsync();
                        return new ResultModal { Status = 200, Success = true, Message = "Xóa dữ liệu thành công" };
                    }
                    else
                    {
                        _crmDbContext.Set<TEntity>().Remove(entity);
                        await _crmDbContext.SaveChangesAsync();
                        return new ResultModal { Status = 200, Success = true, Message = "Xóa dữ liệu thành công" };
                    }
                }
                return new ResultModal { Status = 202, Success = true, Message = "Không tìm thấy dữ liệu" };
            }
            catch (Exception ex)
            {
                return new ResultModal { Status = 500, Success = false, Message = ex.Message };
            }

        }
        public async Task<ResultModal> DeleteById(string id)
        {
            try
            {
                var entity = await GetById(id);
                if (entity != null)
                {
                    var propertyInfo = typeof(TEntity).GetProperty("IsDeleted");
                    if (propertyInfo != null)
                    {
                        propertyInfo.SetValue(entity, true);
                        _crmDbContext.Set<TEntity>().Update(entity);
                        await _crmDbContext.SaveChangesAsync();
                        return new ResultModal { Status = 200, Success = true, Message = "Xóa dữ liệu thành công" };
                    }
                    else
                    {
                        _crmDbContext.Set<TEntity>().Remove(entity);
                        await _crmDbContext.SaveChangesAsync();
                        return new ResultModal { Status = 200, Success = true, Message = "Xóa dữ liệu thành công" };
                    }
                }
                return new ResultModal { Status = 202, Success = true, Message = "Không tìm thấy dữ liệu" };
            }
            catch (Exception ex)
            {
                return new ResultModal { Status = 500, Success = false, Message = ex.Message };
            }

        }

        public async Task<List<TDto>> GetAll()
        {
            var db = await _crmDbContext.Set<TEntity>().ToListAsync();
            return _mapper.Map<List<TDto>>(db);
        }

        public async Task<TEntity> GetById(TId id)
        {
            return await _crmDbContext.Set<TEntity>().FindAsync(id);
        }
        public async Task<TEntity> GetById(int id)
        {
            return await _crmDbContext.Set<TEntity>().FindAsync(id);
        }
        public async Task<TEntity> GetById(string id)
        {
            return await _crmDbContext.Set<TEntity>().FindAsync(id);
        }

        public async Task<ResultModal> Update(TModal modal)
        {
            var entity = _mapper.Map<TEntity>(modal);
            _crmDbContext.Set<TEntity>().Update(entity);
            await _crmDbContext.SaveChangesAsync();
            return new ResultModal { Success = true, Message = "Chỉnh sửa dữ liệu thành công" , Status=200 };
        }
    }
}
