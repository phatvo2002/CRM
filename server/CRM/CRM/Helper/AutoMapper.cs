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
            CreateMap<Menu ,MenuDTO>();
            CreateMap<MenuRole ,MenuRoleDTO>();
            CreateMap<PhongBan , PhongBanDTO>();
            CreateMap<KhachHangTiemNang, KhachHangTiemNangDTO>();
            CreateMap<PhongBanKhachHang, PhongBanKhachHangDTO>();
            CreateMap<NguonGocKhachHang, NguonGocKhachHangDTO>();
            CreateMap<LoaiTiemNang, LoaiTiemNangDTO>();
            CreateMap<LoaiHinhNgheNghiep, LoaiHinhNgheNghiepDTO>();
            CreateMap<NganhNghe, NganhNgheDTO>();
            CreateMap<LinhVucNgheNghiep, LinhVucNgheNghiepDTO>();
            CreateMap<DoanhThu, DoanhThuDTO>();
            CreateMap<LoaiCuocGoi, LoaiCuocGoiDTO>();
            CreateMap<TrangThaiThucHien, TrangThaiThucHienDTO>();
            CreateMap<MucDoUuTien, MucDoUuTienDTO>();
            CreateMap<CuocGoi, CuocGoiDTO>();    
            CreateMap<LichHen, LichHenDTO>();
            CreateMap<NhiemVu,NhiemVuDTO>();
        }
    }
}
