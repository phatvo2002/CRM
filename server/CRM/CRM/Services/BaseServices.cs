using CRM.Modal;
using CRM.Repositories;

namespace CRM.Services
{
    public class BaseServices<TEntity, TModal, TId, TDto> : IBaseServices<TEntity, TModal, TId, TDto> where TEntity : class where TDto : class
    {
        protected readonly IBaseRepository<TEntity, TModal, TId, TDto> _repository;

        public BaseServices(IBaseRepository<TEntity, TModal, TId, TDto> repository)
        {
            _repository = repository;
        }
        public async Task<ResultModal> Create(TModal modal, Guid phongBanId)
        {
            return await _repository.Create(modal);
        }

        public async Task<ResultModal> Create(TModal modal)
        {
            return await _repository.Create(modal);
        }

        public async Task<ResultModal> DeleteById(TId id)
        {
            return await _repository.DeleteById(id);
        }
        public async Task<ResultModal> DeleteById(int id)
        {
            return await _repository.DeleteById(id);
        }
        public async Task<ResultModal> DeleteById(string id)
        {
            return await _repository.DeleteById(id);
        }

        public async Task<ResultModal> DeleteMultiple(List<TModal> modals)
        {
            return await _repository.DeleteMultiple(modals);
        }
        public async Task<List<TDto>> GetAll()
        {
            return await _repository.GetAll();
        }
        public async Task<TEntity> GetById(TId id)
        {
            return await _repository.GetById(id);
        }
        public async Task<TEntity> GetById(int id)
        {
            return await _repository.GetById(id);
        }
        public async Task<TEntity> GetById(string id)
        {
            return await _repository.GetById(id);
        }

        public async Task<TDto> GetByIdDTO(TId id)
        {
            return await _repository.GetByIdDTO(id);
        }

        public async Task<List<TDto>> GetByNguoiDungId(Guid id)
        {
            return await _repository.GetByNguoiDungId(id);
        }

        public async Task<List<TDto>> GetByPhongBanId(Guid id)
        {
            return await _repository.GetByPhongBanId(id);
        }

        public async Task<ResultModal> Update(TModal modal)
        {
            return await _repository.Update(modal);
        }
    }
}
