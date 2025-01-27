using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using Microsoft.EntityFrameworkCore;

namespace CRM.Repositories.GetDatas
{
    public class GetDataRepository : IGetDataRepository
    {
        private readonly CrmDbContext _context;
        private readonly IMapper _mapper;
        public GetDataRepository(CrmDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<List<DoanhThuDTO>> GetAllDoanhThu()
        {
            var db = await _context.DoanhThus.AsNoTracking().ToListAsync();
            return _mapper.Map<List<DoanhThuDTO>>(db);
        }

        public async Task<List<KetQuaCuocGoiDTO>> GetAllKetQuaCuocGoi()
        {
            var db = await _context.KetQuaCuocGois.AsNoTracking().ToListAsync();
            return _mapper.Map<List<KetQuaCuocGoiDTO>>(db);
        }

        public async Task<List<LinhVucNgheNghiepDTO>> GetAllLinhVucNgheNghiep()
        {
            var db = await _context.LinhVucNgheNghieps.AsNoTracking().ToListAsync();
            return _mapper.Map<List<LinhVucNgheNghiepDTO>>(db);
        }

        public async Task<List<LoaiCuocGoiDTO>> GetAllLoaiCuocGoi()
        {
            var db = await _context.LoaiCuocGois.AsNoTracking().ToListAsync();
            return _mapper.Map<List<LoaiCuocGoiDTO>>(db);
        }


        public async Task<List<LoaiHinhNgheNghiepDTO>> GetAllLoaiHinhNgheNghiep()
        {
            var db = await _context.LoaiHinhNgheNghieps.AsNoTracking().ToListAsync();
            return _mapper.Map<List<LoaiHinhNgheNghiepDTO>>(db);
        }

        public async Task<List<LoaiTiemNangDTO>> GetAllLoaiTiemNang()
        {
            var db = await _context.LoaiTiemNangs.AsNoTracking().ToListAsync();
            return _mapper.Map<List<LoaiTiemNangDTO>>(db);
        }

        public async Task<List<MucDoUuTienDTO>> GetAllMucDoUuTien()
        {
            var db = await _context.MucDoUuTiens.AsNoTracking().ToListAsync();
            return _mapper.Map<List<MucDoUuTienDTO>>(db);
        }

        public async Task<List<NganhNgheDTO>> GetAllNganhNgheByLinhVucId(int maLinhVuc)
        {
            var db = await _context.NganhNghes.Where(r => r.MaLinhVucNgheNghiep == maLinhVuc).ToListAsync();
            return _mapper.Map<List<NganhNgheDTO>>(db);
        }

        public async Task<List<NguonGocKhachHangDTO>> GetAllNguonGocKhachHang()
        {
            var db = await _context.NguonGocKhachHangs.AsNoTracking().ToListAsync();
            return _mapper.Map<List<NguonGocKhachHangDTO>>(db);
        }

      

        public async Task<List<PhongBanKhachHangDTO>> GetAllPhongBanKhachHang()
        {
            var db = await _context.PhongBanKhachHangs.AsNoTracking().ToListAsync();
            return _mapper.Map<List<PhongBanKhachHangDTO>>(db);
        }

        public async Task<List<TrangThaiThucHienDTO>> GetAllTrangThaiThucHien()
        {
            var db = await _context.TrangThaiThucHiens.AsNoTracking().ToListAsync();
            return _mapper.Map<List<TrangThaiThucHienDTO>>(db);
        }

        public async Task<List<ClassDTO>> GetAllLoaiDuBao()
        {
           var db = await _context.LoaiDuBaos.AsNoTracking().ToListAsync();
            return _mapper.Map<List<ClassDTO>>(db);
        }
        public async Task<List<ClassDTO>> GetAllPhanLoaiDuBao()
        {
            var db = await _context.PhanLoaiDuBaos.AsNoTracking().ToListAsync();
            return _mapper.Map<List<ClassDTO>>(db);
        }
    }

}
