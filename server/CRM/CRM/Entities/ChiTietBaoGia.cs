namespace CRM.Entities
{
    public class ChiTietBaoGia
    {
       public Guid Id { get; set; }
       public string? TenHangHoa { get; set; }
       public int? SoLuong { get; set; }
       public decimal? DonGia { get; set; }
       public decimal? ThanhTien { get; set; }
       // Foreign Key
       public Guid BaoGiaId { get; set; }
       public string? KhachHangId { get; set; }
       public string? MaHangHoaId { get; set; }
       public int? MaDonViTinh { get; set; }
      // Map foreign Key
       public BaoGia? BaoGia { get; set; }
       public KhachHangMucTieu? KhachHangMucTieu { get; set; }
       public HangHoa? HangHoa { get; set; }
       public DonViTinh? DonViTinh { get; set; }
    }
}
