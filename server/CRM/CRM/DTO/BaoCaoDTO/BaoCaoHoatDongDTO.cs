namespace CRM.DTO.BaoCaoDTO
{
    public class BaoCaoHoatDongDTO
    {
        // dữ liệu cuộc gọi
        public int TongSoCuocGoiHienTai { get; set; }
        public int TongSoCuocGoiThangTruoc { get; set; }
        // dữ liệu nhiệm vụ
        public int TongSoNhiemVuDaHoanThanhhienTai { get; set; }
        public int TongSoNhiemVuDaHoanThanhThangTruoc { get; set; }
        // dữ liệu lịch hẹn
        public int TongSoLichHenHienTai { get; set; }
        public int TongSoLichHenCuaThangTruoc { get; set; }
    }
}
