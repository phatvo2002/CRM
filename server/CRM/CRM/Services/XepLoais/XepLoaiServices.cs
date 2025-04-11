using CRM.DTO;
using CRM.Entities;
using CRM.Modal;
using CRM.Repositories.XepLoais;

namespace CRM.Services.XepLoais
{
    public class XepLoaiServices : BaseServices<XepLoai, XepLoaiModal, int, XepLoaiDTO>, IXepLoaiServices
    {
        private readonly IXepLoaiRepository _xepLoaiRepository;
        public XepLoaiServices(IXepLoaiRepository xepLoaiRepository) : base(xepLoaiRepository)
        {
            _xepLoaiRepository = xepLoaiRepository;
        }

    }
}
