using CRM.Modal;

namespace CRM.Services
{
    public interface IBaseServices<TEntity, TModal, TId, Tdto> where TEntity : class
    {
        Task<List<Tdto>> GetAll();
        Task<TEntity> GetById(TId id);
        Task<TEntity> GetById(int id);
        Task<TEntity> GetById(string id);
        Task<List<Tdto>> GetByNguoiDungId(Guid id);
        Task<List<Tdto>> GetByPhongBanId(Guid id);
        Task<ResultModal> Create(TModal modal);
        Task<ResultModal> Update(TModal modal);
        Task<ResultModal> DeleteById(TId id);
        Task<ResultModal> DeleteById(int id);
        Task<ResultModal> DeleteById(string id);
        Task<ResultModal> DeleteMultiple(List<TModal> modals);
    }
}
