using AutoMapper;
using CRM.DTO;
using CRM.Entities;

namespace CRM.Helper
{
    public class AutoMapper : Profile
    {
        public AutoMapper() { 

            //dto
            CreateMap<Nguoidung, LoginDTO>();
            CreateMap<Nguoidung , UserDTO>();
            CreateMap<ChucVu ,ChucVuDTO>();
            CreateMap<TinhTrang , TinhTrangDTO>();
        }
    }
}
