using AutoMapper;
using CRM.Entities;
using CRM.Repositories;
using CRM.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CRM.Abstraction
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly CrmDbContext _context;
        private readonly IMapper _mapper;

        private IUserRepository userRepository;
        private IChucVuRepository chucVuRepository;
        private ITinhTrangRepository tinhTrangRepository;
        public UnitOfWork(CrmDbContext dbContext ,IMapper mapper)
        {
            _context = dbContext;
            _mapper = mapper;
        }

  

        public IUserRepository UserRepository
        {
            get
            {
                if (this.userRepository == null)
                {
                    this.userRepository = new UserRepository(_context , _mapper);
                }
                return userRepository;
            }
        }

        public IChucVuRepository ChucVuRepository
        {
            get
            {
                if(this.chucVuRepository == null)
                {
                    this.chucVuRepository = new ChucVuRepository(_context ,_mapper);
                }  
                return chucVuRepository;
            }
        }

        public ITinhTrangRepository TrangRepository
        {
            get
            {
                if (this.tinhTrangRepository == null)
                {
                    this.tinhTrangRepository = new TinhTrangRepository(_context,_mapper);
                }
                return tinhTrangRepository;
            }
        }
    }
}
