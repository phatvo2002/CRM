using AutoMapper;
using CRM.Entities;
using CRM.Entities.StoreProcedure;
using CRM.Repositories;
using CRM.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace CRM.Abstraction
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly CrmDbContext _context;
        private readonly IMapper _mapper;

        private readonly AppCrmContext _appCrmContext;

        private readonly ILoggerFactory _loggerFactory;

        private IUserRepository userRepository;
        private IChucVuRepository chucVuRepository;
        private ITinhTrangRepository tinhTrangRepository;
        private IMenuRepository menuRepository;
        private IPhongBanRepository phongBanRepository;
        public UnitOfWork(CrmDbContext dbContext ,IMapper mapper ,AppCrmContext appCrmContext , ILoggerFactory loggerFactory)
        {
            _context = dbContext;
            _mapper = mapper;
            _appCrmContext = appCrmContext;
            _loggerFactory = loggerFactory;
        }

        public IUserRepository UserRepository
        {
            get
            {
                if (this.userRepository == null)
                {
                    var logger = _loggerFactory.CreateLogger<UserRepository>();
                    this.userRepository = new UserRepository(_context , _mapper, logger);
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
                    var logger = _loggerFactory.CreateLogger<ChucVuRepository>();
                    this.chucVuRepository = new ChucVuRepository(_context ,_mapper ,_appCrmContext , logger);
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

        public IMenuRepository MenuRepository
        {
            get
            {
                if (this.menuRepository == null)
                {
                    this.menuRepository = new MenuRepository(_context, _mapper);
                }
                return menuRepository;
            }
        }
        public IPhongBanRepository PhongBanRepository
        {
            get
            {
                if (this.phongBanRepository == null)
                {
                    var logger = _loggerFactory.CreateLogger<PhongBanRepository>();
                    this.phongBanRepository = new PhongBanRepository(_context, _mapper , logger);
                }
                return phongBanRepository;
            }
        }
    }
}
