using CRM.Modal;
using System.Linq.Expressions;

namespace CRM.Repositories
{
    public interface IBaseRepository<TEntity, TModal, TId, Tdto> where TEntity : class
    {
        // lấy toàn bộ danh sách
        Task<List<Tdto>> GetAll();
        // Get object with Id follow int UUID
        Task<TEntity> GetById(TId id);
        // Get Object follow UUID and response to DTO (Data transfers Object)
        Task<Tdto> GetByIdDTO(TId id);
        // Get list by role 
        Task<List<Tdto>> GetAllByRole( Guid userId,Guid roleId , Guid chiNhanhId , DateTime tuNgay, DateTime denNgay, params Expression<Func<TEntity, object>>[] includes );
        // Get object with Id follow int type
        Task<TEntity> GetById(int id);
        // Get object with Id follow string type
        Task<TEntity> GetById(string id);
        // Get list object with params first date to end date 
        Task<List<Tdto>> GetAllDto(DateTime tuNgay, DateTime denNgay);
        // Get list data had Datete
        Task<List<Tdto>> GetDataIsDelete(Guid userId);
        // Get List by UserId 
        Task<List<Tdto>> GetByNguoiDungId(Guid id);
        // Get list by department 
        Task<List<Tdto>> GetByPhongBanId(Guid id);
        // Create an object 
        Task<ResultModal> Create(TModal modal);
        // Update an object 
        Task<ResultModal> Update(TModal modal);
        // Delete an object with UUID type
        Task<ResultModal> DeleteById(TId id);
        // Delete an object with int type
        Task<ResultModal> DeleteById(int id);
        // Delete an object with string type
        Task<ResultModal> DeleteById(string id);
        // Delete muntilple an object with UUID type
        Task<ResultModal> DeleteMultiple(List<TModal> modals);
        // Restore multiple object had delete
        Task<ResultModal> RestoreMultiple(List<Guid> modals);
    }
}
