using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Repositories.XepLoais
{
    public class XepLoaiRepository : BaseRepository<XepLoai, XepLoaiModal, int, XepLoaiDTO>, IXepLoaiRepository
    {
        public XepLoaiRepository(CrmDbContext crmDbContext, IMapper mapper) : base(crmDbContext, mapper)
        {
        }
    }
}
