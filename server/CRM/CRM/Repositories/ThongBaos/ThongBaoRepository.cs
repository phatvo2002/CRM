using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using Microsoft.EntityFrameworkCore;

namespace CRM.Repositories.ThongBaos
{
    public class ThongBaoRepository : BaseRepository<ThongBao, ThongBaoModal, Guid, ThongBaoDTO>, IThongBaoRepository
    {

        public ThongBaoRepository(CrmDbContext crmDbContext, IMapper mapper) : base(crmDbContext, mapper)
        {
        }

        public async Task CheckDocThongBao(Guid thongBaoId)
        {
            var db = _crmDbContext.ThongBaos.FirstOrDefault(r => r.Id == thongBaoId);
            if (db != null)
            {
                db.IsRead = true;
                _crmDbContext.ThongBaos.Update(db);
                await _crmDbContext.SaveChangesAsync();
            }
        }

        public async Task<ResultModal> CheckThongBao()
        {
            DateTime currentTime = DateTime.Now;
            DateTime oneHourBeforeDeadline = currentTime.AddHours(1);
            var db = await _crmDbContext.NhiemVus
                .Where(nv => nv.HanHoanThanh > currentTime && nv.HanHoanThanh <= oneHourBeforeDeadline && nv.IsThongBao == false)
                .ToListAsync();
            if (db.Count > 0)
            {
                foreach (var item in db)
                {
                    ThongBao thongBao = new ThongBao();
                    thongBao.Id = Guid.NewGuid();
                    thongBao.TieuDe = $"Nhiệm vụ {item.TieuDe} sắp hết hạn";
                    thongBao.NoiDung = item.MoTa;
                    thongBao.IsDelete = false;
                    thongBao.Type = "Warning";
                    thongBao.DuongDan = $"http://localhost:3000/tiemnang/{item.KhachHangTiemNangId}";
                    thongBao.IsRead = false;
                    thongBao.CreateAt = currentTime;
                    thongBao.NguoiDungId = item.NguoiDungId;
                    _crmDbContext.ThongBaos.Add(thongBao);
                    item.IsThongBao = true;
                    _crmDbContext.NhiemVus.Update(item);

                }


                await _crmDbContext.SaveChangesAsync();
                return new ResultModal() { Status = 200, Message = "Bạn có thông báo chưa đọc ", Success = true };
            }
            return new ResultModal() { Status = 200, Message = "Chưa có thông báo", Success = true };
        }

        public async Task<List<ThongBaoDTO>> GetThongBaoByNguoiDungId(Guid nguoiDungId)
        {
            var db = await _crmDbContext.ThongBaos.Where(r => r.NguoiDungId == nguoiDungId).OrderByDescending(r => r.CreateAt).ToListAsync();
            return _mapper.Map<List<ThongBaoDTO>>(db);
        }

        public async Task<List<ThongBaoDTO>> GetThongBaoByNguoiDungIdNotRead(Guid nguoiDungId)
        {
            var db = await _crmDbContext.ThongBaos.Where(r => r.NguoiDungId == nguoiDungId && r.IsRead == false).OrderByDescending(r => r.CreateAt).ToListAsync();
            return _mapper.Map<List<ThongBaoDTO>>(db);
        }
    }
}
