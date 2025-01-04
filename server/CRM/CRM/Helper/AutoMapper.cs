using AutoMapper;
using CRM.DTO;
using CRM.Entities;
using CRM.Modal;

namespace CRM.Helper
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {

            //dto
            CreateMap<Nguoidung, LoginDTO>();
            CreateMap<Nguoidung, UserDTO>();
            CreateMap<ChucVu, ChucVuDTO>();
            CreateMap<TinhTrang, TinhTrangDTO>();
            CreateMap<KetQuaCuocGoi, KetQuaCuocGoiDTO>();
            CreateMap<Menu, MenuDTO>();
            CreateMap<MenuRole, MenuRoleDTO>();
            CreateMap<PhongBan, PhongBanDTO>();
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
            CreateMap<NhiemVu, NhiemVuDTO>();
            CreateMap<LoaiHangHoa, LoaiHangHoaDTO>();
            CreateMap<LoaiHangHoaModal, LoaiHangHoa>().ReverseMap();
            CreateMap<DonViTinh, DonViTinhDTO>();
            CreateMap<DonViTinhModal, DonViTinh>().ReverseMap();
            CreateMap<HangHoa, HangHoaDTO>();
            CreateMap<HangHoaModal, HangHoa>().ReverseMap();
            CreateMap<LienHe, LienHeDTO>();
            CreateMap<LienHeModal, LienHe>().ReverseMap();

        }
    }
}
