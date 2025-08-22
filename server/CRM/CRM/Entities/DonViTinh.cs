namespace CRM.Entities
{
    public class DonViTinh
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public int TiLeChuyenDoi { get; set; }
        public string? MoTa { get; set; }
        public ICollection<HangHoa> HangHoas { get; set; } = new List<HangHoa>();
        public ICollection<HangHoaQuanTam> HangHoaQuanTams { get; set; } = new List<HangHoaQuanTam>();
        public ICollection<ChiTietBaoGia> ChiTietBaoGias { get; set; } = new List<ChiTietBaoGia>();
    }
}
