using AutoMapper;
using AutoMapper.QueryableExtensions;
using CRM.Entities;
using CRM.Modal;
using DocumentFormat.OpenXml.VariantTypes;
using Microsoft.EntityFrameworkCore;
using OpenXmlPowerTools;
using System.Linq.Expressions;

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
        public async Task<TEntity> GetById(object id)
        {
            return await _crmDbContext.Set<TEntity>().FindAsync(id);
        }
        public async Task<List<TDto>> GetByNguoiDungId(Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentException("Dữ liệu không hợp lệ", nameof(id));
            }

            return await _crmDbContext.Set<TEntity>()
                .Where(r => EF.Property<Guid>(r, "NguoiDungId") == id)
                .ProjectTo<TDto>(_mapper.ConfigurationProvider)
                .ToListAsync();
        }

        public async Task<List<TDto>> GetByPhongBanId(Guid id)
        {
            if (id == Guid.Empty)
            {
                throw new ArgumentException("Dữ liệu không hợp lệ", nameof(id));
            }
            return await _crmDbContext.Set<TEntity>()
               .Where(r => EF.Property<Guid>(r, "PhongBanId") == id)
               .ProjectTo<TDto>(_mapper.ConfigurationProvider)
               .ToListAsync();
        }
        public async Task<ResultModal> DeleteById(TId id)
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
        public async Task<ResultModal> DeleteById(int id)
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

        public async Task<ResultModal> DeleteMultiple(List<TModal> modals)
        {
            try
            {
                foreach (var item in modals)
                {
                    var idProperty = item.GetType().GetProperty("Id");
                    if (idProperty == null)
                    {
                        throw new InvalidOperationException("TModal does not have an 'id' property.");
                    }
                    var idValue = idProperty.GetValue(item);
                    if (idValue == null)
                    {
                        continue;
                    }
                    var entity = await GetById((string)idValue);
                    if (entity != null)
                    {
                        var propertyInfo = typeof(TEntity).GetProperty("IsDeleted");
                        if (propertyInfo != null)
                        {
                            propertyInfo.SetValue(entity, true);
                            _crmDbContext.Set<TEntity>().Update(entity);

                        }
                        else
                        {
                            _crmDbContext.Set<TEntity>().Remove(entity);
                        }
                    }
                }
                await _crmDbContext.SaveChangesAsync();
                return new ResultModal { Status = 200, Success = true, Message = "Xóa dữ liệu thành công" };
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

        public async Task<ResultModal> Update(TModal modal)
        {
            var idProperty = modal.GetType().GetProperty("Id");
            if (idProperty == null)
            {
                return new ResultModal { Success = false, Message = "Không tìm thấy dữ liệu", Status = 400 };
            }

            var idValue = idProperty.GetValue(modal);
            if (idValue == null)
            {
                return new ResultModal { Success = false, Message = "Giá trị Id không hợp lệ", Status = 400 };
            }
            if (idValue.GetType() == typeof(Guid))
            {
                var existingEntity = await GetById((TId)idValue);

                if (existingEntity == null)
                {
                    return new ResultModal { Success = false, Message = "Dữ liệu không tồn tại", Status = 404 };
                }
                _mapper.Map(modal, existingEntity);
                _crmDbContext.Set<TEntity>().Update(existingEntity);
                await _crmDbContext.SaveChangesAsync();
            }
            else
            {
                var existingEntity = await GetById((string)idValue);
                if (existingEntity == null)
                {
                    return new ResultModal { Success = false, Message = "Dữ liệu không tồn tại", Status = 404 };
                }
                _mapper.Map(modal, existingEntity);
                _crmDbContext.Set<TEntity>().Update(existingEntity);
                await _crmDbContext.SaveChangesAsync();
            }


            return new ResultModal { Success = true, Message = "Chỉnh sửa dữ liệu thành công", Status = 200 };
        }

        public async Task<TDto> GetByIdDTO(TId id)
        {
            if (typeof(TId) == typeof(Guid))
            {
                var guidId = (Guid)(object)id;

                var db = await _crmDbContext.Set<TEntity>()
                    .Where(r => EF.Property<Guid>(r, "id") == guidId)
                    .ProjectTo<TDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync();

                return db;
            }
            return null;
        }

        public async Task<List<TDto>> GetAllDto(DateTime tuNgay, DateTime denNgay)
        {

            return await _crmDbContext.Set<TEntity>()
              .Where(r => EF.Property<DateTime>(r, "CreateAt") >= tuNgay
                    && EF.Property<DateTime>(r, "CreateAt") <= denNgay
                    && EF.Property<bool>(r, "IsDeleted") == false)
              .ProjectTo<TDto>(_mapper.ConfigurationProvider)
              .ToListAsync();
        }

        public async Task<List<TDto>> GetAllByRole(
                                      Guid userId,
                                      Guid roleId,
                                      Guid chiNhanhId,
                                      DateTime tuNgay,
                                      DateTime denNgay,
                                     params Expression<Func<TEntity, object>>[] includes)
        {
            var query = _crmDbContext.Set<TEntity>().AsQueryable();

            var dataUser = _crmDbContext.Nguoidungs
                .AsNoTracking()
                .FirstOrDefault(r => r.Id == userId);

            if (dataUser == null)
                return new List<TDto>();
            var fromDate = Helper.Helper.ConvertDate(tuNgay);
            var toDate = Helper.Helper.ConvertDate(denNgay);
            query = query.Where(r =>
                               EF.Property<DateTime>(r, "CreateAt") >= fromDate &&
                               EF.Property<DateTime>(r, "CreateAt") <= toDate &&
                               EF.Property<bool>(r, "IsDeleted") == false
                           );

            foreach (var include in includes)
            {
                query = query.Include(include);
            }
            query = query.Include(nameof(PhongBan));
            var superAdminRole = Guid.Parse(AppSettingsProvider.Get("Role:SuperAdmin"));
            var tongGiamDocRole = Guid.Parse(AppSettingsProvider.Get("Role:TongGiamDoc"));
            var adminRole = Guid.Parse(AppSettingsProvider.Get("Role:Admin"));
            var giamDocRole = Guid.Parse(AppSettingsProvider.Get("Role:GiamDoc"));
            var truongPhongRole = Guid.Parse(AppSettingsProvider.Get("Role:TruongPhong"));

            if (roleId == superAdminRole || roleId == tongGiamDocRole)
            {
            }
            else if (roleId == adminRole || roleId == giamDocRole)
            {
                query = query.Where(r =>
                    EF.Property<Guid>(EF.Property<object>(r, nameof(PhongBan)), nameof(PhongBan.ChiNhanhId)) == chiNhanhId);
            }
            else if (roleId == truongPhongRole)
            {
                query = query.Where(r =>
                    EF.Property<Guid>(r, "PhongBanId") == dataUser.MaPhongBan);
            }
            else
            {
                query = query.Where(r =>
                    EF.Property<Guid>(r, "NguoiDungId") == dataUser.Id);
            }

            // Trả về DTO
            return await query.ProjectTo<TDto>(_mapper.ConfigurationProvider).ToListAsync();
        }

        public async Task<List<TDto>> GetDataIsDelete(Guid userId)
        {
            return await _crmDbContext.Set<TEntity>()
                                      .Where(r => EF.Property<bool>(r, "IsDelete") == false
                                       &&  EF.Property<Guid>(r,"NguoiDungID") == userId)
                                      .ProjectTo<TDto>(_mapper.ConfigurationProvider)
                                      .ToListAsync();
        }

        public async Task<ResultModal> RestoreMultiple(List<Guid> modals)
        {
            foreach (var item in modals)
            {
                var data = _crmDbContext.Set<TEntity>().
                                         FirstOrDefault(r => EF.Property<Guid>(r, "Id") == item);
                if(data != null)
                    _crmDbContext.Update<TEntity>(data);
            }
            await _crmDbContext.SaveChangesAsync();
           return new ResultModal() { Status = 200  , Message="Thành công", Success = true };
        }
    }
}
