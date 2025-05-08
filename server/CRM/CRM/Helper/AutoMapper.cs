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
            CreateMap<Nguoidung, NguoiDungDTO>();
            CreateMap<Nguoidung, NguoiDungExportDTO>();
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
            CreateMap<HangHoaQuanTam, HangHoaQuanTamDTO>();
            CreateMap<HangHoaQuanTamModal, HangHoaQuanTam>().ReverseMap();

            CreateMap<KhachHangMucTieu, KhachHangMucTieuDTO>();
            CreateMap<KhachHangMucTieuModal, KhachHangMucTieu>().ReverseMap();
            CreateMap<LoaiDuBao, ClassDTO>();
            CreateMap<ClassModal, LoaiDuBao>().ReverseMap();
            CreateMap<PhanLoaiDuBao, ClassDTO>();
            CreateMap<ClassModal, PhanLoaiDuBao>().ReverseMap();
            CreateMap<GiaiDoanBanHang, GiaiDoanBanHangDTO>();
            CreateMap<GIaiDoanBanhangModal, GiaiDoanBanHang>().ReverseMap();
            CreateMap<ThongBao, ThongBaoDTO>();
            CreateMap<ThongBaoModal, ThongBao>().ReverseMap();

            CreateMap<CoHoi, CoHoiDTO>();
            CreateMap<CoHoiModal, CoHoi>().ReverseMap();

            CreateMap<LoaiCoHoi, ClassDTO>();
            CreateMap<TinhTrangBaoGia, ClassDTO>();

            CreateMap<BaoGia, BaoGiaDTO>();
            CreateMap<BaoGiaModal, BaoGia>().ReverseMap();
            CreateMap<TinhTrangDonHang, ClassDTO>();
            CreateMap<LoaiDonHang, ClassDTO>();
            CreateMap<TinhTrangGhiDoanhSo, ClassDTO>();
            CreateMap<DonHang, DonHangDTO>();
            CreateMap<DonHangModal, DonHang>().ReverseMap();

            CreateMap<MucTieuDoanhSo, MucTieuDoanhSoDTO>();
            CreateMap<MucTieuDoanhSoModal, MucTieuDoanhSo>().ReverseMap();
            CreateMap<KPINhanVien, KPINhanVienDTO>();
            CreateMap<KPINhanVienModal, KPINhanVien>().ReverseMap();

            CreateMap<XepLoai, XepLoaiDTO>();
            CreateMap<XepLoaiModal, XepLoai>().ReverseMap();

            CreateMap<EmailDaGui, MailDaGuiDTO>();
            CreateMap<MailDaGuiModal, EmailDaGui>().ReverseMap();

            CreateMap<KhaoSat, KhaoSatDTO>();
            CreateMap<KhaoSatModal, KhaoSat>().ReverseMap();
        }
    }
}
