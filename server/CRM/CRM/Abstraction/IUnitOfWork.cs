using CRM.Repositories.Interfaces;

namespace CRM.Abstraction
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }

        IChucVuRepository ChucVuRepository { get; }

        ITinhTrangRepository TrangRepository { get; }
    }
}
