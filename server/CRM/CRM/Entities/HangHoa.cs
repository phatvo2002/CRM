namespace CRM.Entities
{
    public class HangHoa
    {
        public string? MaHangHoa { get; set; }
        public string? TenHangHoa { get; set; }
        public string? DuongDanHinhAnh { get; set; }
        public string? MoTa { get; set; }
        public string? NguonGoc { get; set; }
        public decimal? DonGia { get; set; }
        public int MaLoaiHangHoa { get; set; }
        public int MaDonViTinh { get; set; }
        public virtual DonViTinh? DonViTinh { get; set; }
        public virtual LoaiHangHoa? LoaiHangHoa { get; set; }
    }
}
