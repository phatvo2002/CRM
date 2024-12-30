using CRM.Modal;

namespace CRM.Repositories.Interfaces
{
    public interface IBaseRepository<TEntity ,TModal ,TId > where TEntity : class
    {
        Task<List<TEntity>> GetAll();
        Task<TEntity> GetById(TId id);
        Task<ResultModal>Create(TModal modal); 
        Task<ResultModal>Update(TModal modal);
        Task<ResultModal> DeleteById(TId id);
    }
}
