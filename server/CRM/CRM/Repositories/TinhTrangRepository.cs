using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace CRM.Repositories
{
    public class TinhTrangRepository : ITinhTrangRepository
    {
        public readonly CrmDbContext _context;
        public readonly IMapper _mapper;

        public TinhTrangRepository(CrmDbContext context ,IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        } 
        public async Task<List<TinhTrangDTO>> getAllTinhTrang()
        {
            var data = await _context.TinhTrangs.ToListAsync();
            return _mapper.Map<List<TinhTrangDTO>>(data);
        }
    }
}
