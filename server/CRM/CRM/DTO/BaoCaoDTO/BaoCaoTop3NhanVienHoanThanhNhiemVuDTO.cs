namespace CRM.DTO.BaoCaoDTO
{
    public class BaoCaoTop3NhanVienHoanThanhNhiemVuDTO
    {
        public Guid Id { get; set; }
        public byte[]? HinhAnh { get; set; }
        public string? TenNhanVien { get; set; }
        public int TongSoNhiemVuDaHoanThanh { get; set; }
    }
}
