namespace CRM.Modal
{
    public class HangHoaModal
    {
        public string? MaHangHoa { get; set; }
        public string? TenHangHoa { get; set; }
        //public string? DuongDanHinhAnh { get; set; }
        public string? MoTa { get; set; }
        public string? NguonGoc { get; set; }
        public decimal? DonGia { get; set; }
        public int MaLoaiHangHoa { get; set; }
        public int MaDonViTinh { get; set; }
        public IFormFile? File { get; set; }
    }
}
